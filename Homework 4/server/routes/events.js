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
    place_name: {type: String, required:true},
    description: {type:String, required:true},
    startTime:{type:String,required:true},
    date:{type:String,required:true},
    endTime:{type:String,required:true},
    image: {type:Buffer,contentType: String, required:true},
    contact: {type:String,required:true}
})

const Event=mongoose.model('Event',eventSchema)

router.post("/create",upload.single('file'),(req,res)=>{
    console.log(req)
    const newEvent=new Event({
        name:req.body.name,
        place_id:req.body.place_id,
        place_name:req.body.place_name,
        description:req.body.description,
        date:req.body.date,
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

router.put('/update',(req,res)=>{
    let id=req.body.id
    let name=req.body.name
    let description=req.body.description
    let date=req.body.date
    let startTime=req.body.startTime
    let endTime=req.body.endTime
    let contact=req.body.contact

    mongoose.model('Event').findOneAndUpdate({_id:new mongoose.Types.ObjectId(id)},{name:name,description:description,date:date,startTime:startTime,endTime:endTime,contact:contact},(err,found)=>{
      if(err!==undefined)
        res.send(err)
      else
        res.send(found)
    })
})

router.put('/delete',(req,res)=>{
  let id=req.body.id
  Event.deleteOne({_id:new mongoose.Types.ObjectId(req.body.id)},(err,found)=>{
    if(!err)
      res.send('Event deleted')
    else
      res.status(410).send('Event could not be deleted: '+err)
  }).catch(err=>console.log('Error occured '+err))
})

module.exports=router