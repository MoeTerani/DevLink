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

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);

// @route   GET api/post/me
// @desc    Get current user posts
// @access  Private

router.get('/me', Auth, async (req: express.Request, res: express.Response) => {
  try {
    const post = await Post.find({
      //@ts-ignore-start
      user: req.user.id,
    }).populate('user', ['name', 'avatar']); // user here is the user with the linked type ObjectId in the model - so we findOne with the user object field in the model.
    //@ts-ignore-end
    if (!post) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).send('Server Error' + error.message);
  }
});

module.exports = router;
