const axios = require("axios");
async function process(task, store) {
  console.log(`<--Processing HTTP task ${task.name}-${task.http_request.method}`);
  const store_key = task.name;

  const response =  await axios({
    method: task.http_request.method || "GET",
    url: task.http_request.uri,
    data: task.http_request.data
  })


  store[store_key] = response.data;

  return await response;
}

module.exports = process;