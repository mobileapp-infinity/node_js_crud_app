const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true,'Please add a username.'],
        trim: true
    },
    emailId: {
        type: String,
        required: [true, 'Please add an email.'],
        unique: true,
        trim: true
    },
    mobileNo: {
        type: String,
        required: [true,'Please add a mobile No.'],
        unique: true,
        maxlength: [10,'Mobile no can not be more than 10 digit!']
    },
    password: {
        type: String,
        required: [true,'Please add a password.'],
        minlength: [8,'Password must be 8 character long!']
    },
    androidId: {
        type: String,
        required: true
    
    },
    token: {
        type: String,
        required: true
    },    
    status: {
        type: Number,
        default: 0 
    },
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET);
    user.token = token;
    return token;
}

userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password,8);
    }
    next();
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;