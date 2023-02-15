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
    password_hash: {type: String, required: true},
    role: {type: String, required: true}
  })
  
  //Create user model
  const User=mongoose.model('User',userSchema)
  
  //Users Management

router.get('/users',(req,res)=>{
  User.find({},(err,found)=>{
    if(err)
      res.send(err)
    res.send(found)
  })
})

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
          password_hash:req.body.password_hash,
          role:req.body.role
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
          id: found._id,
          username: found.name,
          role: found.role
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

router.get('/user', function(req, res) {

    let accessToken = req.cookies.jwt;

    //if there is no token in cookies, deny request
    if(!accessToken) {
      return res.status(403).json({
        message: 'Unauthorized'
      });
    }

    //Verify token, throw error if token expired or invalid
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req._id = payload._id;

        //Find User by id
        mongoose.model('User').findOne({_id: req._id}).exec((err, user) => {
          if(err || !user) {
              return res.status(404).json({
                  error: "User not found"
              });
          }
    
          //set the requested user as use and send his name
          req.user = user;
          return res.status(200).json ({
            message: "User is still logged in",
            username: req.user.name,
            role: req.user.role,
            id:req.user._id
          }); 
        });
    } catch(e) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }

});

//DELETE user
router.put('/delete',(req,res)=>{
  User.deleteOne({_id:new mongoose.Types.ObjectId(req.body.id)},(err,found)=>{
    if(!err)
      res.send('User deleted')
    else
      res.status(410).send('User could not be deleted: '+err)
  }).catch(err=>console.log('Error occured '+err))
})

//UPDATE user password

router.post('/update',(req,res)=>{
  let id=req.body.id
  let name=req.body.name
  let role=req.body.role
  mongoose.model('User').findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{name:name,role:role},(err,found)=>{
    if(err!==undefined)
      res.send(err)
    else
      res.send(found)
  })
})

module.exports=router