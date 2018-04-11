require('dotenv').config();
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
const session = require('express-session');
// App
const app = express();
const server = http.createServer(app);
// Controllers
const solutionController = require('./solution/solutionController');
const userController = require('./user/userController');
const sessionController = require('./session/sessionController')

app.use(session({ 
  secret: 'f2hh04hg02g20h48', 
  resave: false, saveUninitialized: true, 
  cookie: { maxAge: 60000 }
}));
app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // count the views
  req.session.views[req.url] = (req.session.views[req.url] || 0) + 1
  
  next()
})
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../index.html'));
});

app.get('/auth', (req, res) => {
  if(req.session.user) {
    return res.status(200).json({user: req.session.user})
  } else {
    return res.status(401).json({message: 'Forbidden'})}
  }
);

app.get('/login', userController.verifyUser, sessionController.startSession)
app.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
})

app.get('/build/webpack-bundle.js', (req, res) => {
  return res.sendFile(path.resolve(__dirname,'../../build/webpack-bundle.js'));
});

app.get('/src/client/styles.css', (req, res) => {
  res.set('Content-Type', 'text/css')
  return res.sendFile(path.resolve(__dirname, '../../src/client/styles.css'));
});

app.get('/solutions', solutionController.getSolutions);

app.get('/solution', solutionController.getSolution);
app.post('/solution', sessionController.isLoggedIn, solutionController.createSolution);
app.put('/solution', sessionController.isLoggedIn, solutionController.updateSolution);
app.delete('/solution', sessionController.isLoggedIn, solutionController.deleteSolution);

app.get('/:solutionId', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../index.html'));
});

app.get('/:solutionId/edit', sessionController.isLoggedIn, (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../../index.html'));
});

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
