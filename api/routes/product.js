const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/Product');

// @get all product
router.get('/',(req,res)=>{
  Product.find()
  .select('_id name price')
  .exec()
  .then(data=>{
    const resp={
      count:data.length,
      products:data.map(dat=>{
        return{
          name:dat.name,
          price:dat.price,
          request:{
            type:'GET',
            url:'http://localhost:5000/products/'+dat._id
          }
        }
      })
    }
    res.status(200).json({products:'Get Product routes',response:resp})
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({error:err})
  })

});

//@add a product
router.post('/',(req,res,next)=>{
  const product = new Product({
    name:req.body.name,
    price:req.body.price
  })
  product.save()
  .then(result=>{
    const product= {
      name:result.name,
      price:result.price,
      request:{
        type:"GET",
        url:'http://localhost:5000/products/'+result._id
      }
    }
    res.status(201).json({message:"Product created successfully",product:product});
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({msg:"Error Saving Product",error:err})
  })
})

//@get a particular product
router.get('/:id',(req,res,next)=>{
  const id = req.params.id;
  Product.findById(id)
  .select('name price _id')
  .exec()
  .then(data=>{

    if(data){
      const product = {
        name:data.name,
        price:data.price,
        id:data._id
      }
        res.status(200).json({response:product,
          request:{
            type:"GET",
            description:"Get all products",
            url:'http://localhost:5000/products'
          }
        });
    }else{
        res.status(404).json({response:"Product Not found"});
    }

  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err})
  })

});

//@ update a product
router.patch('/:id',(req,res,next)=>{
  Product.update({_id:req.params.id},{$set:req.body})
    .then(data=>{

      res.status(201).json({
        message:"Product updated successfully",
        request:{
          type:"GET",
          url:'http://localhost:5000/products/'+req.params.id
        }
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({error:err})
    })

});

// @ delete a product
router.delete('/:id',(req,res,next)=>{
  Product.remove({_id:req.params.id})
    .then(data=>{
      res.status(201).json({
        message:"Product deleted",
        request:{
          type:"POST",
          description:"Create new product",
          url:'http://localhost:5000/products',
          body:{name:'String',price:'Number'}
        }
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"problem encounter",error:err})
    })

});

module.exports = router;
