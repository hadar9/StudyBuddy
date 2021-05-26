const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    _id: 
    {   
      type: mongoose.Schema.Types.ObjectId, //Foreign key
      ref: 'group', //Reference to the user model
    },
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

//collection
module.exports =  mongoose.model('message', MessageSchema);