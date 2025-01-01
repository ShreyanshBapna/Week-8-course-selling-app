const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin')
const mongoose = require("mongoose");

 
const app = express();
app.use(express.json());
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/course', courseRouter)  

async function main (){
    await mongoose.connect('mongodb+srv://shreyansh:shru%4082230@cluster0.iv297.mongodb.net/course-selling-app');
    app.listen(3000);
}

main ();
