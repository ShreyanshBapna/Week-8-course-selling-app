const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require('../config');

function userMiddlewaare(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_USER_PASSWORD);

    if (decoded){
        req.userID = decodedData.id;
        next();
    } else {
        res.status(403).json({
            msg : "You are not Signed-in"
        })
    }

}

module.exports = {
    userMiddlewaare
}