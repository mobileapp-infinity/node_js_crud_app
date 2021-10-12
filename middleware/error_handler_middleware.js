const ErrorResponse = require('../utils/error_response');

const errorHandler = async (err,req,res,next) => {
    try {
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
    } catch (error) {
        res.status(401).json({
            status: 0,
            message: 'Something went wrong,Please try again later!',
            data: {}
        });
    }
}

module.exports = errorHandler;