const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
  },
  quantity:{
    type:Number,
    default:1
  },
  created_at:{
    type:Date,
    default:Date.now
  }
})

module.exports = mongoose.model('Order',orderSchema);
