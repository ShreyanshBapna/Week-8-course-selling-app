// // way - 1
// const express = require('express');
// const Router = express.Router;

// way - 2 
const {Router} = require('express');

const userRouter = Router();

// signup
userRouter.post('/signup', (req, res) => {
    res.json({
        msg : "all fine"
    })
});

// signin 
userRouter.post('/user/signin', (req, res) => {
    
});

// see the purchases courses
userRouter.get('/Purchases', (req, res) => {
    res.json({
        msg : "all fine"
    })
});

module.exports = {
    userRouter : userRouter
}