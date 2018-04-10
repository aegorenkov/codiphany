const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  resources: {type: String, required: true},
  code: {type: String, required: true},
});

// userSchema.methods.compareHash = function (password) {
//   return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('Solution', solutionSchema);
