const {Router, application} = require('express');
const bcrypt = require('bcrypt');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const {z} = require('zod');
const JWT_ADMIN_PASSWORD = 'ilovekiara';


const {adminModel} = require("../db");

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
adminRouter.post('/signup', authForSign, async (req, res) => {
   
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
adminRouter.post('/signin', async (req, res) => {
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

adminRouter.post('/', (req, res) => {
    
});

adminRouter.put('/', (req, res) => {
    
});


adminRouter.get('/bulk', (req, res) => {
    
});

module.exports = {
    adminRouter : adminRouter
}