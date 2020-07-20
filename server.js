"use strict";
var express = require('express');
var app = express();
app.get('/', function (req, res) { return res.send('API runnning '); });
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log('Server is running on port ' + port); });
