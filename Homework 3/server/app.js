const express = require('express');
  
const router = express();
const PORT = 9000;
  
const usersRouter=require("./routes/users")

router.use('/users', usersRouter);

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