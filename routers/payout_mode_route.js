const express = require('express');
const payoutModeRoute = express.Router();
const authMiddleware = require('../middleware/auth_middleware');
const { getAllPayoutMode,insertPayoutMode,deletePayoutMode,updatePayoutMode } = require('../controllers/payout_mode_controller');

payoutModeRoute.route('/getAllPayoutMode').get(authMiddleware,getAllPayoutMode);
payoutModeRoute.route('/insertPayoutMode').post(authMiddleware,insertPayoutMode);
payoutModeRoute.route('/deletePayoutMode').delete(authMiddleware,deletePayoutMode);
payoutModeRoute.route('/updatePayoutMode/:payoutModeId').patch(authMiddleware,updatePayoutMode);

module.exports = payoutModeRoute;

