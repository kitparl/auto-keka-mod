const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/proxy', async (req, res) => {
  const method = Object.keys(req.body).length === 1 ? 'GET' : 'POST';
  const url = 'https://techfino.keka.com' + req.url;

  const length = Object.keys(req.body).length;
  const token = req.body["Authorization"];
    delete req.body["Authorization"];

    await request({method, url, headers: { 
      Authorization: token,
      "Content-type": "application/json"
    }, body: JSON.stringify(req.body) }, function (error, response, body) {
      res.send(body);
    });
})

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});