// here we are storing all the secret

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;


module.exports = {
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD
}