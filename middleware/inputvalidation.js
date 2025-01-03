const {z} = require('zod');

function inputValidation(req, res, next){
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

module.exports = {
    inputValidation
}
