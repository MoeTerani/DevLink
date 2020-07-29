import * as express from 'express';

const router = express.Router();
const Auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

router.get('/me', Auth, async (req: express.Request, res: express.Response) => {
  try {
    const profile = await Profile.findOne({
      //@ts-ignore-start
      user: req.user.id,
    }).populate('user', ['name', 'avatar']); // user here is the user with the linked type ObjectId in the model - so we findOne with the user object field in the model.
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
    console.log(req.body);
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

// @route   GET api/profile
// @desc    GET all user profiles
// @access  Public

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const profile = await Profile.find().populate('user', ['name', 'avatar']); // user here is the user with the linked type ObjectId in the model - so we findOne with the user object field in the model.
    //@ts-ignore-end
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available to show.' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send('Server Error' + error.message);
  }
});

// @route   GET api/profile/user/:id
// @desc    GET a user profile with id
// @access  Public

router.get('/user/:id', async (req: express.Request, res: express.Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id,
    }).populate('user', ['name', 'avatar']); // user here is the user with the linked type ObjectId in the model - so we findOne with the user object field in the model.
    //@ts-ignore-end
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    res.json(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'There is no profile available for this user.' });
    }
    res.status(500).send('Server Error' + err.message);
  }
});

// @route   DELETE api/profile
// @desc    DELETE profile , user and posts
// @access  Private

router.delete(
  '/',
  Auth,
  async (req: express.Request, res: express.Response) => {
    try {
      // todo: remove user s pots

      // remove profile
      await Profile.findOneAndRemove({
        //@ts-ignore-start
        user: req.user.id,
        //@ts-ignore-end
      });
      //remove user
      await User.findOneAndRemove({
        //@ts-ignore-start
        _id: req.user.id,
        //@ts-ignore-end
      });

      res.json('User successfully removed');
    } catch (err) {
      res.status(500).send('Server Error' + err.message);
    }
  }
);

// @route   PUT api/profile/experience
// @desc    Add  experience to a profile
// @access  Private

router.put(
  '/experience',
  [
    Auth,
    [
      body('title', 'title is required').not().isEmpty(),
      body('company', 'company is required').not().isEmpty(),
      body('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      //@ts-ignore-start
      let profile = await Profile.findOne({ user: req.user.id });
      //@ts-ignore-end

      profile.experience.push(newExperience);

      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);

// @route   DELETE api/profile/experience
// @desc    DELETE  experience of a profile
// @access  Private

router.delete(
  '/experience/:id',
  Auth,
  async (req: express.Request, res: express.Response) => {
    try {
      //@ts-ignore-start
      let profile = await Profile.findOne({ user: req.user.id });
      //@ts-ignore-end
      const id = req.params.id;
      profile.experience = profile.experience.filter(
        (experience: any) => experience.id !== id
      );

      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);
// @route   PUT api/profile/education
// @desc    Add  education to a profile
// @access  Private

router.put(
  '/education',
  [
    Auth,
    [
      body('school', 'School is required').not().isEmpty(),
      body('degree', 'Degree is required').not().isEmpty(),
      body('fieldofstudy', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        //@ts-ignore-start
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
      //@ts-ignore-end
    ],
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      //@ts-ignore-start
      let profile = await Profile.findOne({ user: req.user.id });
      //@ts-ignore-end

      profile.education.push(newEducation);

      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);

// @route   DELETE api/profile/education
// @desc    DELETE  education of a profile
// @access  Private

router.delete(
  '/education/:id',
  Auth,
  async (req: express.Request, res: express.Response) => {
    try {
      //@ts-ignore-start
      let profile = await Profile.findOne({ user: req.user.id });
      //@ts-ignore-end
      const id = req.params.id;
      profile.education = profile.education.filter(
        (education: any) => education.id !== id
      );

      await profile.save();
      res.json(profile);
    } catch (error) {
      res.status(500).send('Server Error' + error.message);
    }
  }
);
module.exports = router;
