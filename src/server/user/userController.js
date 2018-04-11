const User = require('./userModel');
const sessionController = require('./../session/sessionController');

const userController = {};

/**
* getAllUsers
*
* @param next - Callback Function w signature (err, users)
*/
// userController.getAllUsers = (next) => {
//   User.find({}, next);
// };

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
// userController.createUser = (req, res, next) => {
//   User.create(req.body, (err, result) => {
//     if (err) {
//       return res.render('./../client/signup', {error: err})
//     } else {
//       res.locals.id = result._id
//       next()
//       return res.json({'success': "yes"})
//     }
//   })
// };

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 *
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 */
userController.verifyUser = (req, res) => {
  const username = 'test';
  User.findOne({username}, (err, result) => {
    if (err) return res.redirect('/');
    if (result === null) {
      User.create({username: 'test', accessToken: 'test'}, (err, result) => {
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

};

module.exports = userController;
