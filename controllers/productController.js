
const product = require('../models/product')
const {
  resServerError,
  resFound,
  resDocCreated,
  resDocUpdated,
  resDocDeleted,
  resNotFound,
} = require("../utils/response");

let createProduct = async (req, res) => {
  try {
    let requestBodyDetails = req.body;

    let doc = await product.create(requestBodyDetails);
    return resDocCreated(res, doc);
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};
let getProductbyId = async (req, res) => {
  try {
    let docs = await product.findById({ _id: req.query.id });
    return resFound(res, docs);
  } catch (error) {
    throw error;
  }
};

let getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    return resFound(res, { products });
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};

let updateProductById = async (req, res) => {
  try {
    const ProductId = req.query.id;
    let Product = await product.findById({ _id: ProductId });
    if (!Product) {
      return resNotFound(res, "Product not found");
    }
    Product = await Product.updateOne(req.body);
    return resDocUpdated(res, Product);
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};

let deleteProductById = async (req, res) => {
  try {
    const ProductId = req.query.id;
    let Product = await product.findById({ _id: ProductId });
    if (!Product) {
      return resNotFound(res, "Product not found");
    }
    Product = await Product.deleteOne(req.body);

    return resDocDeleted(res, Product);
  } catch (error) {
    console.log(error);
    return resServerError(res, error);
  }
};
module.exports = {
  createProduct,
  getProductbyId,
  getAllProducts,
  updateProductById,
  deleteProductById,
};


