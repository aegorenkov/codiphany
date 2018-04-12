const solution = require('./solutionModel');
const user = require('../user/userModel');

const solutionController = {};
//TODO: Input should be sanitized

solutionController.createSolution = (req, res) => {
  user.findOne({username: req.session.user}, (err, resUser) => {
    resUser.createPost(req.body, (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    });
  })
};

solutionController.getSolution = (req, res) => {
  const id = req.query.id
  solution.findOne({_id: id}, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  })
};

solutionController.getSolutions = (req, res) => {
  user.findOne({username: req.query.username}, (err, resUser) => {
    if (err) console.log(err);
    if (!resUser) return res.json([]);
    resUser.getSolutions((err, result) => {
      if (err) console.log(err);
      return res.json(result);
    });
  });
};

solutionController.updateSolution = (req, res) => {
  const id = req.query.id
  solution.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true}, (err, doc) => {
    if (err) console.log(err);
    res.json(doc);
  })
};

solutionController.deleteSolution = (req, res) => {
  const id = req.query.id
  user.findOne({username: req.session.user}, (err, resUser) => {
    resUser.deletePost(id, (err, result) => {
      if (err) console.log(err);
      return res.json(result);
    })
  })
};

solutionController.removeAllSolutions = (req, res) => {
  solution.remove({}, (err, result) => {
    if (err) console.log(err);
    return res.json({message: 'Delete all solutions success.'})
  })
};

module.exports = solutionController;