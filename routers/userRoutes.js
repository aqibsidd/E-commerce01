const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

exports.validateEmailMiddleware = (req, res, next) => {
  const email = req.body.email;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailRegex)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};
exports.validatePasswordMiddleware = (req, res, next) => {
  const password = req.body.password;

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  next();
};

router.post('/user', this.validateEmailMiddleware, this.validatePasswordMiddleware, userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user', userController.getUserbyId);
router.get('/users', userController.getAllUsers);
router.put('/user', userController.updateUserById);
router.delete('/user', userController.deleteUserById);

module.exports = router;
