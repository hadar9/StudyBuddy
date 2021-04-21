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
    type: Boolean,
  },
  subadmins: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'user',
      },
      permission: {
        createfolder: {
          type: Boolean,
          default: false,
        },

        upload: {
          type: Boolean,
          default: false,
        },
        rename: {
          type: Boolean,
          default: false,
        },
        delete: {
          type: Boolean,
          default: false,
        },
        buddymang: {
          type: Boolean,
          default: false,
        },
        editmess: {
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
        ref: 'user',
      },
      status: {
        type: String,
      },

      download: {
        type: Boolean,
        default: true,
      },
      isadmin: {
        type: Boolean,
        default: false,
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
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Drive = mongoose.model('drive', DriveSchema);
