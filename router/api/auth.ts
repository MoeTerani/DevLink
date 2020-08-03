export {};
import * as express from 'express';
const router = express.Router();
const Auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// @route   GET api/auth/
// @desc    Test route
// @access  public
router.get('/', Auth, async (req: express.Request, res: express.Response) => {
  try {
    //@ts-ignore-start
    const user = await User.findById(req.user.id).select('-password');
    //@ts-ignore-end
    res.json({ user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth/
// @desc    Authenticate user and get token
// @access  public
router.post(
  '/',
  [
    // username must be an email
    body('email', 'A valid Email Email is required').isEmail(),
    body('password', 'A 6 character Password is required').exists(),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const passIsMatched = await bcrypt.compare(password, user.password);

      if (!passIsMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // return jwt
      const payload = {
        //the id is the _id from db(in mongoose we can write id not _id) and is back with the promise user.save()
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '10h',
        },
        (err: Error, token: string) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch {
      (err: Error) => {
        res.status(500).json('Server Error' + err);
      };
    }
  }
);

module.exports = router;
