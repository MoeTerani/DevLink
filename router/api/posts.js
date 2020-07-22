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
var _a = require('express-validator'), body = _a.body, validationResult = _a.validationResult;
var User = require('../../models/User');
var Profile = require('../../models/Profile');
var Post = require('../../models/Post');
// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [Auth, [body('text', 'text is required').not().isEmpty()]], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, user, text, newPost, post, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findById(req.user.id).select('-password')];
            case 2:
                user = _a.sent();
                text = req.body.text;
                newPost = new Post({
                    text: text,
                    name: user.name,
                    avatar: user.avatar,
                    //@ts-ignore-start
                    user: req.user.id,
                });
                return [4 /*yield*/, newPost.save()];
            case 3:
                post = _a.sent();
                res.json(post);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(500).send('Server Error' + error_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route   GET api/post
// @desc    Get All the user's posts
// @access  Private
router.get('/me', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.find({ user: req.user.id }).sort({
                        date: -1,
                    })];
            case 1:
                post = _a.sent();
                //@ts-ignore-end
                if (!post) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: 'There is no post available for this user.' })];
                }
                res.json(post);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send('Server Error' + error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route   GET api/post/:id
// @desc    Get a  post by id
// @access  Private
router.get('/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!post) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ msg: "There is no Post with this id: " + req.params.id + " " })];
                }
                res.json(post);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3.kind === 'ObjectId') {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ msg: "There is no Post with this id: " + req.params.id + " " })];
                }
                res.status(500).send('Server Error' + error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route   GET api/post
// @desc    Get All posts
// @access  Private
router.get('/', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.find().sort({
                        date: -1,
                    })];
            case 1:
                post = _a.sent();
                //@ts-ignore-end
                if (!post) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ msg: 'There is no post available for this user.' })];
                }
                res.json(post);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send('Server Error' + error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route   DELETE api/posts/:id
// @desc    DELETE a  post by id
// @access  Private
router.delete('/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                //check if the user is the owner of the post before deleting it.
                // this is the post object e.x.:
                /* {
                  _id: 5f181b125ef6faa6c8f60531,
                  text: 'Lorem ipsum ',
                  name: 'john Doe',
                  avatar: '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48',
                  user: 5f17520a70ae7f9445037703,
                  likes: [],
                  comments: [],
                  date: 2020-07-22T10:55:14.983Z,
                  __v: 0
                } */
                //@ts-ignore-start
                if (post.user.toString() !== req.user.id) {
                    //@ts-ignore-end
                    return [2 /*return*/, res.status(401).json({ msg: 'User not authorized' })];
                }
                return [4 /*yield*/, post.remove()];
            case 2:
                _a.sent();
                res.json(post);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5.kind === 'ObjectId') {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ msg: "There is no Post with this id: " + req.params.id + " " })];
                }
                res.status(500).send('Server Error' + error_5.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route   PUT api/post/like/:id
// @desc    Update the likes array
// @access  Private
router.put('/like/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, Post.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (!post.likes.find(function (l) { return l.user.toString() === req.user.id; })) return [3 /*break*/, 4];
                console.log('inside the find');
                // post.likes.filter((item) => item.user.toString() !== req.user.id);
                return [4 /*yield*/, post.likes
                        //@ts-ignore-start
                        .find(function (l) { return l.user.toString() === req.user.id; })
                        .remove()];
            case 2:
                // post.likes.filter((item) => item.user.toString() !== req.user.id);
                _a.sent();
                //@ts-ignore-end
                return [4 /*yield*/, post.save()];
            case 3:
                //@ts-ignore-end
                _a.sent();
                return [2 /*return*/, res.json(post.likes)];
            case 4:
                //@ts-ignore-start
                post.likes.push({ user: req.user.id });
                //@ts-ignore-end
                return [4 /*yield*/, post.save()];
            case 5:
                //@ts-ignore-end
                _a.sent();
                res.json(post.likes);
                return [3 /*break*/, 7];
            case 6:
                error_6 = _a.sent();
                res.status(500).send('Server Error' + error_6.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
