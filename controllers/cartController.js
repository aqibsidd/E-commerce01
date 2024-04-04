const cart = require('../models/cart')
// const user = require('../models/user')
const product = require('../models/product')
const {
  resFound,
  resDocCreated,
  resDocUpdated,
  resDocDeleted,
  resNotFound,
  resServerError,
  resErrorOccurred
} = require("../utils/response");
let createCart = async (req, res) => {
  try {
    if (!req.body.productId) return resErrorOccurred(res, "Product is required");
    if (!req.body.userId) return resErrorOccurred(res, "User is required");
    if (!req.body.quantity) return resErrorOccurred(res, "Quantity is required");
    if (typeof req.body.quantity !== "number") req.body.quantity = 0;
    let requestBodyDetails = req.body;
    requestBodyDetails.userId = req.body.userId
    let productDoc = await product.findById({ "_id": req.body.productId });
    let price = (Number(req.body.quantity) * Number(productDoc.price));
    requestBodyDetails.price = price;
    let doc = await cart.create(requestBodyDetails);
    return resDocCreated(res, doc);
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};
let getCartbyId = async (req, res) => {
  try {
    let userId = req.query.id
    let docs = await cart.find({ "userId": userId });
    return resFound(res, docs);
  } catch (error) {
    throw error;
  }
};


let getAllCarts = async (req, res) => {
  try {
    let id = req.query, userId;
    let docs = await cart.find({}).populate([
      { path: 'userId', select: 'username', _id: false },
      {
        path: 'productId',
        select: 'name price ',
        _id: false
      }
    ]);

    return resFound(res, docs);
  } catch (error) {
    console.log(error);
    return error;
  }
};

let updateCartById = async (req, res) => {
  try {
    const CartId = req.query.id;
    let Cart = await cart.findById({ _id: CartId });
    if (!Cart) {
      return resNotFound(res, "Cart not found");
    }
    Cart = await Cart.updateOne(req.body);
    return resDocUpdated(res, Cart);
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};

let deleteCartById = async (req, res) => {
  try {
    const productId = req.query.id;

    let cartItem = await cart.findOne({ 'productId': productId });

    if (!cartItem) {
      return resNotFound(res, "Cart item not found");
    }
    await cartItem.deleteOne();

    return resDocDeleted(res, "Cart item deleted successfully");
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};

module.exports = {
  createCart,
  getCartbyId,
  getAllCarts,
  updateCartById,
  deleteCartById,
};