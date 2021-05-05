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
        { $push: { children: newfolder._id } },
        { new: true }
      ).populate('children');
    } else {
      parentupdated = await FileSystem.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfolder._id } },
        { new: true }
      ).populate('children');
    }
    parentupdated.save();

    res.status(200).json(parentupdated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/findByID', auth, async (req, res) => {
  let file;
  try {
    file = await FileSystem.findById(req.body.id);
    res.json(file);
  } catch (err) {
    res.status(500).send(err, 'Server Error');
  }
});
//@route    POST api/filesystem/deletefile
//@desc     Delete a file from filesystem
//@access   Private

router.post('/deletefile', auth, async (req, res) => {
  try {
    const file = req.body.file;
    const newfile = await FileSystem.findById(file._id);
    const parenycheck = await Drive.findById(file.parent);
    let retparent;
    if (parenycheck) {
      retparent = await Drive.findOneAndUpdate(
        { _id: newfile.parent },
        { $pull: { children: newfile._id } },
        { new: true }
      ).populate('children');
    } else {
      retparent = await FileSystem.findOneAndUpdate(
        { _id: newfile.parent },
        { $pull: { children: newfile._id } },
        { new: true }
      ).populate('children');
    }

    await FileSystem.findOneAndRemove({ _id: newfile._id });

    res.status(200).json(retparent);
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
        { $push: { children: newfile._id } },
        { new: true }
      ).populate('children');
    } else {
      parentupdated = await FileSystem.findOneAndUpdate(
        { _id: parent._id },
        { $push: { children: newfile._id } },
        { new: true }
      ).populate('children');
    }

    parentupdated.save();

    res.status(200).json(parentupdated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/choosefolder', auth, async (req, res) => {
  try {
    const folderid = req.body.folderid;
    const folderres = await FileSystem.findOne({ _id: folderid }).populate({
      path: 'children',
      populate: {
        path: 'discussion',
        populate: {
          path: 'sender',
        },
      },
    });
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

router.post('/findfolder', auth, async (req, res) => {
  try {
    const folder = await FileSystem.findOne({
      path: req.body.path,
      objtype: 'folder',
    });

    if (folder) {
      res.status(200).json(folder);
    } else {
      const drive = await Drive.findOne({
        path: req.body.path,
        objtype: 'drive',
      }).populate('children');
      res.status(200).json(drive);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/renamefile', auth, async (req, res) => {
  try {
    const { file, new_name } = req.body;

    let newpath = file.path.split('/');
    newpath.pop();
    newpath.push(new_name);
    newpath = newpath.join('/');

    if (file.objtype !== 'folder') {
      newname = new_name + '.' + file.objtype;
    } else {
      newname = new_name;
    }
    const test = await FileSystem.findOneAndUpdate(
      { _id: file._id },
      {
        $set: { name: newname, path: newpath },
      },
      { new: true }
    );

    let parentcheck = await Drive.findById(file.parent).populate('children');
    if (parentcheck === null) {
      parentcheck = await FileSystem.findById(file.parent).populate('children');
    }
    res.status(200).json(parentcheck);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/filedisaddmessage', auth, async (req, res) => {
  try {
    const { file, newmessage } = req.body;

    const updeatedfile = await FileSystem.findOneAndUpdate(
      { _id: file._id },
      {
        $push: { discussion: { sender: req.user.id, content: newmessage } },
      },
      { new: true }
    ).populate('discussion.sender');
    updeatedfile.save();
    res.status(200).json(updeatedfile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
