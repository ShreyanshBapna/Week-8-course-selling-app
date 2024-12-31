const {Router} = require('express');

const courseRouter = Router();

// purcahsing the course 
courseRouter.post('/purchase', (req, res) => {
    
});

// see all the course which is present  
courseRouter.get('/preview', (req, res) => {

});

module.exports = {
    courseRouter : courseRouter
}