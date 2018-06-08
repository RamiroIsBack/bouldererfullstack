const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
  nombre: { type: String },
  photos:[{type:String}],
  comments:[{type:String}],
  description:{type: String},
  latitude:{type: Number },
  longitude:{type: Number},

  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  problems: [{
    type: Schema.Types.ObjectId,
    ref: 'problem'
  }]
});


AreaSchema.statics.addProblem = 
function(nombre,photos,content , areaId ,  userId, description, latitude,longitude) {
  const Problem = mongoose.model('problem');

  return this.findById(areaId)
    .then(area => {
      const problem = new Problem({nombre ,photos, content,  area, userId, description, latitude,longitude})
      area.problems.push(problem)
      return Promise.all([problem.save(), area.save()])
        .then(([problem, area]) => area);
    });
}

AreaSchema.statics.findProblems = function(id) {
  return this.findById(id)
    .populate('problems')
    .then(area => area.problems);
}

mongoose.model('area', AreaSchema);