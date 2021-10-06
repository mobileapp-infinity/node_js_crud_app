const UserModel =  require('../models/user_model');
const emailService = require('../services/email_service');
const bcryptjs = require('bcryptjs');

//Register user 
//path /user/registerUser
exports.registerUser = async (req,res,next) => {
    try {
        const userModel = UserModel(req.body);
        userModel.status = 1;
        userModel.otp = 154469;
        userModel.generateAuthToken();
        await userModel.save();
        // emailService.sendMail('scspl.harsh@gmail.com','Verify OTP!','123685 is your OTP for registration!');
        res.status(201).json({
            status: 1,
            message: 'Please verify otp',
            data: userModel
        });
    } catch (error) {
        next(error);
    }
}


//Login user
//path /user/loginUser
exports.loginUser = async (req,res,next) => {
    try {
        const userName = req.query.userName;
        const password = req.query.password;
        const user = await UserModel.findOne({ emailId: userName }) || await UserModel.findOne({ mobileNo: userName });;
        
        if(!user){
            res.status(400).json({
                status: 0,
                message: 'Invalid Username Or Password!',
                data: null
            });
        }

        if(user.status === 1){
            res.status(401).json({
                status: 0,
                message: 'Unauthorized Access',
                data: null
            });
        }    

        const isMatch = bcryptjs.compareSync(password,user.password);

        if(isMatch === false){
            res.status(401).json({
                status: 0,
                message: 'Invalid Username Or Password!',
                data: null
            });
        }
        
        res.status(200).json({
            status: 1,
            message: 'Login Scucessful',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message,
            data: null
        });
    }
}

//verify OTP
//path /user/verifyOTP
exports.verifyOTP = async (req,res,next) => {
    try {
        const enteredOTP = req.body.otp;
        const token = req.token;
        const user = await UserModel.findOne({ 'tokens.token': token });
        
        if(enteredOTP === user.otp.toString()){
            user.status = 2;
            await user.save();
            res.status(200).json({
                status: 1,
                message: 'OTP Verified Successfully!',
                data: user
            });
        }
        res.status(401).json({
            status: 0,
            message: 'Invalid OTP!',
            data: null
        });
    } catch (error) {
        next(error)
    }
}