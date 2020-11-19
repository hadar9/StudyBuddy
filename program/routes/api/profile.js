const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private
router.post(
  '/',
  [auth, [check('status', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user, avatar, firstname, lastname, studyat, studyfield } = req.body;
    profileFields = {};
    profileFields.user = req.user.id;
    if (firstname) profileFields.firstname = firstname;
    if (avatar) {
      profileFields.avatar = avatar;
    } else {
      profileFields.avatar = '';
    }
    if (lastname) profileFields.lastname = lastname;
    if (studyat) profileFields.studyat = studyat;
    if (studyfield) profileFields.studyfield = studyfield;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error.');
    }
  }
);

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
