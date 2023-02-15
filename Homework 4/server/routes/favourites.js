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

const FavouritesSchema=new mongoose.Schema({
    user_id:{type: String, required:true},
    place_id:{type: String,required:true}
})

const Favourite=mongoose.model('Favourite',FavouritesSchema)

router.get("/",(req,res)=>{
    let id=req.query.id
    mongoose.model('Favourite').find({user_id:id},(err,found)=>{
        if(err)
            res.send(err)
        res.send(found)
    })
})

router.post("/addfavourite",(req,res)=>{
    let user_id=req.query.user_id
    let place_id=req.query.place_id
    const newFavourite=new Favourite({
        user_id:user_id,
        place_id:place_id
    })
    newFavourite.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Added to favourites');
        }
    });
})


module.exports=router