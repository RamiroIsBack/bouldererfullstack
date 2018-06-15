const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
  data: { type: String },
  
});


mongoose.model('img', ImgSchema);