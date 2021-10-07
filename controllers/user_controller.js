const UserModel =  require('../models/user_model');
const emailService = require('../services/email_service');
const bcryptjs = require('bcryptjs');

//Register user 
//path /user/registerUser
exports.registerUser = async (req,res,next) => {
    try {
        const userModel = UserModel(req.body);
        userModel.status = 1;
        userModel.otp = Math.floor(100000 + Math.random() * 900000);
        userModel.generateAuthToken();
        await userModel.save();
        res.status(201).json({
            status: 1,
            message: 'Registered Successfully!',
            data: userModel
        });
    } catch (error) {
        console.log(error);
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
            return res.status(400).json({
                status: 0,
                message: 'Invalid Username Or Password!',
                data: {}
            });
        }

        if(user.status === 1){
            return res.status(401).json({
                status: 0,
                message: 'Please verify your account!',
                data: {}
            });
        }    

        const isMatch = bcryptjs.compareSync(password,user.password);

        if(isMatch === false){
            return res.status(401).json({
                status: 0,
                message: 'Invalid Username Or Password!',
                data: {}
            });
        }

        user.generateAuthToken();

        const userObj = user.toObject();

        delete userObj['otp'];
        delete userObj['androidId'];
        delete userObj['__v'];
        
        res.status(200).json({
            status: 1,
            message: 'Login Scucessful!',
            data: userObj
        });

    } catch (error) {
        next(error);
    }
}

//verify OTP
//path /user/verifyOTP
exports.verifyOTP = async (req,res,next) => {
    try {
        const enteredOTP = req.body.otp;
        const user = req.user;

        if(user.status === 2){
            return res.status(200).json({
                status: 1,
                message: 'OTP Already  Verified!',
                data: user
            });
        }
        
        if(enteredOTP === user.otp.toString()){
            user.status = 2;
            await user.save();
            return res.status(200).json({
                status: 1,
                message: 'OTP Verified Successfully!',
                data: user
            });
        }
        res.status(401).json({
            status: 0,
            message: 'Invalid OTP!',
            data: {}
        });
    } catch (error) {
        next(error)
    }
}