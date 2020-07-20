"use strict";
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
// @route   GET api/auth/
// @desc    Test route
// @access  public
router.get('/', function (req, res) {
    return res.send('auth route');
});
module.exports = router;
