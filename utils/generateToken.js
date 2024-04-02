const jwt = require('jsonwebtoken');
const generateToken=async(user)=>{
    return jwt.sign({ user }, 'secret-key', { expiresIn: '1h' });
}

module.exports={generateToken}