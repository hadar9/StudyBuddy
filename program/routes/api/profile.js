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
    }).populate('user', 'username');
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

//@route    POST api/profile
//@desc     update user profile
//@access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { avatar, firstname, lastname, studyat, studyfield } = req.body;
  profileFields = {};
  profileFields.user = req.user.id;
  firstname
    ? (profileFields.firstname = firstname)
    : (profileFields.firstname = '');
  avatar
    ? (profileFields.avatar = avatar)
    : (profileFields.avatar = 'holder.js/171x180');
  lastname
    ? (profileFields.lastname = lastname)
    : (profileFields.lastname = '');
  studyat ? (profileFields.studyat = studyat) : (profileFields.studyat = '');
  studyfield
    ? (profileFields.studyfield = studyfield)
    : (profileFields.studyfield = '');

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // Update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    ).populate('user', 'username');
    return res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error.');
  }
});

//@route    Post api/profile/profiels
//@desc     post all profiles with the username
//@access   Public

router.post('/profiels', auth, async (req, res) => {
  try {
    username = req.body;
    const users = await User.find({
      username: new RegExp('^' + username.username, 'i'),
    });

    const profiles = [];
    for (i = 0; i < users.length; i++) {
      let profile = await Profile.find({ user: users[i]._id });
      profiles.push(profile);
    }
    if (profiles === null) {
      return res.status(400).json({ msg: 'Username is not correct!' });
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     Get current users profile
//@access   Private

router.get('user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', 'username');
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;
