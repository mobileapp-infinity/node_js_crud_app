const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const userRoute = express.Router();
const { registerUser,loginUser,verifyOTP,changePassword,updateProfile,logoutUser } = require('../controllers/user_controller');


userRoute.route('/registerUser').post(registerUser);
userRoute.route('/loginUser').get(loginUser);
userRoute.route('/verifyOTP').post(authMiddleware,verifyOTP);
userRoute.route('/changePassword').post(authMiddleware,changePassword);
userRoute.route('/updateProfile').post(authMiddleware,updateProfile);
userRoute.route('/forgotPassword').post(forgotPassword);
userRoute.route('/logoutUser').get(logoutUser);


module.exports = userRoute;