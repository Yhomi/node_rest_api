const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    min:5
  },
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('User',userSchema);
