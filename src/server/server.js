const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

const server = http.createServer(app);

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../index.html'));
});

app.get('/build/webpack-bundle.js', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../build/webpack-bundle.js'));
});

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
