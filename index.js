const sample = require("./config/sample-1.json");
const axios = require('axios');

const store = {

}

async function processWF(config) {
  console.log(`Process name: ${config.name}`);
  console.log(`Description: ${config.description}`);

  console.log(`Task Count: ${config.tasks.length}`);

  // config.tasks.forEach(async t => {
  //   await processTask(t);
  // })

  for(let i = 0; i < config.tasks.length; i++) {
    await processTask(config.tasks[i]);
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
  console.log(`<--Processing HTTP task`);
  const read_key = task?.output?.read?.key;
  const write_key = task?.output?.write?.key;

  const response =  await axios({
    method: task.http_request.method || "GET",
    url: task.http_request.uri
  })

  store[write_key] = response.data;

}

async function processRMQTask(task) {
  console.log(`<--Processing RMQ task`);

  const read_key = task?.output?.read?.key;
  const write_key = task?.output?.write?.key;

  console.log(`Reading: ${read_key}`, store[read_key]);

}

processWF(sample);