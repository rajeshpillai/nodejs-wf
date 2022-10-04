const axios = require('axios');
const sample = require("./config/sample-1.json");

const httpTask = require("./tasks/http-task");
const rmqTask = require("./tasks/rmq-task");

const store = {

}

async function processWF(config) {
  console.log(`Process name: ${config.name}`);
  console.log(`Description: ${config.description}`);

  console.log(`Task Count: ${config.tasks.length}`);

  for(let i = 0; i < config.tasks.length; i++) {
    try {
      console.log(`Processing ${i}`);
      await processTask(config.tasks[i]);
    } catch(ex) {
      console.log("ERROR: ", ex);
      return ex;
    }
  }
}

async function processTask(task) {
  console.log(`Processing task ${task.name}`);
  if (task.type == "HTTP") { 
    return processHttpTask(task);
  }
  if (task.type == "RMQ") {
    return processRMQTask(task);
  } 
}


async function processHttpTask(task) {
  const data = await httpTask(task, store);
  console.log("RESPONSE: ", data);
}

async function processRMQTask(task) {
 const data = await rmqTask(task, store);
 console.log("RESPONSE: ", data);
}

processWF(sample);