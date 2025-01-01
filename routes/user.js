// // way - 1
// const express = require('express');
// const Router = express.Router;

// way - 2 
const {Router} = require('express');

const jwt = require('jsonwebtoken');
const {userModel} = require("../db");
const bcrypt = require('bcrypt');
const userRouter = Router();
const {z} = require('zod');

const JWT_USER_PASSWORD = 'ilovekiara';

function authForSign(req, res, next){
    // creating the type of data which i want using zod 
    const requiredBody = z.object({
        email : z.string().email(),
        password : z.string().min(3).max(15),
        firstname : z.string().min(3),
        lastname : z.string().min(3).max(10)
    })

    // check the data which i get from user is correct or not 
    // (if it will return true then the data which user give us is according to over requirement)
    const parseDataWithSuccess = requiredBody.safeParse(req.body);
    console.log(parseDataWithSuccess);

    if (parseDataWithSuccess.success){
        next();
    } else {
        res.json({
            msg : "Invalid cridentail!!",
            Error : parseDataWithSuccess.error
        })
        return; 
    }

}
// signup
userRouter.post('/signup', authForSign, async (req, res) => { 
    const {email, password, firstname, lastname} = req.body;

    // coverting the password into very long string  
    const finalpassword = await bcrypt.hash(password, 5);

    let errorThrown = false;
    // put the entry into the user data session 
    try{
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
userRouter.post('/signin', authForSign, async (req, res) => {
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
userRouter.get('/Purchases', (req, res) => {
    res.json({
        msg : "all fine"
    })
});

module.exports = {
    userRouter : userRouter
}