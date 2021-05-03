const mongoose = require('mongoose');
const FileSystemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  objtype: {
    type: String,
  },
  path: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId, //Foreign key
    enum: ['filesystem', 'drive'],
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'filesystem',
    },
  ],
  discussion: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId, //Foreign key
        ref: 'user',
      },
      content: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
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

module.exports = FileSystem = mongoose.model('filesystem', FileSystemSchema);
