const {Router, application} = require('express');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const {z} = require('zod');
const {JWT_ADMIN_PASSWORD} = require('../config');
const {adminMiddleware} = require('../middleware/admin')
const { inputValidation } = require('../middleware/inputvalidation')
const {adminModel, courseModel} = require("../db");


// signup
adminRouter.post('/signup', inputValidation, async (req, res) => {
   
    const {email, password, firstname, lastname} = req.body;

    // coverting the password into very long string  
    const finalpassword = await bcrypt.hash(password, 5);

    let errorThrown = false;
    // put the entry into the user data session 
    try{
        await adminModel.create({
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
adminRouter.post('/signin',inputValidation ,async (req, res) => {
    const {email, password} = req.body;
    
    // with .find -> this will return all the user having this email in the array
    const admin = await adminModel.findOne({
        email
    })
  
    if(!admin){
        res.json({
            msg : "Invalid Email or this email is not present in the database"
        })
        return;
    }

    const realPassword = await bcrypt.compare(password, admin.password);

    if (realPassword){
        const token = jwt.sign({
            id : admin._id
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token 
        })
    } else {
        res.json({
            msg : "Password is Invalid"
        })
    }
    
});

// create a new crouse 
adminRouter.post('/', adminMiddleware, async (req, res) => {
    const adminID = req.adminID;

    const { title, description, price, imageURL } = req.body;

    const course = await courseModel.create({
        title, 
        description, 
        price, 
        imageURL, 
        createrID : adminID
    })
    
    res.json({
        msg : "Course Created!!",
        courseID : course._id
    })
});

// edit the course 
adminRouter.put('/', adminMiddleware, async (req, res) => {
    const adminID = req.adminID;
    const { title, description, price, imageURL, courseID } = req.body;

    const course = await courseModel.updateOne({
        _id : courseID,
        createrID : adminID
    },{
        title, 
        description, 
        price, 
        imageURL
    })

    res.json({
        msg : "Course Updated",
        courseID : courseID
    })

    
});


adminRouter.get('/bulk', adminMiddleware, async (req, res) => {
    const adminID = req.adminID;

    const courses = await courseModel.find({
        createrID : adminID
    })

    res.json({
        msg : "Course Updated",
        courses
    })
});

module.exports = {
    adminRouter : adminRouter
}