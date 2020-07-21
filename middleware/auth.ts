const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = (req: any, res: any, next: any) => {
  // Get token from header

  const token = req.header('x-auth-token');

  // if no token provided
  if (!token) {
    return res.status(401).json({ msg: 'No token , Authentication failed' });
  }

  // veeify token and

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
