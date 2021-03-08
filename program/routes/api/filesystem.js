const c = require('config');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Drive = require('../../models/Drive');
const FileSystem = require('../../models/FileSystem');

//@route    POST api/filesystem/createfolder
//@desc     create new folder
//@access   Private
router.post('/createfolder', auth, async (req, res) => {
  try {
    const { parent, foldername, url } = req.body;
    folder = {};
    folder.name = foldername;
    folder.url = url;
    folder.path = parent.path + `/${foldername}`;
    folder.objtype = 'folder';
    folder.parent = parent._id;
    folder.children = [];

    let newfolder = new FileSystem(folder);
    await newfolder.save();

    let parentupdated;

    if (parent.objtype === 'drive') {
      parentupdated = await Drive.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfolder } }
      );
    } else {
      parentupdated = await FileSystem.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfolder } }
      );
    }
    parentupdated.save();

    res.status(200).json(parentupdated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
