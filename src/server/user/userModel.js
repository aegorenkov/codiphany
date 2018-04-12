const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const solution = require('../solution/solutionModel');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},  
  accessToken: {type: String, required: true},
  solutions: [{ type: Schema.Types.ObjectId, ref: 'Solution' }],
});

userSchema.methods.createPost = function (postInfo, cb) {
  solution.create(Object.assign(postInfo, {created: new Date()}), (err, sol) => {
    if (err) console.log(err);
    if (sol._id) this.solutions.push(sol._id);
    this.save((err) => {
        cb(err, sol);
    });
  })
}

userSchema.methods.deletePost = function(postId, cb) {
  solution.remove({_id: postId}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      this.solution = this.solutions.filter((id) => { id !== postId});
      cb(err, result);
    }
  })
}

userSchema.methods.getSolutions = function (cb) {
  solution.find({
    '_id': { $in: this.solutions.map((elem) => mongoose.Types.ObjectId(elem))},
  }).sort({created: 'desc'})
    .exec((err, result) => {
      if (err) console.log(err);
      cb(err, result);
    });
}

module.exports = mongoose.model('User', userSchema);
