async function execute(task, store) {
  const input = task.input;
  console.log(`<--Processing RMQ task: `, input);
  console.log(`Reading Input: `, store[input]);
  
  return "done";
}


module.exports = execute;