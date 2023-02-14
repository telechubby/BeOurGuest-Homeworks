var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
require("dotenv").config();
  
const router = express();
const PORT = process.env.SERVER_PORT;

router.use(cors({ origin: true, credentials: true }));
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'jade');
  
const usersRouter=require("./routes/users")
const eventsRouter=require("./routes/events")
const placesRouter=require("./routes/places")
const notificationsRouter=require("./routes/notifications")

router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/places', placesRouter);
router.use('/notifications', notificationsRouter)


router.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

router.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);