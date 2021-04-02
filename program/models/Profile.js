const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //Foreign key
    ref: 'user', //Reference to the user model
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
  otherdrives: [
    {
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'drive',
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
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'chat',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
