"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var User = require('../../models/User');
var _a = require('express-validator'), body = _a.body, validationResult = _a.validationResult;
var gravatar = require('gravatar');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('config');
var router = express.Router();
var Auth = require('../../middleware/auth');
// @route   POST api/users/
// @desc    Test route
// @access  public
router.post('/', [
    // username must be an email
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'A valid Email Email is required').isEmail(),
    body('password', 'A 6 character Password is required').isLength({ min: 6 }),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, name, email, password, user, avatar, salt, _b, payload, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                user = _d.sent();
                if (user) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: 'User already exist' }] })];
                }
                avatar = "https://www.avatarapi.com/js.aspx?email=" + email + "&size=128";
                // Hash the password with bcrypt
                user = new User({
                    name: name,
                    email: email,
                    password: password,
                    avatar: avatar
                });
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 3:
                salt = _d.sent();
                _b = user;
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 4:
                _b.password = _d.sent();
                // return a promise
                return [4 /*yield*/, user.save()];
            case 5:
                // return a promise
                _d.sent();
                payload = {
                    //the id is the _id from db and is back with the promise user.save()
                    user: {
                        id: user.id
                    }
                };
                jwt.sign(payload, config.get('jwtSecret'), {
                    expiresIn: '5h'
                }, function (err, token) {
                    if (err)
                        throw err;
                    return res.json({ token: token });
                });
                return [3 /*break*/, 7];
            case 6:
                _c = _d.sent();
                (function (err) {
                    res.status(500).json('Server Error' + err);
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
// @route   GET api/users/avatar/:avatar
// @desc    UPDATE AVATAR
// @access  PRIVATE
router.post('/avatar', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var avatarUrl, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                avatarUrl = req.body.avatar;
                console.log(avatarUrl);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // //@ts-ignore-start
                // let user = await User.findOne({ user: req.user.id });
                //@ts-ignore-end
                console.log(req.user.id);
                // if (user) {
                //   //update
                return [4 /*yield*/, User.findOneAndUpdate(
                    //@ts-ignore-start
                    { _id: req.user.id }, { avatar: avatarUrl }, { "new": true })];
            case 2:
                // if (user) {
                //   //update
                _a.sent();
                //@ts-ignore-end
                // return res.json(user);
                res.send('update avatar');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                // // Create a profile
                // profile = new Profile(profileFields);
                // await profile.save();
                res.status(500).send('Server Error' + error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
