"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var connectDB = require('./config/db');
var app = express();
//Connect DB
connectDB();
// initialize Middleware
app.use(express.json({ extended: false }));
app.get('/', function (req, res) { return res.send('API runnning '); });
// Routes
app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
// app.use('/api/posts', require('./router/api/posts'));
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log('Server is running on port ' + port); });
