const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  messages: [
    {
      sender: {
        type: String,
      },
      content: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = Chat = mongoose.model('chat', ChatSchema);
