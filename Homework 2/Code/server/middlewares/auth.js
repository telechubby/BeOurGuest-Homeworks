const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    let accessToken = req.cookies.jwt;

    //if there is no token in cookies, deny request
    if(!accessToken) {
        return res.status(403).json ({
            error: 'Unauthorized'
        });
    }

    //Verify token, throw error if token expired or invalid
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req._id = payload._id;
        next();
    } catch(e) {
        return res.status(403).json({
            error: 'Unauthorized'
        });
    }
}