"use strict";
var jwt = require('jsonwebtoken');
var config = require('config');
module.exports = function (req, res, next) {
    // Get token from header
    var token = req.header('x-auth-token');
    // if no token provided
    if (!token) {
        return res.status(401).json({ msg: 'No token , Authentication failed' });
    }
    // veeify token and
    try {
        var decoded = jwt.verify(token, config.get('jwtSecret'));
        console.log(decoded);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
