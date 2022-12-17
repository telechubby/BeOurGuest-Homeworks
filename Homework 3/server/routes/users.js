const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to users controller")
})

router.get("/test",(req,res)=>{
    res.status(200).send("Welcome to the test of users controller")
})

module.exports=router