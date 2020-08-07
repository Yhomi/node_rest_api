const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/Product');

exports.getAllOrders = (req,res,next)=>{
    Order.find()
      .select('product quantity')
      .populate('product','name')
      .exec()
      .then(data=>{

        res.status(200).json({
          count:data.length,
          orders:data.map(dat=>{
            return{
              product:dat.product,
              quantity:dat.quantity,
              request:{
                type:"GET",
                description:'Get a particular order',
                url:'http://localhost:5000/orders/'+dat._id
              }
            }
          })

        })
      })
      .catch(err=>{
        res.status(500).json({error:err})
      })
}

// store order

exports.storeOrder = (req,res,next)=>{
    Product.findById(req.body.productId)
      .then(product=>{
        if(!product){
          return res.status(404).json({message:"Product not Found"})
        }
        const order = new Order({
          product:req.body.productId,
          quantity:req.body.qty
        })
        return order.save()
      })
      .then(result=>{
      res.status(201).json({
        message:"Order added successfully",
        order:result,
        request:{
          type:"GET",
          url:'http://localhost:5000/orders/'+result._id
        }
      })
      })
      .catch(err=>{
      console.log(err);
      res.status(500).json({error:err})
      })
}

// get a single order

exports.getOrder = (req,res,next)=>{
  Order.findById(req.params.orderId)
    .select('product quantity')
    .populate('product')
    .then(result=>{
      if(result){
        res.status(200).json({
          order:result,
          request:{
            type:'GET',
            description:'Fetch all orders',
            url:'http://localhost:5000/orders'
          }
        });
      }else{
        res.status(404).json({message:'Order not Found'})
      }
    })
    .catch(err=>{
      res.status(500).json({error:err})
    })
}

//delete an order

exports.deleteOrder = (req,res,next)=>{
    Order.remove({_id:req.params.orderId})
      .exec()
      .then(result=>{
        res.status(200).json({
          message:"Order deleted",
          request:{
            type:"POST",
            description:'add new order',
            url:'http://localhost:5000/orders',
            body:{productId:"binary hex",qty:'Number'}
          }
        })

      })
      .catch(err=>{
        res.status(500).json({error:err})
      })
}
