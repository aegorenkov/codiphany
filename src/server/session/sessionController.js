const Session = require('./sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*
*
*/
sessionController.isLoggedIn = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    return res.status(401).json({message: 'Unauthorized'})
  }
};

/**
* startSession - create a new Session model and then save the new session to the
* database.
*
*
*/
sessionController.startSession = (req, res, next) => {
  req.session.user = res.locals.user
  next();
};

module.exports = sessionController;
