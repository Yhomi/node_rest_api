const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

// morgan for logging
app.use(morgan('dev'));

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use((req,res,next)=>{
//   res.status(200).json({msg:'Server Running!'});
// });

// Allow CORS: Cross Origin Resource Sharing
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
    "Content-Type,Origin,X-Requested-With,Accept,Authorization"
  );
  if(req.method === "OPTIONS"){
    req.header('Acess-Control-Allow-Methods','PUT,PATCH,GET,POST,DELETE');
    return res.status(200).json({});
  }
  next();
})

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

// Handling errors
app.use((req,res,next)=>{
  const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

app.use((error,req,res,next)=>{
  res.status(error.status || 500).json({msg:error.message})
})

module.exports = app;
