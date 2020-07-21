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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var router = express.Router();
var Auth = require('../../middleware/auth');
var User = require('../../models/User');
var jwt = require('jsonwebtoken');
var config = require('config');
var bcrypt = require('bcryptjs');
var _a = require('express-validator'), body = _a.body, validationResult = _a.validationResult;
// @route   GET api/auth/
// @desc    Test route
// @access  public
router.get('/', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findById(req.user.id).select('-password')];
            case 1:
                user = _a.sent();
                //@ts-ignore-end
                res.json({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route   POST api/auth/
// @desc    Athenticate user and get token
// @access  public
router.post('/', [
    // username must be an email
    body('email', 'A valid Email Email is required').isEmail(),
    body('password', 'A 6 character Password is required').exists(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, passIsMatched, payload, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Credentials' }] })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                passIsMatched = _c.sent();
                if (!passIsMatched) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Credentials' }] })];
                }
                payload = {
                    //the id is the _id from db(in mongoose we can write id not _id) and is back with the promise user.save()
                    user: {
                        id: user.id,
                    },
                };
                jwt.sign(payload, config.get('jwtSecret'), {
                    expiresIn: '5h',
                }, function (err, token) {
                    if (err)
                        throw err;
                    return res.json({ token: token });
                });
                return [3 /*break*/, 5];
            case 4:
                _b = _c.sent();
                (function (err) {
                    res.status(500).json('Server Error' + err);
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
