const express = require('express');
const authMiddleware = require('../middleware/auth_middleware');
const productRoute = express.Router();
const { getAllProduct,insertProduct,updateProduct,deleteProduct } = require('../controllers/product_controller');

productRoute.route('/getAllProduct').get(authMiddleware,getAllProduct);
productRoute.route('/insertProduct').post(authMiddleware,insertProduct);
productRoute.route('/deleteProduct').delete(authMiddleware,deleteProduct);
productRoute.route('/updateProduct/:productId').patch(authMiddleware,updateProduct);


module.exports = productRoute;