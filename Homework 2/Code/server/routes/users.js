var express = require('express');
require('dotenv').config()
const mongoose = require("mongoose");
var router = express.Router();
const jwt = require("jsonwebtoken");


//Connect to MongoDB
mongoose.connect(
  process.env.ATLAS_URI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

//Create user schema
const userSchema=new mongoose.Schema({
  name: {type: String, required:true},
  email: {type: String, required: true},
  password_hash: {type: String, required: true}
})

//Create user model
const User=mongoose.model('User',userSchema)

//Users Management

/* PUT new user. */
router.put('/create',(req,res)=>{
  User.findOne({email:req.body.email},(err,found)=>{
    if(err)
      res.send(err);
    else if(found!=null && found.email==req.body.email)
      res.status(465).send("User with that email already exists")
    else{
      const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password_hash:req.body.password_hash
      })
      newUser.save().then(
        ()=>res.send('User created'),
        (err)=>res.status(500).send('Error creating new user')
      )
    }
  })
})

//POST user login
router.post('/login',(req,res)=>{
  User.findOne({email:req.body.email},(err,found)=>{
    if(err){
      res.status(550).send("Error logging in")
    }
    else if(found===null){
      res.status(600).send("User doesn't exist")
    }
    else if(found.password_hash!==req.body.password_hash){
      res.status(601).send("Incorrect password")
    }
    else{
      const token = jwt.sign({_id: found._id}, process.env.JWT_SECRET_KEY, { expiresIn: "1h"});
      res.cookie("jwt", token, {expire: new Date() + 9999, httpOnly: true});

      return res.json({
        message: "Successfully Logged In",
        username: found.name
      });
    }
  })
})

//GET user logout
router.get('/logout',(req,res)=>{
  res.clearCookie('jwt');
  return res.json({
    message: "Successfully Logged Out"
  });
})


//GET users
router.get('/', function(req, res) {
  User.find({}, (err, found) => {
    if (!err) {
        res.send(found);
    }
    else
      res.send(err)
}).catch(err => console.log("Error occured, " + err));
});

const {userById} = require("../middlewares/user");
const {verifyToken} = require("../middlewares/auth");

const getLoggedInUser = (req, res) => {
  User.findOne({email:req.body.email},(err,found)=>{
    if(err || found === null) {
      res.status(550).send("Error logging in")
    }
    else {
      return res.status(200).json ({
        message: "User is still logged in",
        username: found.name
      }); 
    }
  });
}


router.get('/user', verifyToken, userById, getLoggedInUser);


//DELETE user
router.delete('/delete',(req,res)=>{
  User.deleteOne({email:req.body.email},(err,found)=>{
    if(!err)
      res.send('User deleted')
    else
      res.send('User could not be deleted: '+err)
  }).catch(err=>console.log('Error occured '+err))
})

//UPDATE user email

router.put('/emailUpdate',(req,res)=>{
  User.findOneAndUpdate({email:req.body.email},{email:req.body.newEmail},(err,found)=>{
    if(err)
        res.send('Error updating user email: '+err)
    else
      res.send('User email updated')
  }).catch(err=>console.log('Error occured '+err))
})

//UPDATE user password

router.put('/passwordUpdate',(req,res)=>{
  User.findOneAndUpdate({email:req.body.email},{password_hash:req.body.new_password_hash},(err,found)=>{
    if(err)
        res.send('Error updating user email: '+err)
    else
      res.send('User password updated')
  }).catch(err=>console.log('Error occured '+err))
})

//Update user name
router.put('/nameUpdate',(req,res)=>{
  User.findOneAndUpdate({email:req.body.email},{name:req.body.newName},(err,found)=>{
    if(err)
        res.send('Error updating user name: '+err)
    else
      res.send('User name updated')
  }).catch(err=>console.log('Error occured '+err))
})

module.exports = router;
