const mongoose = require('mongoose');

const FileDiscussionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  content: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FileDiscussion = mongoose.model(
  'filediscussion',
  FileDiscussionSchema
);
