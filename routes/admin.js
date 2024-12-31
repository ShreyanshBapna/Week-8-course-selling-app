const {Router} = require('express');

const adminRouter = Router();

const {adminModel} = require("../db");

// signup
adminRouter.post('/signup', (req, res) => {
    
});

// signin 
adminRouter.post('/signin', (req, res) => {
    
});

adminRouter.post('/course', (req, res) => {
    
});

adminRouter.put('/course', (req, res) => {
    
});

adminRouter.get('/course', (req, res) => {
    
});

module.exports = {
    adminRouter : adminRouter
}