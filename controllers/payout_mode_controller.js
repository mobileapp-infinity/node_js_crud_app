const payoutModeModel = require('../models/payout_mode_model');
const PayoutModeModel = require('../models/payout_mode_model');

exports.getAllPayoutMode = async (req,res,next) => {
    try {
        const payoutModeModel = await PayoutModeModel.find({});
        res.status(200).json({
            status: 1,
            data: payoutModeModel
        });
    } catch (error) {
        next(error)
    }
}


exports.insertPayoutMode = async (req,res,next) => {
    try {
        const payoutModeModel = PayoutModeModel(req.body);
        await payoutModeModel.save();
        res.status(201).json({
            status: 1,
            message: "Payout Mode Inserted Successfully!",
            data: payoutModeModel
        });
    } catch (error) {
        next(error);
    }
}

exports.deletePayoutMode = async (req,res,next) => {
    try {

        const isExist = await PayoutModeModel.findById({ _id:  req.body.payoutModeId });

        if(!isExist){
            return res.status(404).json({
                status: 0,
                message: "Payout Mode not found on given ID,Please enter valid payout modeID!",
                data: {}
            });
        }

        const deletedPayoutMode = await PayoutModeModel.findOneAndDelete({ _id: req.body.payoutModeId });

        res.status(404).json({
            status: 1,
            message: "Payout Mode Deleted Successfully!",
            data: deletedPayoutMode
        });
    } catch (error) {
        next(error);
    }
}

exports.updatePayoutMode = async (req,res,next) => {
    try {

        const isExist =await PayoutModeModel.findById({ _id:  req.params.payoutModeId });

        if(!isExist){
            return res.status(404).json({
                status: 0,
                message: "Payout Mode not found on given ID,Please enter valid payout mode ID!",
                data: {}
            });
        }

        const updatedPayoutMode = await PayoutModeModel.findOneAndUpdate({ _id: req.params.payoutModeId },req.body, { new: true, runValidators: true });

        res.status(404).json({
            status: 1,
            message: "Payout Mode has been Updated Successfully!",
            data: updatedPayoutMode
        });

    } catch (error) {
        next(error);
    }
}



