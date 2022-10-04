var express = require("express")
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')

const wf = require("./wf");

let port = 4000;

app.use(cors())

const users = {
  1: {
    name: "Tom"
  },
  2: {
    name: "Jerry"
  }
}


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/wfs', function (req, res, next) {
  res.json(users)
});


app.get('/wfs/:id', async function (req, res, next) {
  const response = await wf.processTaskByName(req.params.id);
  res.json(response.data)
});


app.listen(port, function () {
  console.log(`CORS-enabled Orchestration web server listening on port ${port}`)
})

