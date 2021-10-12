const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const payoutModeSchema = mongoose.Schema({
    _id:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    payoutModeName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isEmailIdRequired: {
        type: Boolean,
        required: true
    },
    isMobileNoRequired: {
        type: Boolean,
        required: true
    },
    isUpiIdRequired: {
        type: Boolean,
        required: true
    }
});

payoutModeSchema.plugin(uniqueValidator,{ message: '{VALUE} already exist!'});

const payoutModeModel = mongoose.model('PayoutMode',payoutModeSchema);

module.exports = payoutModeModel;
