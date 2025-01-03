// // way - 1
// const express = require('express');
// const Router = express.Router;

// way - 2 
const {Router} = require('express');
const { inputValidation } = require('../middleware/inputvalidation')
const jwt = require('jsonwebtoken');
const {userModel, purchaseModel} = require("../db");
const bcrypt = require('bcrypt');
const userRouter = Router();
const {JWT_USER_PASSWORD} = require('../config');
const {userMiddleware} = require('../middleware/user')

// signup
userRouter.post('/signup', inputValidation, async (req, res) => { 
    const {email, password, firstname, lastname} = req.body;

    // coverting the password into very long string  
    const finalpassword = await bcrypt.hash(password, 5);

    let errorThrown = false;
    // put the entry into the user data session 
    try {
        await userModel.create({
            email,
            password : finalpassword ,
            firstname,
            lastname
        })
    } catch (e) {
        res.json({
            msg : "Something is Wrong!!"
        })
        errorThrown = true;
    }

    if(!errorThrown){
        res.json({
            msg : "Sign-up Successfully!! "
        })
    }
    
});

// signin 
userRouter.post('/signin', inputValidation, async (req, res) => {
    const {email, password} = req.body;
    
    const user = await userModel.findOne({
        email
    })

    if(!user){
        res.json({
            msg : "Invalid Email or this email is not present in the database"
        })
        return;
    }

    const realPassword = await bcrypt.compare(password, user.password);

    if (realPassword){
        const token = jwt.sign({
            id : user._id
        }, JWT_USER_PASSWORD);
        res.json({
            token 
        })
    } else {
        res.json({
            msg : "Password is Invalid"
        })
    }

});

// see the purchases courses
userRouter.get('/purchases', userMiddleware, async (req, res) => {
    const userId = req.userId;

    const purchase = await purchaseModel.find({
        userId
    })
    res.json({
        purchase,
        msg : "all fine"
    })
});

module.exports = {
    userRouter : userRouter
}