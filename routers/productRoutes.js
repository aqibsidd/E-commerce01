const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.post('/product', ProductController.createProduct);
router.get('/product', ProductController.getProductbyId);
router.get('/products', ProductController.getAllProducts);
router.put('/product', ProductController.updateProductById);
router.delete('/product', ProductController.deleteProductById);
module.exports = router;
