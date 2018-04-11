const solution = require('./solutionModel');

const solutionController = {};
//TODO: Input should be sanitized

solutionController.createSolution = (req, res) => {
  solution.create(req.body, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
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
  solution.find({}, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  })
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
  solution.remove({_id: id}, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  })
};

solutionController.removeAllSolutions = (req, res) => {
  solution.remove({}, (err, result) => {
    if (err) console.log(err);
    return res.json({message: 'Delete all solutions success.'})
  })
};

module.exports = solutionController;