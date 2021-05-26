const mongoose = require('mongoose');

const ChatGroupSchema = mongoose.Schema({
    names: [
      {
        type: String
      }
    ],
    group: [
    {
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'user', //Reference to the user model
    }
    ],
    group_name: {
      type: String,
    },
  });

//collection
module.exports =  mongoose.model('group', ChatGroupSchema);