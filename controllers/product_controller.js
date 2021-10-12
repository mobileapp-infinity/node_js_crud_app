const ProductModel = require('../models/product_model');
const PayoutModeModel = require('../models/payout_mode_model');

exports.getAllProduct = async (req,res,next) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json({
            status: 1,
            data: products
        });
    } catch (error) {
        next(error);
    }
} 

exports.insertProduct = async (req,res,next) => {
    try {
        const isPayourModeIdExist = await PayoutModeModel.findOne({ _id: req.body.payoutModeId });

        if(!isPayourModeIdExist){
            return res.status(404).json({
                status: 0,
                message: 'Please enter correct payoutModeId',
                data: {}
            });
        }    

        const insertProduct = ProductModel(req.body);
        insertProduct.save();
        res.status(201).json({
            status: 1,
            message: "Product Inserted Successfully!",
            data: insertProduct
        });
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req,res,next) => {
    try {
        const isExist = await ProductModel.findById({ _id: req.params.productId });

        if(!isExist){
            return res.status(404).json({
                status: 0,
                message: "Product not found on give Id",
                data: {}
            });
        }

        const updatedProduct = await ProductModel.findOneAndUpdate( { _id: req.params.productId },req.body, { new: true, runValidators: true } );

        res.status(200).json({
            status: 1,
            message:"Product has been updated successfully!",
            data: updatedProduct
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req,res,next) => {
    try {
        
        const isExist = await ProductModel.findById({ _id: req.body.productId });

        if(!isExist){
            return res.status(404).json({
                status: 0,
                message: "Product not found on given Id",
                data: {}
            });
        }

        const deletedProduct = await ProductModel.findOneAndUpdate({ _id:req.body.productId });

        res.status(200).json({
            status: 1,
            message: "Product has been deleted successfully!",
            data: deletedProduct
        });

    } catch (error) {
        next(error);
    }
}


exports.getProductsByPayoutModeId = async (req,res,next) => {
    try {
        const isExist = await ProductModel.findById({ _id: req.query.productId });

        if(!isExist){
            return res.status(404).json({
                status: 0,
                message: "Product not found on given Id",
                data: {}
            });
        }

        const products = await ProductModel.find({ _id:req.query.productId });

        res.status(200).json({
            status: 1,
            message: "Product Found!",
            data: products
        });


    } catch (error) {
        next(error);
    }
}