const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  area: {
    type: Schema.Types.ObjectId,
    ref: 'area'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: { type: Number, default: 0 },
  description: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  nombre: {type:String},
  comments:[{type:String}],
  photos:[{
    type:String
  }]
});

ProblemSchema.statics.like = function(id) {
  const Problem = mongoose.model('problem');

  return Problem.findById(id)
    .then(problem => {
      ++problem.likes;
      return problem.save();
    })
}

mongoose.model('problem', ProblemSchema);