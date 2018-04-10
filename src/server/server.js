const express = require('express');
// Mongo
const mongoose = require('mongoose');
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/codiphany' : 'mongodb://localhost/codiphanydev';
mongoose.connect(mongoURI);
// Helpers
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// App
const app = express();
const server = http.createServer(app);
// Controllers
const solutionController = require('./solution/solutionController');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../index.html'));
});

app.get('/build/webpack-bundle.js', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../build/webpack-bundle.js'));
});

app.get('/solutions', solutionController.getSolutions);

app.get('/solution', solutionController.getSolution);
app.post('/solution', solutionController.createSolution);
app.put('/solution', solutionController.updateSolution);
app.delete('/solution', solutionController.deleteSolution);

app.get('/:solutionId', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../index.html'));
});

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
