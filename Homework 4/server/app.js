var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const https = require("https");
const fs=require("fs");

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


https
    .createServer(
        // Provide the private and public key to the server by reading each
        // file's content with the readFileSync() method.
    {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
    },
    router
    )
  .listen(process.env.SERVER_PORT, ()=>{
    console.log('Server is runing at port '+process.env.SERVER_PORT)
  });

router.get("/",(req,res)=>{
    res.send("Hello to Server")
})