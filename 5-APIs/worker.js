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

  // Check Stock Availability
  client.subscribe("check-stock", async function ({ task, taskService }) {
    const process_vars = new Variables();
    process_vars.set("stock_available", "true");

    console.log(`STOCK CHECKED`);
    await taskService.complete(task,process_vars);
  });

  // Payment Delegation
  client.subscribe("payment-delegation", async function ({ task, taskService }) {
    console.log(`PAYMENT REQUEST SENT TO THE THIRD PARTY SERVICE`);
    await taskService.complete(task);
  });
  
  // Validate Payment
  client.subscribe("validate-payment", async function ({ task, taskService }) {
    const process_vars = new Variables();
    process_vars.set("payment_confirmation", "true");
    
    console.log(`PAYMENT VALIDATED`);
    await taskService.complete(task, process_vars);
  });

  // Report Creation
  client.subscribe("report-creation", async function ({ task, taskService }) {
    
    console.log(`REPORT CREATED`);
    await taskService.complete(task);
  });

  // Report Notification
  client.subscribe("report-notification", async function ({ task, taskService }) {
    
    console.log(`REPORT NOTIFIED`);
    await taskService.complete(task);
  });

  // Looking for an available Delivery Man
  client.subscribe("looking-delivery", async function ({ task, taskService }) {
    
    console.log(`DELIVERY MAN FOUND`);
    await taskService.complete(task);
  });

  // Retrieve Delivery Man Information
  client.subscribe("delivery-information", async function ({ task, taskService }) {
    console.log(`RETRIEVE CURRENT DELIVERY MAN INFORMATION`);
    await taskService.complete(task);
  });

  // Compute Delivery Time
  client.subscribe("compute-time", async function ({ task, taskService }) {
    console.log(`COMPUTE DELIVERY TIME`);
    await taskService.complete(task);
  });

  // Assign Delivery
  client.subscribe("assign-delivery", async function ({ task, taskService }) {
    
    console.log(`DELIVERY MAN ASSIGNED`);
    await taskService.complete(task);
  });