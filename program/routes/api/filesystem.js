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
    folder.parent = parent._id;
    folder.children = [];
    folder.objtype = 'folder';

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

//@route    POST api/filesystem/createfile
//@desc     create new file
//@access   Private
router.post('/createfile', auth, async (req, res) => {
  try {
    const { parent, filename, fileurl } = req.body;
    file = {};
    file.name = filename;
    file.url = fileurl;
    file.path = parent.path + `/${filename}`;
    file.parent = parent._id;
    file.children = [];
    file.objtype = 'file';

    let newfile = new FileSystem(file);
    await newfile.save();

    let parentupdated;
    if (parent.objtype === 'drive') {
      parentupdated = await Drive.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfile._id } }
      );
    } else {
      parentupdated = await FileSystem.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfile._id } }
      );
    }

    parentupdated.save();

    res.status(200).json(newfile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
