const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://shreyansh:shru%4082230@cluster0.iv297.mongodb.net/course-selling-app')

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstname : String,
    lastname : String
})

const adminSchema = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstname : String,
    lastname : String
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageURL : String,
    createrID : ObjectId
})

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
})

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', userSchema);
const purchaseModel = mongoose.model('purchase', userSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}