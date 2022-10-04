const sample = require("./config/sample-1.json");

const taskFactory = require("./tasks/task-factory");
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

  console.log(`Process completed!`);
}

async function processTask(task) {
  console.log(`Processing task ${task.name}`);

  const taskEngine = taskFactory(task.type);
  return taskEngine(task, store);
  
}

async function processTaskByName(task_name) {
  console.log(`Processing task ${task_name}`);

  const task = getTaskByName(task_name);
  console.log("task: ", task);
  const taskEngine = taskFactory(task.type);
  console.log("taskEngine: ", taskEngine);
  return taskEngine(task, store);
  
}

function getTaskByName(task_name) {
  return sample.tasks.filter(t => {
    return t.name == task_name;
  })[0];
}



processWF(sample);

module.exports = {
  processTaskByName: processTaskByName
}