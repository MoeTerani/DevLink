import * as express from 'express';

const router = express.Router();
const Auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { body, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

router.get('/me', Auth, async (req: express.Request, res: express.Response) => {
  try {
    const profile = await Profile.findOne({
      //@ts-ignore-start
      user: req.user.id,
    }).populate('User', ['name', 'avatar']); // user here is the user with the linked type ObjectId in the model - so we findOne with the user object field in the model.
    //@ts-ignore-end
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server Error' + error.message);
  }
});

// @route   POST api/profile
// @desc    Create a user profile
// @access  Private

router.post(
  '/',
  [
    Auth,
    [
      body('status', 'status is empty').not().isEmpty(),
      body('skills', 'skills is required').not().isEmpty(),
    ],
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const profileFields: any = {
      //@ts-ignore-start
      user: req.user.id,
      //@ts-ignore-end
      company,
      location,
      website,
      //   website:
      //     website && website !== ''
      //       ? normalize(website, { forceHttps: true })
      //       : '',
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill: string) => ' ' + skill.trim()),
      status,
      githubusername,
    };

    // Build social object and add to profileFields
    const socialfields = { youtube, twitter, instagram, linkedin, facebook };
    profileFields.social = socialfields;
    try {
      //@ts-ignore-start
      let profile = await Profile.findOne({ user: req.user.id });
      //@ts-ignore-end

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          //@ts-ignore-start
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        //@ts-ignore-end
        return res.json(profile);
      }

      // Create a profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);

module.exports = router;
