async function process(task, store) {
  const input = task.input;
  console.log(`<--Processing RMQ task: `, input);
  console.log(`Reading Input: `, store[input]);
  
  return "done";
}


module.exports = process;