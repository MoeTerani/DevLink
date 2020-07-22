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

// @route   GET api/post
// @desc    Get All the user's posts
// @access  Private

router.get('/me', Auth, async (req: express.Request, res: express.Response) => {
  try {
    //@ts-ignore-start
    const post = await Post.find({ user: req.user.id }).sort({
      date: -1,
    }); // mongoose : sort by date , most recent first
    //@ts-ignore-end
    if (!post) {
      return res
        .status(400)
        .json({ msg: 'There is no post available for this user.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).send('Server Error' + error.message);
  }
});

// @route   GET api/post/:id
// @desc    Get a  post by id
// @access  Private

router.get(
  '/:id',
  Auth,
  async (req: express.Request, res: express.Response) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res
          .status(404)
          .json({ msg: `There is no Post with this id: ${req.params.id} ` });
      }
      res.json(post);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ msg: `There is no Post with this id: ${req.params.id} ` });
      }
      res.status(500).send('Server Error' + error.message);
    }
  }
);

// @route   GET api/post
// @desc    Get All posts
// @access  Private

router.get('/', Auth, async (req: express.Request, res: express.Response) => {
  try {
    //@ts-ignore-start
    const post = await Post.find().sort({
      date: -1,
    }); // mongoose : sort by date , most recent first
    //@ts-ignore-end
    if (!post) {
      return res
        .status(400)
        .json({ msg: 'There is no post available for this user.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).send('Server Error' + error.message);
  }
});

module.exports = router;
