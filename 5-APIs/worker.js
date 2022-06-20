const {
  Client,
  logger,
  Variables,
} = require("camunda-external-task-client-js");
const open = require("open");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};

// create a Client instance with custom configuration
const client = new Client(config);

// Control type of medicine
client.subscribe("control-medicine", async function ({ task, taskService }) {
  const process_vars = new Variables();
  const prescription = task.variables.get("prescription");

  if (prescription) {
    process_vars.set("prescription_required", "true");
  } else {
    process_vars.set("prescription_required", "false");
  }

  console.log(`PRESCRIPTION CHECKED`);
  await taskService.complete(task, process_vars);
});

// Contact Ministry of Health
client.subscribe("ministry-health", async function ({ task, taskService }) {
  console.log(`PRESCRIPTION SENT TO MINISTRY OF HEALTH`);
  await taskService.complete(task);
});

// Validate Prescription
client.subscribe("prescription-validation", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const prescription = task.variables.get("prescription");
  
    if (prescription) {
      process_vars.set("prescription_valid", "true");
    } else {
      process_vars.set("prescription_valid", "false");
    }
  
    console.log(`PRESCRIPTION VALIDATED`);
    await taskService.complete(task, process_vars);
  });

// Validate Information
client.subscribe("validate-information", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const name = task.variables.get("name");
    const tax_code = task.variables.get("tax-code");
  
    if (name && tax_code) {
      process_vars.set("personal_info_valid", "true");
    } else {
      process_vars.set("personal_info_valid", "false");
    }
  
    console.log(`PERSONAL INFORMATION CHECKED`);
    await taskService.complete(task, process_vars);
  });

// Contact Google Maps API
client.subscribe("google-api", async function ({ task, taskService }) {
    console.log(`PRESCRIPTION SENT TO MINISTRY OF HEALTH`);
    await taskService.complete(task);
  });

// Check Delivery address
client.subscribe("check-address", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const address = task.variables.get("address");

    if (address) {
        process_vars.set("address_valid", "true");
      } else {
        process_vars.set("address_valid", "false");
      }

    console.log(`ADDRESS CHECKED`);
    await taskService.complete(task,process_vars);
  });