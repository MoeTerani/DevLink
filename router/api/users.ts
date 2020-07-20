import * as express from 'express';

const router = express.Router();

// @route   GET api/users/
// @desc    Test route
// @access  public
router.get('/', (req: express.Request, res: express.Response) =>
  res.send('user route')
);

module.exports = router;
