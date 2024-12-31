const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const JWT_SECRET = 'ilovekaira';
const app = express();
mongoose.connect('mongodb+srv://shreyansh:shru%4082230@cluster0.iv297.mongodb.net/')

app.use(express.json());

// sign-up
app.post('/user/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashPassword = bcrypt.hash(password, 5);

    res.json({
        msg : "sign-up successfully!!"
    })


});

// signin 
app.post('/user/signin', (req, res) => {
    
});

// see the purchases courses
app.get('/user/Purchases', (req, res) => {

});

// purcahsing the course 
app.post('/course/purchase', (req, res) => {
    
});

// see all the course which is present  
app.get('/courses', (req, res) => {

});

app.listen(3000);
