const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  title: String,
  description: String,
  resources: String,
  code: String,
});

module.exports = mongoose.model('Solution', solutionSchema);
