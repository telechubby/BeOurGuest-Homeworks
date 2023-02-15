const { application } = require('express');
var express = require('express');
require('dotenv').config()
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect(
    process.env.ATLAS_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const NotificationSchema=new mongoose.Schema({
    place_id:{type: String, required:true},
    message:{type: String,required:true}
})

const Notification=mongoose.model('Notification',NotificationSchema)

router.get("/",(req,res)=>{
    let id=req.query.id
    mongoose.model('Notification').find({user_id:id},(err,found)=>{
        if(err)
            res.send(err)
        res.send(found)
    })
})



module.exports=router