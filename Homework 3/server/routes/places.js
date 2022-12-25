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

const PlaceSchema=new mongoose.Schema({
    name: {type: String, required:true},
    contact: {type:String,required:true}
})
const Place=mongoose.model('Place',PlaceSchema)


router.get("/",(req,res)=>{
    
        mongoose.model('Place').find({},(err,found)=>{
            if(err)
                res.send(err)
            res.send(found);
        })
        
      
})

module.exports=router