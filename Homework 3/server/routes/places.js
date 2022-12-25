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

router.get('/ownerplaces',(req,res)=>{
    if(req.query.hasOwnProperty('id')){
        let id=mongoose.Types.ObjectId(req.query.id)
        mongoose.model('Place').find({owner_id:id},(err,found)=>{
            if(err)
                res.send(err)
            res.send(found);
        })
    }
    else{
        res.send()
    }
})

router.get("/",(req,res)=>{
        if(req.query.hasOwnProperty('id')){
            let id=mongoose.Types.ObjectId(req.query.id)
            mongoose.model('Place').find({_id:id},(err,found)=>{
                if(err)
                    res.send(err)
                res.send(found);
            })
        }
        else{
            mongoose.model('Place').find({},(err,found)=>{
                if(err)
                    res.send(err)
                res.send(found);
            })
        }
        
      
})

module.exports=router