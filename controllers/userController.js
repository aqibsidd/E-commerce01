const { validationResult } = require('express-validator');
const user = require('../models/user')
const {generateToken}=require("../utils/generateToken");
const {
    resServerError, 
    resFound,
    resDocCreated,
    resDocUpdated,
    resDocDeleted,
    resNotFound,
    resPasswordMismatch,
  } = require("../utils/response");

  


  let createUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resPasswordMismatch(res,"please enter a valid password");
      }
      const { username, email, password } = req.body;
      const doc = await user.create({ username, email, password });
  
      return resDocCreated(res,doc);
    } catch (error) {
      console.error(error);
      return resServerError(res, error);
    }
  };
  
  // Authenticate user login
  let loginUser = async (req, res) => {
    try { 
      const { username, password } = req.body;
      const doc = await user.findOne({ username, password},{username}); 
      if (!doc) {
        return resNotFound(res,"Invalid username or password")
      } 
      const token = await generateToken(doc);
      return resFound(res,token)
    } catch (error) {
      console.error(error);
      return resServerError(res, error);
    }
  };

  let getUserbyId = async (req, res) => {
    try {
      let docs = await user.findById({ _id: req.query.id });
      return resFound(res, docs);
    } catch (error) {
      throw error;
    }
  };
  
  
  let getAllUsers = async (req, res) => {
    try {
      let docs = await user.find({});
      return resFound(res, docs);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
  let updateUserById = async (req, res) => {
    try {
      const UserId = req.query.id;
      let User = await user.findById({_id: UserId});
      if (!User) {
        return resNotFound(res, "User not found");
      }
      User = await User.updateOne(req.body);
      return resDocUpdated(res, User);
    } catch (error) {
      console.log(error);
      return resServerError(res, error);
    }
  };
  
  let deleteUserById = async (req, res) => {
    try {
      const UserId = req.query.id;
      let User = await user.findOne({_id: UserId});
      if (!User) {
        return resNotFound(res, "User not found");
      }
      User = await User.deleteOne(req.body);
  
      return resDocDeleted(res, User);
    } catch (error) {
      console.log(error);
      return resServerError(res, error);
    }
  };
  module.exports = {
    createUser,
    loginUser,
    getUserbyId,
    getAllUsers,
    updateUserById,
    deleteUserById,
  };
  

