const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const e = require('express');

//@route    Post api/buddies/profiels
//@desc     show(from th search) all profiles with the username
//@access   Public

router.post('/profiels', auth, async (req, res) => {
  try {
    username = req.body;
    let profilewithstatus;

    const users = await User.find({
      username: new RegExp('^' + username.username, 'i'),
    });
    let myprofile = await Profile.findOne({ user: req.user.id });

    const profiles = [];
    for (i = 0; i < users.length; i++) {
      let profile = await Profile.findOne({ user: users[i]._id }).populate(
        'user',
        'username'
      );

      let hasbuddy = -1;
      for (j = 0; j < myprofile.buddies.length; ++j) {
        if (
          JSON.stringify(myprofile.buddies[j].user) ===
          JSON.stringify(users[i]._id)
        ) {
          hasbuddy = j;
          break;
        }
        if (JSON.stringify(myprofile.user) === JSON.stringify(users[i]._id)) {
          hasbuddy = -2;
          break;
        }
      }

      if (hasbuddy === -1) {
        profilewithstatus = { profile: profile, status: 'nothing' };
      } else if (hasbuddy !== -2) {
        profilewithstatus = {
          profile: profile,
          status: myprofile.buddies[hasbuddy].status,
        };
      }
      if (hasbuddy !== -2) {
        profiles.push(profilewithstatus);
      }
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/buddies/userprofile
//@desc     Get current user profile
//@access   Private

router.post('/userprofile', auth, async (req, res) => {
  try {
    id = req.body;
    let profile = await Profile.findOne({ user: id.id }).populate(
      'user',
      'username'
    );
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    Post api/buddies/mybuddies
//@desc     Get current users profile
//@access   Private

router.post('/mybuddies', auth, async (req, res) => {
  try {
    let key = req.body;

    const myprofile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', 'username');

    const profiles = [];
    for (i = 0; i < myprofile.buddies.length; i++) {
      if (myprofile.buddies[i].status === key.key) {
        let profile = await Profile.findOne({
          user: myprofile.buddies[i].user,
        }).populate('user', 'username');
        profiles.push(profile);
      }
    }
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/buddies/addbuddy
//@desc     add user profile
//@access   Private
router.post('/addbuddy', auth, async (req, res) => {
  try {
    //find  the user to add
    id = req.body;
    const mybuddyrequest = {
      user: id.id,
      status: 'sent',
    };
    const userconfirmequest = {
      user: req.user.id,
      status: 'request',
    };

    let userprofile = await Profile.findOneAndUpdate(
      { user: id.id },
      { $push: { buddies: userconfirmequest } }
    );
    //get the current user
    let myprofile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { buddies: mybuddyrequest } }
    );

    myprofile.save();
    userprofile.save();

    res.send('added succses');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/buddies/confirmbuddy
//@desc     update user profile
//@access   Private
router.post('/confirmbuddy', auth, async (req, res) => {
  try {
    //find  the user to confirm
    id = req.body;

    //get the current user
    let myprofile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'buddies.user': id.id },
      { $set: { 'buddies.$.status': 'mybuddy' } }
    );
    let userprofile = await Profile.findOneAndUpdate(
      { user: id.id, 'buddies.user': req.user.id },
      { $set: { 'buddies.$.status': 'mybuddy' } }
    );

    myprofile.save();
    userprofile.save();

    res.send('confirm succses');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/buddies/deletebuddy
//@desc     delete my buddy
//@access   Private
router.post('/deletebuddy', auth, async (req, res) => {
  try {
    //find  the user to confirm
    id = req.body;

    //get the current user
    let myprofile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { buddies: { user: id.id } } }
    );
    let userprofile = await Profile.findOneAndUpdate(
      { user: id.id },
      { $pull: { buddies: { user: req.user.id } } }
    );

    myprofile.save();
    userprofile.save();

    res.send('buddy deleted!');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
