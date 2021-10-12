const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const productRoute = express.Router();
const { getAllProduct,insertProduct,updateProduct,deleteProduct,getProductsByPayoutModeId } = require('../controllers/product_controller');

productRoute.route('/getAllProduct').get(authMiddleware,getAllProduct);
productRoute.route('/getProductsByPayoutModeId').get(authMiddleware,getProductsByPayoutModeId);
productRoute.route('/insertProduct').post(authMiddleware,insertProduct);
productRoute.route('/deleteProduct').delete(authMiddleware,deleteProduct);
productRoute.route('/updateProduct/:productId').patch(authMiddleware,updateProduct);


module.exports = productRoute;