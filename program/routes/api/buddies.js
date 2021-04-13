const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Chat = require('../../models/Chat');
const { check, validationResult } = require('express-validator');

const search = async (username, id) => {
  let myprofile = await Profile.findOne({ user: id });
  const users = await User.find({
    username: new RegExp('^' + username, 'i'),
  });
  console.log(users);
  const withoutmyprofile = users.filter(
    (user) => JSON.stringify(myprofile.user) !== JSON.stringify(user._id)
  );

  const profiles = [];

  for (i = 0; i < withoutmyprofile.length; i++) {
    let profile = await Profile.findOne({
      user: withoutmyprofile[i]._id,
    }).populate('user');

    let hasbuddy = -1;
    let profilewithstatus;

    for (j = 0; j < myprofile.buddies.length; ++j) {
      if (
        JSON.stringify(myprofile.buddies[j].user) ===
        JSON.stringify(withoutmyprofile[i]._id)
      ) {
        hasbuddy = j;
        break;
      }
    }
    if (hasbuddy === -1) {
      profilewithstatus = { profile: profile, status: 'nothing' };
    } else {
      profilewithstatus = {
        profile: profile,
        status: myprofile.buddies[hasbuddy].status,
      };
    }
    profiles.push(profilewithstatus);
  }
  return profiles;
};

//@route    Post api/buddies/buddies
//@desc     show(from th search) all profiles with the username
//@access   Public

router.post('/buddies', auth, async (req, res) => {
  try {
    const profiles = await search(req.body.username, req.user.id);
    res.json(profiles);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/buddies/buddyprofile
//@desc     Get current user profile
//@access   Private

router.post('/buddyprofile', auth, async (req, res) => {
  try {
    id = req.body;
    let profile = await Profile.findOne({ user: id.id }).populate('user');
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
    }).populate('user');

    const profiles = [];
    for (i = 0; i < myprofile.buddies.length; i++) {
      if (myprofile.buddies[i].status === key.key) {
        let profile = await Profile.findOne({
          user: myprofile.buddies[i].user,
        }).populate('user');
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
    let myprofile = await Profile.findOne({ user: req.user.id });
    let hasbuddy = -1;
    for (j = 0; j < myprofile.buddies.length; ++j) {
      if (JSON.stringify(myprofile.buddies[j].user) === JSON.stringify(id.id)) {
        hasbuddy = 0;
        break;
      }
    }
    if (hasbuddy === -1) {
      chat = new Chat([]);
      let userprofile = await Profile.findOneAndUpdate(
        { user: id.id },
        { $push: { buddies: userconfirmequest, chat: chat._id } },
        { new: true }
      );
      //get the current user
      let myprofile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { buddies: mybuddyrequest, chat: chat._id } },
        { new: true }
      );
      myprofile.save();
      userprofile.save();
      res.send('added succses');
    } else {
      res.send('already added ');
    }
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
    chat = new Chat([]);
    //get the current user
    let myprofile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'buddies.user': id.id },
      { $set: { 'buddies.$.status': 'mybuddy' } }
    );
    myprofile.$push({ chat: chat._id });
    let userprofile = await Profile.findOneAndUpdate(
      { user: id.id, 'buddies.user': req.user.id },
      { $set: { 'buddies.$.status': 'mybuddy' } }
    );
    userprofile.$push({ chat: chat._id });

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
