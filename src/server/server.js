const express = require('express');
// Mongo
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/codiphany' : 'mongodb://localhost/codiphanydev';
mongoose.connect(mongoURI);
// Helpers
const path = require('path');
const http = require('http');
// App
const app = express();
const server = http.createServer(app);

const solution = require('./solution/solutionModel');

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../index.html'));
});

app.get('/build/webpack-bundle.js', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../build/webpack-bundle.js'));
});

app.get('/solutions', (req, res) => {
  solution.remove({}, (err, result) => {
    if (err) console.log(err);
    solution.create({
      id: '08uh23fu80hnv2',
      title: 'title',
      description: 'desc',
      resources: 'resources',
      code: 'code',
    }, (err, result) => {
      if (err) console.log(err);
      solution.findOne({id: '08uh23fu80hnv2'}, (err, result) => {
        if (err) console.log(err);
        res.json(result);
      });
    });
  });
});

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
