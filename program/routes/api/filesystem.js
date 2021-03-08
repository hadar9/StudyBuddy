const c = require('config');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Drive = require('../../models/Drive');
const FileSystem = require('../../models/FileSystem');
const mongoose = require('mongoose');

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
        { $push: { children: newfolder._id } }
      );
    } else {
      parentupdated = await FileSystem.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfolder._id } }
      );
    }
    parentupdated.save();
    console.log(newfolder);

    res.status(200).json(newfolder);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
