const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const userRoute = express.Router();
const { registerUser,loginUser,verifyOTP } = require('../controllers/user_controller');


userRoute.route('/registerUser').post(registerUser);
userRoute.route('/loginUser').get(loginUser);
userRoute.route('/verifyOTP').post(authMiddleware,verifyOTP);


module.exports = userRoute;