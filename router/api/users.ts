export {};
import * as express from 'express';
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const Auth = require('../../middleware/auth');

// @route   POST api/users/
// @desc    Test route
// @access  public
router.post(
  '/',
  [
    // username must be an email
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'A valid Email Email is required').isEmail(),
    body('password', 'A 6 character Password is required').isLength({ min: 6 }),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }
      // Get user's Gravatar
      // const avatar = gravatar.url({
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm',
      // });
      const avatar = `https://www.avatarapi.com/js.aspx?email=${email}&size=128`;

      // Hash the password with bcrypt
      user = new User({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      // return a promise
      await user.save();

      // return jwt
      const payload = {
        //the id is the _id from db and is back with the promise user.save()
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '5h',
        },
        (err: Error, token: string) => {
          if (err) throw err;
          return res.json({ token });
        }
      );

      // res.status(200).json('New user added successfully');
    } catch {
      (err: Error) => {
        res.status(500).json('Server Error' + err);
      };
    }
  }
);

// @route   GET api/users/avatar/:avatar
// @desc    UPDATE AVATAR
// @access  PRIVATE

router.post(
  '/avatar',

  Auth,

  async (req: express.Request, res: express.Response) => {
    const avatarUrl = req.body.avatar;

    console.log(avatarUrl);

    try {
      // //@ts-ignore-start
      // let user = await User.findOne({ user: req.user.id });
      //@ts-ignore-end
      console.log(req.user.id);
      // if (user) {
      //   //update
      await User.findOneAndUpdate(
        //@ts-ignore-start
        { _id: req.user.id },
        { avatar: avatarUrl },
        { new: true }
      );
      //@ts-ignore-end
      // return res.json(user);
      res.send('update avatar');
    } catch (error) {
      // // Create a profile
      // profile = new Profile(profileFields);

      // await profile.save();
      res.status(500).send('Server Error' + error.message);
    }
  }
);

module.exports = router;
