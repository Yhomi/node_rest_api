const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const productController = require('../controllers/product');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
  }
})

const filter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype ===  'image/jpg' || file.mimetype ===  'image/png'){
    cb(null,true)
  }else{
    cb({error:'Ypu can not upload this type of image'},false)
  }
}

const upload = multer({storage:storage,limits:{
      fileSize:1024*1024*5
    },
    fileFilter:filter
})


// @get all product
router.get('/',productController.getAllProducts);

//@add a product
router.post('/',auth, upload.single('productImage') ,productController.storeProduct);

//@get a particular product
router.get('/:id',productController.getProduct);

//@ update a product
router.patch('/:id',auth,productController.updateProduct);

// @ delete a product
router.delete('/:id',auth,productController.deleteProduct);

module.exports = router;
