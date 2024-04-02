const cart = require('../models/cart')
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
    if (!req.user) return resErrorOccurred(res, "User is required");
    if (!req.body.quantity) return resErrorOccurred(res, "Quantity is required");
    if (typeof req.body.quantity !== "number") req.body.quantity = 0;
    let requestBodyDetails = req.body;
    requestBodyDetails.userId=req.user['_id'];
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
    let docs = await cart.findById({ "_id": req.query.id });
    return resFound(res, docs);
  } catch (error) {
    throw error;
  }
};


let getAllCarts = async (req, res) => {
  try {
    let id=req.user['_id'];
    let docs = await cart.find({'userId':id}).populate([
      { path: 'userId', select: 'username' ,_id: false},
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
    const CartId = req.query.id;
    let Cart = await cart.findById({ _id: CartId });
    if (!Cart) {
      return resNotFound(res, "Cart not found");
    }
    Cart = await Cart.deleteOne(req.body);

    return resDocDeleted(res, Cart);
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