const ErrorResponse = require('../utils/error_response');

const errorHandler = async (err,req,res,next) => {
    let error = { ...err };

    error.message = err.message;
    //Mogoose bad ObjectId
    if(err.name === 'CastError'){
        const message = `No Data Found!`;
        error = new ErrorResponse(message,404);
    }

    //Mongoose validation error
    if(err.name === 'MongoServerError'){
        const message = `${Object.values(err.keyValue)} already exist!`
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        status: 0,
        message: error.message || 'Server Error',
        data: {}
    });
}

module.exports = errorHandler;