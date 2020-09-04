const express = require('express');
const bodyParser = require('body-parser');
var cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())
app.set('secretKey', 'gokberk'); // jwt secret token



app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


app.get('/', function (req, res) {
 res.json({"name":"gökberk heroku test app"})
});


app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle general  errors
app.use(function (err, req, res, next) {
  if (err.status === 404)
    res.status(404).json({ status: 404, message: "link is not found",data:null });
  else
    res.status(500).json({ status: 500, message: "server error" ,data:null});

});
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.info("server is running "+port)
});

module.exports = app;