const c = require('config');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Drive = require('../../models/Drive');
const User = require('../../models/User');

//@route    GET api/drives/getmydrives
//@desc     get drives
//@access   Private
router.get('/getmydrives', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const userdrives = await Drive.find({ user: id });

    res.json(userdrives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
/*
router.post('/searchpubdrives', async (req, res) => {
  try {
    const drivename = req.body.drivename;
    let drives = await Drive.find({
      name: new RegExp('^' + drivename, 'i'),
      drivepermission: 'public',
    });

    res.json(drives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});*/

router.post('/choosedrive', auth, async (req, res) => {
  try {
    const drive = req.body.drive;
    const childersas = await Promise.all(
      drive.children.map((child) => FileSystem.findOne({ _id: child }))
    );
    drive.children = childersas;
    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@route    POST api/drives/createdrive
//@desc     create new drive
//@access   Private
router.post('/createdrive', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    drive = {};
    drive.user = user.id;
    drive.name = req.body.drivename;
    drive.path = `${user.username}/${drive.name}`;
    drive.drivepermission = 'private';
    drive.subadmins = [];
    drive.drivebuddies = [];
    drive.chatgroup = [];
    drive.children = [];
    drive.message = '';
    let newdrive = new Drive(drive);
    await newdrive.save();
    res.status(200).send('drive created');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
