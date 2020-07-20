import * as express from 'express';

const router = express.Router();

// @route   GET api/auth/
// @desc    Test route
// @access  public
router.get('/', (req: express.Request, res: express.Response) =>
  res.send('auth route')
);

module.exports = router;
