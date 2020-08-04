"use strict";
exports.__esModule = true;
var express = require('express');
var connectDB = require('./config/db');
var path = require('path');
var cors = require('cors');
var app = express();
//Connect DB
connectDB();
app.use(cors());
// initialize Middleware
app.use(express.json({ extended: false }));
// Routes
app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
app.use('/api/posts', require('./router/api/posts'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log('Server is running on port ' + port); });
