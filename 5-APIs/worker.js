const {
  Client,
  logger,
  Variables,
} = require("camunda-external-task-client-js");

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
  const medicine = task.variables.get("medicine");

  if (medicine === "xanax") {
    process_vars.set("prescription_required", "true");
    console.log(`PRESCRIPTION IS REQUIRED`);
  } else {
    process_vars.set("prescription_required", "false");
    console.log(`PRESCRIPTION IS NOT REQUIRED`);
  }

  await taskService.complete(task, process_vars);
});

// Validate Prescription
client.subscribe("prescription-validation", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const prescription = task.variables.get("prescription");
  
    if (prescription) {
      process_vars.set("prescription_valid", "true");
      console.log(`PRESCRIPTION IS VALID`);
    } else {
      process_vars.set("prescription_valid", "false");
      console.log(`PRESCRIPTION IS NOT VALID`);
    }
  
    await taskService.complete(task, process_vars);
});

// Validate Information
client.subscribe("validate-information", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const name = task.variables.get("name");
    const tax_code = task.variables.get("tax-code");
  
    if (name && tax_code) {
      process_vars.set("personal_info_valid", "true");
      console.log(`PERSONAL INFORMATION IS VALID`);
    } else {
      process_vars.set("personal_info_valid", "false");
      console.log(`PERSONAL INFORMATION IS NOT VALID`);
    }
  
    await taskService.complete(task, process_vars);
});

// Check Delivery address
  client.subscribe("check-address", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const address = task.variables.get("address");

    if (address) {
        process_vars.set("address_valid", "true");
        console.log(`ADDRESS IS VALID`);
      } else {
        process_vars.set("address_valid", "false");
        console.log(`ADDRESS IS NOT VALID`);
      }
    await taskService.complete(task,process_vars);
  });

  // Check Stock Availability
  client.subscribe("check-stock", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const medicine = task.variables.get("medicine");

    if (medicine === "magnesium") {
      process_vars.set("stock_available", "false");
      console.log(medicine + ` IS NOT AVAILABLE IN STOCK`);
    } else {
      process_vars.set("stock_available", "true");
      console.log(medicine + ` IS AVAILABLE IN STOCK`);
    }

    await taskService.complete(task,process_vars);
  });
  
// Validate Payment
  client.subscribe("validate-payment", async function ({ task, taskService }) {
    const process_vars = new Variables();
    process_vars.set("payment_confirmation", "true");
    
    console.log(`PAYMENT IS VALID`);
    await taskService.complete(task, process_vars);
  });

  // Looking for an available Delivery Man
  client.subscribe("look-for-delivery", async function ({ task, taskService }) {
    
    console.log(`DELIVERY MAN FOUND`);
    await taskService.complete(task);
  });

  // Compute Delivery Time
  client.subscribe("compute-time", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const address = task.variables.get("address");
    const delivery_time = "30 minutes";
  
    process_vars.set("delivery_time",delivery_time);
    console.log("DELIVERY TIME IS " + delivery_time + " TO ADDRESS " + address);

    await taskService.complete(task);
  });

  // Report Creation
  client.subscribe("report-creation", async function ({ task, taskService }) {
    const process_vars = new Variables();
    const payment_confirmation = task.variables.get("payment_confirmation");

    if (payment_confirmation) {
      process_vars.set("report", "true");
    } else {
      process_vars.set("report", "false");
    }
    
    console.log(`REPORT CREATED`);
    await taskService.complete(task,process_vars);
  });

  // Assign Delivery
client.subscribe("assign-delivery", async function ({ task, taskService }) {
  console.log(`DELIVERY MAN ASSIGNED`);        
  await taskService.complete(task);
});


// Confirmation Notification
client.subscribe("confirmation-notification", async function ({ task, taskService }) {
  console.log(`THE ORDER CONFIRMED`);
  await taskService.complete(task);
});

// Denial Notification
client.subscribe("denial-notification", async function ({ task, taskService }) {
  console.log(`THE ORDER DENIED`);
  await taskService.complete(task);
});