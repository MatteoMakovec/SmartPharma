const { Client, logger, Variables } = require('camunda-external-task-client-js');
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('control-medicine', async function({ task, taskService }) {
    const process_vars = new Variables();
    const prescription = task.variables.get('prescription');
    
    if (prescription === "none") {
        process_vars.set("prescription_valid", "false");
    } 
    else {
        process_vars.set("prescription_valid", "true");
    }

    console.log(`PRESCRIPTION CHECKED`);
    await taskService.complete(task, process_vars);
});

client.subscribe('minnistry-health', async function({ task, taskService }) {
    const process_vars = new Variables();
    const prescription = task.variables.get('prescription');
    
    if (prescription === "none") {
        process_vars.set("prescription_valid", "false");
    } 
    else {
        process_vars.set("prescription_valid", "true");
    }

    console.log(`PRESCRIPTION CHECKED`);
    await taskService.complete(task, process_vars);
});