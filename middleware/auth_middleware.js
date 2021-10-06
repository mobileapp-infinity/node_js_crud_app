const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
const ErrorReponse = require('../utils/error_response');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = jwt.verify(token,process.env.JWT_TOKEN_KEY);
        const user  = await UserModel.findOne({ _id: decode._id,'tokens.token': token});

        if(!user){
            throw Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(new ErrorReponse('Authentication Failed!',401));
    }
}

module.exports = auth;