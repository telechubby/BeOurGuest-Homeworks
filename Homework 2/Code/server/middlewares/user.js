const User = require('../routes/users');
const mongoose = require("mongoose");


exports.userById = async (req, res, next) => {
    mongoose.model('User').findOne({_id: req._id}).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        req.user = user;
        next();
    });
}