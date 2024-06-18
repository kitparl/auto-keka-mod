const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
const fetch = require('node-fetch'); 
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

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

//   app.use('/proxy', async (req, res) => {
//   const method = Object.keys(req.body).length === 1 ? 'GET' : 'POST';
//   const url = 'https://techfino.keka.com' + req.url;

//   const length = Object.keys(req.body).length;
//   const token = req.body["Authorization"];
//     delete req.body["Authorization"];

//     await request({method, url, headers: { 
//       Authorization: token,
//       "Content-type": "application/json"
//     }, body: JSON.stringify(req.body) }, function (error, response, body) {
//       console.log("body+++++???>>>>", body);
//       res.send(body);
//     });
// });


app.use('/proxy', async (req, res) => {
  const method = Object.keys(req.body).length === 1 ? 'GET' : 'POST';
  const url = 'https://techfino.keka.com' + req.url;

  const token = req.body["Authorization"];
  delete req.body["Authorization"];

  const options = {
    method,
    headers: {
      Authorization: token,
      'Content-type': 'application/json',
    },
  };

  if (method === 'POST') {
    options.body = JSON.stringify(req.body);
  }

  try {
    const response = await fetch(url, options);

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    let body;
    if (contentType && contentType.includes("application/json")) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    return res.status(response.status).send(body);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
