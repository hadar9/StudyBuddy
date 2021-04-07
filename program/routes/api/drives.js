const c = require('config');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Drive = require('../../models/Drive');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

search = async function (drivename, userid) {
  let drives = await Drive.find({
    name: new RegExp('^' + drivename, 'i'),
    drivepermission: false,
  }).populate('user');

  let returmdrives = [];

  for (let i = 0; i < drives.length; i++) {
    let driveid = drives[i]._id;
    let drivename = drives[i].name;
    let driveowner = drives[i].user;
    let buddiescount = drives[i].drivebuddies.filter(
      (buddy) => buddy.status === 'drivebuddy'
    ).length;
    let buddystatus = 'nothing';
    for (let j = 0; j < drives[i].drivebuddies.length; j++) {
      if (
        JSON.stringify(drives[i].drivebuddies[j].user) ===
        JSON.stringify(userid)
      ) {
        buddystatus = drives[i].drivebuddies[j].status;
        break;
      }
    }
    let returnelem = {
      driveid: driveid,
      drivename: drivename,
      driveowner: driveowner,
      buddiescount: buddiescount,
      buddystatus: buddystatus,
    };
    returmdrives.push(returnelem);
  }
  return returmdrives;
};

//@route    GET api/drives/getmydrives
//@desc     get drives
//@access   Private
router.get('/getmydrives', auth, async (req, res) => {
  try {
    const id = req.user.id;
    const userdrives = await Drive.find({ user: id }).populate([
      'drivebuddies.user',
      'subadmins.user',
    ]);
    res.json(userdrives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/getotherdrives', auth, async (req, res) => {
  try {
    const otherdrive = await Profile.findOne({
      user: req.user.id,
    }).populate('otherdrives');

    res.json(otherdrive.otherdrives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/searchdrives', auth, async (req, res) => {
  try {
    const drivename = req.body.drivename;
    const drives = await search(drivename, req.user.id);
    res.json(drives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/joindrive', auth, async (req, res) => {
  try {
    const { driveid, searchdrive } = req.body;

    const buddyrequest = {
      user: req.user.id,
      status: 'request',
    };

    let drive = await Drive.findOneAndUpdate(
      { _id: driveid },
      { $push: { drivebuddies: buddyrequest } }
    );
    drive.save();
    const drives = await search(searchdrive, req.user.id);
    res.json(drives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
router.post('/confirmjoindrive', async (req, res) => {
  try {
    const { driveid, userid } = req.body;

    let drive = await Drive.findOneAndUpdate(
      { _id: driveid, 'drivebuddies.user': userid },
      { $set: { 'drivebuddies.$.status': 'drivebuddy' } },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);
    let user = await Profile.findOneAndUpdate(
      { user: userid },
      { $push: { otherdrives: driveid } }
    );
    drive.save();
    user.save();
    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
//drive buddy leave
router.post('/leavedrive', auth, async (req, res) => {
  try {
    const { driveid, searchdrive } = req.body;

    let drive = await Drive.findOneAndUpdate(
      { _id: driveid },
      { $pull: { drivebuddies: { user: req.user.id } } }
    );
    let user = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { otherdrives: driveid } }
    );
    drive.save();
    user.save();
    const drives = await search(searchdrive, req.user.id);
    res.json(drives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
//delete drive buddy
router.post('/deletebuddy', auth, async (req, res) => {
  try {
    const { driveid, userid } = req.body;

    let drive = await Drive.findOneAndUpdate(
      { _id: driveid },
      { $pull: { drivebuddies: { user: userid } } },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);
    let user = await Profile.findOneAndUpdate(
      { user: userid },
      { $pull: { otherdrives: driveid } }
    );
    drive.save();
    user.save();

    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
//delete req buddy
router.post('/delete', auth, async (req, res) => {
  try {
    const { driveid, searchdrive } = req.body;

    let drive = await Drive.findOneAndUpdate(
      { _id: driveid },
      { $pull: { drivebuddies: { user: req.user.id } } }
    );
    drive.save();
    const drives = await search(searchdrive, req.user.id);
    res.json(drives);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
//reject user req to join
router.post('/rejectreq', auth, async (req, res) => {
  try {
    const { driveid, userid } = req.body;
    let drive = await Drive.findOneAndUpdate(
      { _id: driveid },
      { $pull: { drivebuddies: { user: userid } } },
      { new: true }
    );
    drive.save();

    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/addadmin', auth, async (req, res) => {
  try {
    const { driveid, userid } = req.body;
    const drive = await Drive.findOneAndUpdate(
      { _id: driveid, 'drivebuddies.user': userid },
      {
        $set: { 'drivebuddies.$.isadmin': true },
      }
    );
    drive.save();
    const newadmin = {
      user: userid,
    };
    const retdrive = await Drive.findOneAndUpdate(
      { _id: driveid },
      {
        $push: { subadmins: newadmin },
      },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);
    retdrive.save();
    res.json(retdrive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/deleteadmin', auth, async (req, res) => {
  try {
    const { driveid, userid } = req.body;

    const drive = await Drive.findOneAndUpdate(
      { _id: driveid, 'drivebuddies.user': userid },
      {
        $set: { 'drivebuddies.$.isadmin': false },
      },
      { new: true }
    );
    drive.save();
    const retdrive = await Drive.findOneAndUpdate(
      { _id: driveid },
      {
        $pull: { subadmins: { user: userid } },
      },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);
    retdrive.save();
    res.json(retdrive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/setdrivepermission', auth, async (req, res) => {
  try {
    const { driveid, permission } = req.body;

    let drive;
    if (permission) {
      drivetemp = await Drive.findOne({ _id: driveid });
      if (drivetemp.drivebuddies.length > 0) {
        drivetemp.drivebuddies.map(async (buddy) => {
          let user = await Profile.findOneAndUpdate(
            { user: buddy.user },
            { $pull: { otherdrives: driveid } }
          );
          user.save();
        });
      }
      drive = await Drive.findOneAndUpdate(
        { _id: driveid },
        {
          $set: {
            drivepermission: permission,
            drivebuddies: [],
            subadmins: [],
          },
        },
        { new: true }
      ).populate(['drivebuddies.user', 'subadmins.user']);
    } else {
      drive = await Drive.findOneAndUpdate(
        { _id: driveid },
        { $set: { drivepermission: permission } },
        { new: true }
      ).populate(['drivebuddies.user', 'subadmins.user']);
    }
    drive.save();
    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
router.post('/setbuddypermission', auth, async (req, res) => {
  try {
    const { driveid, buddyid, newper } = req.body;
    const drive = await Drive.findOneAndUpdate(
      { _id: driveid, 'drivebuddies._id': buddyid },
      { $set: { 'drivebuddies.$.download': newper } },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);
    drive.save();
    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/setadminpermission', auth, async (req, res) => {
  try {
    const {
      driveid,
      adminid,
      createfolder,
      upload,
      edit,
      deletee,
      buddymang,
      editmess,
    } = req.body;
    const permission = {
      createfolder,
      upload,
      edit,
      delete: deletee,
      buddymang,
      editmess,
    };
    const drive = await Drive.findOneAndUpdate(
      { _id: driveid, 'subadmins._id': adminid },
      {
        $set: { 'subadmins.$.permission': permission },
      },
      { new: true }
    ).populate(['drivebuddies.user', 'subadmins.user']);

    drive.save();
    res.json(drive);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/choosedrive', auth, async (req, res) => {
  try {
    const { drive, drivetype } = req.body;

    const driveret = await Drive.findOne({ _id: drive._id }).populate([
      'drivebuddies.user',
      'subadmins.user',
    ]);

    let adminper;
    if (drivetype === 'mydrives') {
      adminper = null;
    } else {
      adminper = 'notadmin';
      if (driveret.subadmins.length > 0) {
        for (let i = 0; i < driveret.subadmins.length; i++) {
          if (
            JSON.stringify(driveret.subadmins[i].user._id) ===
            JSON.stringify(req.user.id)
          ) {
            adminper = driveret.subadmins[i].permission;
            break;
          }
        }
      }
    }

    const resp = { resdrive: driveret, per: adminper };
    res.json(resp);
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
    drive.drivepermission = true;
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
