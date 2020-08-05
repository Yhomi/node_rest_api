const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/Product');

// @get all product
router.get('/',(req,res)=>{
  Product.find()
  .exec()
  .then(data=>{
    console.log(data);
    res.status(200).json({products:'Get Product routes',response:data})
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
    console.log(result);
    res.status(201).json({product:product});
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
  .exec()
  .then(data=>{
    console.log(data);
    if(data){
        res.status(200).json({response:data});
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
      console.log(data)
      res.status(201).json("Update a product")
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
      console.log(data);
      res.status(201).json("Product Delete")
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"problem encounter",error:err})
    })

});

module.exports = router;
