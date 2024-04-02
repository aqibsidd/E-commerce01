const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const {verifyToken} =require("../utils/verifyToken");


router.post('/cart',verifyToken,CartController.createCart);
router.get('/cart', verifyToken,CartController.getCartbyId);
router.get('/carts', verifyToken,CartController.getAllCarts);
router.put('/cart', verifyToken,CartController.updateCartById);
router.delete('/cart',verifyToken,CartController.deleteCartById);


module.exports = router;
