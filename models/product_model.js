const mongoose  = require('mongoose');

const productSchema = mongoose.Schema({
    payoutModeId: {
        type: String,
        required: true,
        trim: true,    
    },
    // payoutModeName: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    productAmount: {
        type: Number,
        required: true
    }
});

const productModel = mongoose.model('Product',productSchema)

module.exports = productModel;