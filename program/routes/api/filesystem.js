const c = require('config');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Drive = require('../../models/Drive');
const FileSystem = require('../../models/FileSystem');
const { MongoClient } = require('mongodb');
const config = require('config');
const { body } = require('express-validator');
const uri = config.get('mongoURI');

//@route    POST api/filesystem/createfolder
//@desc     create new folder
//@access   Private
router.post('/createfolder', auth, async (req, res) => {
  try {
    const { parent, foldername, folderurl } = req.body;

    folder = {};
    folder.name = foldername;
    folder.url = folderurl;
    folder.path = parent.path + `/${foldername}`;

    folder.parent = parent._id;
    folder.children = [];
    folder.objtype = 'folder';
    folder.message = '';

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

    res.status(200).json(newfolder);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/findByID', auth, async(req, res) => {
  console.log(req.body)
  const file = FileSystem.findById(req.body);
});
//@route    POST api/filesystem/deletefile
//@desc     Delete a file from filesystem
//@access   Private

router.post('/deletefile', auth, async (req, res) => {
  // Delete from parent
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('DEFAULT');
    const fs = database.collection('filesystems');
    const drives = database.collection('drives');
    file_url = req.body.file.url;
    const file = await fs.findOne({ url: file_url });
    const in_fs = await fs.findOne({ _id: file.parent });
    if (in_fs) {
      await fs.findOneAndUpdate(
        { _id: file.parent },
        { $pull: { children: file._id } }
      );
    } else {
      await drives.findOneAndUpdate(
        { _id: file.parent },
        { $pull: { children: file._id } }
      );
    }
    const result = await fs.deleteOne({ url: file_url });
    await client.close();
    if (result.deletedCount === 1) {
      res.status(200).send('File Deleted');
    } else {
      res
        .status(200)
        .send('No documents matched the query. Deleted 0 documents.');
    }
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
    file.objtype = filename.split('.').pop();

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

router.post('/choosefolder', auth, async (req, res) => {
  try {
    const folderid = req.body.folderid;
   
    const folderres = await FileSystem.findOne({_id:folderid}).populate('children');
    res.json(folderres);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
router.post('/editmessage', auth, async (req, res) => {
  try {
    const { folder, message } = req.body;

    if (folder.objtype === 'drive') {
      updatedfolder = await Drive.findOneAndUpdate(
        { _id: folder._id },
        { $set: { message: message } }
      );
    } else {
      updatedfolder = await FileSystem.findOneAndUpdate(
        { _id: folder._id },
        { $set: { message: message } }
      );
    }

    res.json(updatedfolder);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
