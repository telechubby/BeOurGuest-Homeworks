var express = require('express');
var crypto = require("crypto");
require('dotenv').config()
const mongoose = require("mongoose");
var router = express.Router();

//Connect to MongoDB
mongoose.connect(
    process.env.ATLAS_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//Create session schema
const sessionSchema=new mongoose.Schema({
    key: {type:String, required:true},
    email: {type:String,required:true},
    startTime: {type:Date, required:true},
    endTime: {type:Date, required:true}
})

//Create session model
const Session=mongoose.model('Session',sessionSchema)
const FinishedSession=mongoose.model('FinishedSession',sessionSchema)

//Sessions management

/* GET create session key */
router.get('/new',(req,res)=>{
    mongoose.model('User').findOne({email:req.body.email},(userErr,user)=>{
        if(userErr || user===null)
            res.status(702).send('No user found')
        else{
            mongoose.model('Session').findOne({email:req.body.email},(sessionErr,foundSession)=>{
                if(sessionErr)
                    res.send(sessionErr)
                else if(foundSession!==null){
                    res.status(700).send('A session already exists') 
                }
                else{
                    const newSession=new Session({
                        key:crypto.randomBytes(128).toString('hex'),
                        email:req.body.email,
                        startTime:new Date(),
                        endTime:new Date(new Date().getTime()+5*60000)
                    })
                    newSession.save()
                    res.status(200).send(newSession.key)
                }
            })
        }
    })
})

router.get('/extend',(req,res)=>{
    mongoose.model('Session').findOne({key:req.body.key},(err,foundSession)=>{
        if(err)
            res.send(err)
        else if(foundSession===null)
            res.status(702).send('No such session exists')
        else{
            if(foundSession.endTime<new Date()){
                const finishedSession=new FinishedSession({
                    key:foundSession.key,
                    email:foundSession.email,
                    startTime:foundSession.startTime,
                    endTime:new Date()
                })
                finishedSession.save()
                mongoose.model('Session').findOneAndDelete({key:req.body.key},(err,res)=>{})
                res.status(701).send('Session is expired')
            }
            else{
                foundSession.endTime=new Date(new Date().getTime()+5*60000)
                foundSession.save()
                res.status(200).send(foundSession.key)
            }
        }
    })
})

router.get('/end',(req,res)=>{
    mongoose.model('Session').findOneAndDelete({key:req.body.key},(err,found)=>{
        if(err)
            res.send(err)
        else if(found===null)
            res.status(702).send('No such session exists')
        else{
            finishedSession=new FinishedSession({
                key:req.body.key,
                email:found.email,
                startTime:found.startTime,
                endTime:new Date()
            })
            finishedSession.save()
            res.status(200).send('Session ended')
        }
    })
})
/*
        foundSession.endTime=new Date(new Date().getTime() + 1*60000)
        foundSession.save(
            ()=>res.status(200).send(foundSession.key),
            (sessionErr)=>res.send(sessionErr)
        )

        else if(foundSession.endTime<new Date())
        {
            res.status(700).send('Session has expired')
        }
*/

module.exports = router;