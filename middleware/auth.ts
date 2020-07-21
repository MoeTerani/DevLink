const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = (req: any, res: any, next: any) => {
  // Get token from header

  const token = req.header('x-auth-token');

  // if no token provided
  if (!token) {
    return res.status(401).json({ msg: 'No token , Access Denied 🚫' });
  }

  // veeify token and

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    /*     // decode object looks like this :{
        user: { id: '5f16d41550935c7b1c1b4cf3' },
                iat: 1595331605,
                exp: 1595349605
            } */
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
