const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

/** verify and decode token for all users */
function verifyToken(req, res, next) {
// console.log('auth==',req.headers)
    // Fetch authentication token from the header
    let token = req.headers.authorization;
    console.log('token=',token)
    // verify the token with jwt
    jwt.verify(token, "abcdef", function (err, decoded) {
        //check token expired then store to black list
        if (err) {
            return res.send({
                "status": 500,
                "message": "Failed to authenticate token."
            });
        }

        req.username = decoded.username;
        req._id = decoded._id;
        next();
    });
}


module.exports = {
    verifyToken
};