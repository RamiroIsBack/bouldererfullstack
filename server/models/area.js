const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs'); 

const AreaSchema = new Schema({
  nombre: { type: String },
  photos:[{
    type: Schema.Types.ObjectId,
    ref: 'photo'
  }],
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
function(nombre,img,line,content , areaId ,  userId, description, latitude,longitude) {
  const Problem = mongoose.model('problem');
  const Photo = mongoose.model('photo');
  return this.findById(areaId)
    .then(area => {
      return Promise.all([
        new Photo({nombre:nombre+Date.now(),date:Date.now(),userId}).save(),
        new Problem({nombre , content, area, userId, description, latitude,longitude}).save()
      ]).then(([photo,problem])=>{
        console.log (problem.id);
          photo.problemId = problem.id;
          problem.photos.push(photo);
          area.problems.push(problem);
          photo.img = img;
          photo.line = line;
          return Promise.all([problem.save(), area.save(), photo.save()])
            .then(([problem,area,photo])=>{
              
              return area;
            });
    
        });
    });
}
AreaSchema.statics.addArea = 
function(userId, nombre ,img ,description , comments, latitude, longitude){
  
  const Photo = mongoose.model('photo');
  const User = mongoose.model('user');
  const Area = mongoose.model('area');
   
    return User.findById(userId).then(user=>{
      
      return Promise.all([
        new Photo({nombre:nombre+Date.now(),date:Date.now(),userId: userId}).save(), 
        new Area({ nombre,description ,user,comments, latitude, longitude }).save()])
      .then(([photo, area]) =>{
        photo.areaId = area.id;
        area.photos.push(photo)
        photo.img = img;
        return Promise.all([photo.save(),area.save()])
        .then(([finalPhoto,finalArea]) => finalArea );
        
        
      });
        
    });


}

AreaSchema.statics.findProblems = function(id) {
  return this.findById(id)
    .populate('problems')
    .then(area => area.problems);
}
AreaSchema.statics.findPhotos = function(id) {
  return this.findById(id)
    .populate('photos')
    .then(area => area.photos);
}

mongoose.model('area', AreaSchema);