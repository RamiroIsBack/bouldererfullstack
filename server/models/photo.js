const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  nombre: { type: String },
  date:{type: String},
  img: { type: String },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'problem'
  },
  areaId: {
    type: Schema.Types.ObjectId,
    ref: 'problem'
  }
});

PhotoSchema.statics.addImg = function(data) {
  const Img = mongoose.model('img');
  return Promise(new Img(data).save())
        .then((img) => img );
}

mongoose.model('photo', PhotoSchema);