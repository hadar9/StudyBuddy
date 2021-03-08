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

router.post('/choosedrive', auth, async (req, res) => {
  try {
    const drive = req.body.drive;
    let returndrive = {};
    returndrive._id = drive._id;
    returndrive.objtype = drive.objtype;
    returndrive.user = drive.user;
    returndrive.name = drive.name;
    returndrive.path = drive.path;
    returndrive.drivepermission = drive.drivepermission;
    returndrive.subadmins = drive.subadmins;
    returndrive.drivebuddies = drive.drivebuddies;
    returndrive.chatgroup = drive.chatgroup;

    const childersas = await Promise.all(
      drive.children.map((child) => FileSystem.findOne({ _id: child }))
    );
    returndrive.children = childersas;
    res.json(returndrive);
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

    let newdrive = new Drive(drive);
    await newdrive.save();
    res.status(200).send('drive created');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
