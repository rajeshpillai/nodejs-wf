const sample = require("./config/sample-1.json");
const axios = require('axios');

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
  console.log(`<--Processing HTTP task ${task.name}-${task.http_request.method}`);
  const store_key = task.name;

  const response =  await axios({
    method: task.http_request.method || "GET",
    url: task.http_request.uri,
    data: task.http_request.data
  })

  store[store_key] = await response.data;
  console.log("RESPONSE: ", response.data);
}

async function processRMQTask(task) {
  const input = task.input;
  console.log(`<--Processing RMQ task: `, input);
  console.log(`Reading Input: `, store[input]);
}

processWF(sample);