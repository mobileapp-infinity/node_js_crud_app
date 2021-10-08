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

//change password
//path /user/changePassword
exports.changePassword = async (req,res,next) => {
    try {
        const oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        const user = req.user;
        
        const isMatch = bcryptjs.compareSync(oldPassword,user.password);
        
        if(isMatch === false){
            return res.status(401).json({
                status: 0,
                message: 'Old password doesn\'t match with your existing password!',
                data: {} 
            });
        }

        if(newPassword !== confirmPassword){
            return res.status(401).json({
                status: 0,
                message: 'New password and confirm password must be same!',
                data: {}
            });
        }

        if(newPassword.length < 8){
            return res.status(401).json({
                status: 0,
                message: 'Password length atleast 8 character long!',
                data: {}
            });
        }

        newPassword = await bcryptjs.hash(newPassword,8);
        await UserModel.findByIdAndUpdate(user._id,{ password: newPassword });

        res.status(200).json({
            status: 1,
            message: 'Your password has been changed!',
            data: {}
        });

    } catch (error) {
        next(error);
    }
}

exports.forgotPassword = async (req,res,next) => {
    try {
        const emailId = req.body.emailId;
        const user = await UserModel.findOne({ emailId });
        if(!user){
            return res.status(401).json({
                status: 0,
                message: 'Please enter registered Email-ID!',
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

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        await user.save();
        res.status(200).json({
            status: 1,
            message: 'Please verify otp!',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.updateProfile = async (req,res,next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.user._id,req.body,{ new: true });
        res.status(200).json({
            status: 1,
            message: "Profile has been updated!",
            data: user
        });
    } catch (error) {
        next(error);
    }
}

exports.logoutUser = async (req,res,next) => {
    try {
        const user = req.user;
        user.generateAuthToken();
        await user.save();
        res.status(200).json({
            status: 1,
            message: "You have been logged out successfully!"
        });
    } catch (error) {
        next(error);
    }
}