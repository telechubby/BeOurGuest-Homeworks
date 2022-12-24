const { application } = require('express');
var express = require('express');
require('dotenv').config()
const mongoose = require("mongoose");
var router = express.Router();
const multer=require('multer')
const fs = require('fs');

const upload = multer({ dest: 'eventUploads/' });

mongoose.connect(
    process.env.ATLAS_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const eventSchema=new mongoose.Schema({
    name: {type: String, required:true},
    place_id: {type: String, required:true},
    description: {type:String, required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    image: {type:Buffer,contentType: String, required:true},
    contact: {type:String,required:true}
})

const Event=mongoose.model('Event',eventSchema)

router.post("/create",upload.single('image'),(req,res)=>{
    const newEvent=new Event({
        name:req.body.name,
        place_id:req.body.place_id,
        description:req.body.description,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        image:fs.readFileSync(req.file.path),
        contact:req.body.contact
    })
    newEvent.image.contentType='image'

    newEvent.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Event created');
        }
      });
})

router.get("/",(req,res)=>{
    
    if (req.query.hasOwnProperty('id')) {
        let id=mongoose.Types.ObjectId(req.query.id)
        mongoose.model('Event').findOne({_id:id},(err,found)=>{
            if(err){
                res.send(err)
            }     
            res.send(found);
        })
      } else {
        mongoose.model('Event').find({},(err,found)=>{
            if(err)
                res.send(err)
            res.send(found);
        })
      }
})

module.exports=router