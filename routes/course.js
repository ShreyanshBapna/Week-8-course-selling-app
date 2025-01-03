const {Router} = require('express');

const courseRouter = Router();

const {courseModel, userModel, purchaseModel} = require('../db')

// purcahsing the course 
courseRouter.post('/purchase', async (req, res) => {
    const {userId, courseId} = req.body;
    const user = userModel.findOne({
        _id : userId
    });
    const course = courseModel.findOne({
        _id : courseId
    })
    if (user && course){
        await purchaseModel.create({
            userId,
            courseId
        })
        res.json({
            msg : "SuccessFully Buy!!"
        })
    } else {
        res.status(403).json({
            msg : "Invalid credentails!!"
        })
    }
});

// see all the course which is present  
courseRouter.get('/preview', async (req, res) => {
    // get all the course in our course database
    const courses = await courseModel.find({});
    res.json({
        courses,
        msg : "course preview endpoint"
    })
});

module.exports = {
    courseRouter : courseRouter
}