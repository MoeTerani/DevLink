'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
var User = mongoose.Model('user', UserSchema);
module.exports = User;
