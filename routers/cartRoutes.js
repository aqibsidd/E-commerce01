const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const {verifyToken} =require("../utils/verifyToken");


router.post('/cart',CartController.createCart);
router.get('/cart', CartController.getCartbyId);
router.get('/carts', CartController.getAllCarts);
router.put('/cart', CartController.updateCartById);
router.delete('/cart',CartController.deleteCartById);


module.exports = router;
