const express = require('express');
const router = express.Router();

// @ Gfetch order
router.get('/',(req,res,next)=>{
  res.status(200).json({msg:"Get orders routes"});
})

// @ submit and order
router.post('/',(req,res,next)=>{
  const order = {
    productId:req.body.productId,
    qty:req.body.qty
  }
  res.status(201).json({msg:'Submit an order',order:order});
})

// @ Get a single order
router.get('/:orderId',(req,res,next)=>{
  res.status(200).json({msg:"A single order"})
})

// @ delete an order
router.delete('/:orderId',(req,res,next)=>{
  res.status(201).json({msg:"Order deleted"})
})

module.exports = router;
