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
AreaSchema.statics.addArea = 
function(userId, nombre ,img ,description , comments, latitude, longitude){
  
  const Photo = mongoose.model('photo');
  const User = mongoose.model('user');
  const Area = mongoose.model('area');
  // fs.writeFileSync('/imgs/uploadedImage.jpg',photos[0],'base64', err =>{
  //   console.log('error al guardar la foto'+err);
  //   return err;
  // });//it's sincronous so it'll only do d following if it's succes
  // photo.data = fs.readFileSync('/imgs/uploadedImage.jpg','base64',err =>{
  //   console.log('error al leer la foto' +err )
  //   return err;
  // })
    
    
    // const buffer = new Buffer.from(photo, 'base64');
    // photoModel.img.data= buffer;
    // photoModel.img.contentType = 'image/jpg';
    
    
    return User.findById(userId).then(user=>{
      console.log (user)
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