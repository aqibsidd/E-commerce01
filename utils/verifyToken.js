const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secret-key');
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: 'Invalid token' });
    }
  };

module.exports={verifyToken}