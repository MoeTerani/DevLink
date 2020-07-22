export {};
import * as express from 'express';
const router = express.Router();
const Auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post(
  '/',
  [Auth, [body('text', 'text is required').not().isEmpty()]],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //@ts-ignore-start
      const user: any = await User.findById(req.user.id).select('-password');
      //@ts-ignore-end
      const { text } = req.body;
      const newPost = new Post({
        text: text,
        name: user.name,
        avatar: user.avatar,
        //@ts-ignore-start
        user: req.user.id,
        //@ts-ignore-end
      });

      await newPost.save();
      res.json(newPost);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);

module.exports = router;
