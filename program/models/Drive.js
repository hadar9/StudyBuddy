const mongoose = require('mongoose');
const DriveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //Foreign key
    ref: 'user', //Reference to the user model
  },
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  objtype: {
    type: String,
    default: 'drive',
  },
  drivepermission: {
    type: String,
  },
  subadmins: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'profile',
      },
      perrmission: {
        watchdrive: {
          type: Boolean,
          default: true,
        },
        createfolder: {
          type: Boolean,
          default: false,
        },
        deletefolder: {
          type: Boolean,
          default: false,
        },
        downloadfile: {
          type: Boolean,
          default: true,
        },
        uploadfile: {
          type: Boolean,
          default: false,
        },
        editfile: {
          type: Boolean,
          default: false,
        },
        deletefile: {
          type: Boolean,
          default: false,
        },
        confirmbuddy: {
          type: Boolean,
          default: false,
        },
      },
    },
  ],
  drivebuddies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'profile',
      },
      perrmission: {
        watchdrive: {
          type: Boolean,
          default: true,
        },
        downloadfile: {
          type: Boolean,
          default: true,
        },
      },
      joindate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  chatgroup: [
    {
      name: {
        type: String,
        required: true,
      },
      chatbuddies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId, //Foreign key
            ref: 'profile',
          },
          joindate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
  children: [
    {
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'filesystem',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Drive = mongoose.model('drive', DriveSchema);
