const httpTask = require("../tasks/http-task");
const rmqTask = require("../tasks/rmq-task");

function taskFactory(taskType) {
  switch(taskType.toUpperCase()) {
    case "HTTP":
      return httpTask;
    case "RMQ":
      return rmqTask;
    default:
      throw Error(`Task ${taskType} not supported!`);
  }
}

module.exports = taskFactory;