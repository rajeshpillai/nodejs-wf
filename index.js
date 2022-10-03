const sample = require("./config/sample-1.json");
const axios = require('axios');

console.log(sample);

function processWF(config) {
  console.log(`Process name: ${config.name}`);
  console.log(`Description: ${config.description}`);

  console.log(`Task Count: ${config.tasks.length}`);

  config.tasks.forEach(t => {
    processTask(t);
  })
}

function processTask(task) {
  console.log(`Processing task ${task.name}`);
  if (task.type == "HTTP") processHttpTask(task);
  if (task.type == "RMQ") processRMQTask(task);

}


function processHttpTask(task) {
  console.log(`<--Processing HTTP task`);

  axios.get(task.http_request.uri)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function processRMQTask(task) {
  console.log(`<--Processing RMQ task`);

}

processWF(sample);