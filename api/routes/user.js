const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/',(req,res)=>{
  User.find()
    .then(user=>{
      res.status(200).json({users:user})
    })
    .catch(err=>{
      res.status(404).json({error:err})
    })
})

router.post('/signup',(req,res,next)=>{
  const {name,email,password,password2} = req.body
  let errors
// check if field is empty
  if(!name || !email  || !password || !password2){
    errors = "Please fill all fields";
    res.status(404).json({message:errors})
  }else{
    // check password
    if(password.length < 5){
      errors = "Password length must be atleast 5 characters";
      res.status(404).json({message:errors})
    }else{
      // check if pass match
      if(password !== password2){
        errors="Passwords does not match";
        res.status(404).json({message:errors})
      }else{
        User.findOne({email:email})
          .then(user=>{
            if(user){
              errors = "Email Already exist";
              res.status(409).json({message:errors})
            }else{
              const newUser = new User({
                name,
                email,
                password
              })
              bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                  if(err) throw err;
                  newUser.password = hash
                   newUser.save()
                   .then(user=>{
                     res.status(201).json({
                       message:"User created",
                       result:user
                     })
                   })
                   .catch(err=>{
                     console.log(err);
                     res.status(500).json({error:err})
                   })
                })
              })
            }
          })

      }
    }
  }
});

router.post('/login',async (req,res,next)=>{
  const {email,password} = req.body;
  if(!email || !password){
    res.status(404).json({error:"Empty field, Please fill all fields"});
  }else{
    const userExist = await User.findOne({email:email});
    if(!userExist){
      res.status(404).json({error:"This email is not registered"});
    }else{
      const validPassword = await bcrypt.compare(password,userExist.password);
      if(!validPassword){
        res.status(404).json({error:"password is incorrect!"});
      }else{
        // create jwt token
        const token = jwt.sign({id:userExist._id},process.env.SECRET_TOKEN,{expiresIn:"1h"});
        res.header('auth-token',token).json({message:"login successful",user:userExist,token:token})
      }
    }
  }
});

// delete a user
router.delete('/:userId',(req,res)=>{
  User.deleteOne({_id:req.params.userId})
    .then(response=>{
      res.status(200).json({message:"User deleted"});
    })
    .catch(err=>{
      res.status(500).json({error:err})
    })
})

module.exports = router;
