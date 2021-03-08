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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FileSystem = mongoose.model('filesystem', FileSystemSchema);
