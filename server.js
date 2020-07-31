"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
app.get('/', function (req, res) { return res.send('API running '); });
// Routes
app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
app.use('/api/posts', require('./router/api/posts'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log('Server is running on port ' + port); });
