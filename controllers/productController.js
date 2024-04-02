
const product = require('../models/product')
const {
    resServerError,
    resFound,
    resDocCreated,
    resDocUpdated,
    resDocDeleted,
    resNotFound,
  } = require("../utils/response");
const ITEMS_PER_PAGE = 5;
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
        const page = +req.query.page || 1;
        const {searchKeyword} = req.query || '';
        const {filterOptions} = req.query || {}; 
        const {sortOptions} = req.query || 'name'; 
        const {order} = req.query || 'DESC'; 
        
        const totalCount = await product.countDocuments({ name: { $regex: searchKeyword, $options: 'i' }, ...filterOptions })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
        const products = await product.find({ name: { $regex: searchKeyword, $options: 'i' }, ...filterOptions })
            .sort({[sortOptions]:order})
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        return resFound(res, { products, totalCount });
    } catch (error) {
        console.log(error);
        return resServerError(res, error);
    }
};
  
  let updateProductById = async (req, res) => {
    try {
      const ProductId = req.query.id;
      let Product = await product.findById({_id: ProductId});
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
      let Product = await product.findById({_id: ProductId});
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
  

