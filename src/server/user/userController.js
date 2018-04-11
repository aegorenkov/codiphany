const User = require('./userModel');
const sessionController = require('./../session/sessionController');
const request = require('request')
const userController = {};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 *
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
userController.verifyUser = (req, res, next) => {
  const username = 'test';
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  request.post(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
  (err, httpResponse, body) => {
    let accessToken = body.split('&')[0].split('=')[1];
    console.log('access: ', accessToken)
    request.get({
      headers: {
        'User-Agent': 'Codiphany',
        'Authorization': accessToken,
      },
      uri: `https://api.github.com/user?access_token=${accessToken}`,
      method: 'POST'
    }, (err, httpResponse, body) => {
      console.log('user info', body);
      const username = body.login;
    })
    User.findOne({accessToken}, (err, result) => {
      if (err) return res.redirect('/');
      if (result === null) {
        User.create({username: username, accessToken: accessToken}, (err, result) => {
          if (err) console.log(err);
          res.locals.user = result.username;
          next();
          return res.redirect('/');
        })     
      } else {
        req.session.user = result.username;
        return res.redirect('/');
      }
    });
  })
};

module.exports = userController;
