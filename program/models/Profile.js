const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //Foreign key
    ref: 'user', //Reference to the user model
  },
  avatar: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  studyat: {
    type: String,
  },
  studyfield: {
    type: String,
  },
  publicdrives: [
    {
      drive: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'drive',
      },
    },
  ],
  buddies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'user',
      },
      status: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
