const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const Group = require('../../models/ChatGroup');
const auth = require('../../middleware/auth');
const Pusher = require("pusher");
const mongoose = require("mongoose");




router.post('/choosegroup', auth, async (req,res)=>
{
    try{
        var messages = await Message.findById(req.body.group)
        res.json(messages);
    }
    catch (err) {
        res.status(500).send(err, 'Server Error');
    }
});

router.post('/findgroups',auth, async (req, res) => {
    const user_id = req.body.user.username;
    var other_users =[];
    try {
        var groups = await Group.find({"names" : user_id}).populate("group");
        for(var i in groups)
        {            
            if(user_id == groups[i].names[0])
            {
                other_users.push([groups[i].group[1]._id, groups[i].names[1], groups[i]._id ])
            }
            else
            {
                other_users.push([groups[i].group[0]._id, groups[i].names[0], groups[i]._id ])
            }
        }
        res.json(other_users);

      } catch (err) {
        res.status(500).send(err, 'Server Error');
      }
    });


router.post('/send', auth, async (req, res) => {
    const pusher = new Pusher({
        appId: "1208583",
        key: "15ee8a2632b6c33c4e5b",
        secret: "088fc81407965c22311e",
        cluster: "eu",
        useTLS: true,
      });

    const msg = {};
    msg.sender = req.body.sender;
    msg.content = req.body.message;
    const new_msg = await Message.findOneAndUpdate(
        { _id: req.body.group }, 
        { $push: { messages: msg } },
        {new: true}
    ).then((new_msg) => {
        pusher.trigger(`messageEvent`, 'event', new_msg, req.headers['x-socket-id']);
        return res.json(new_msg);
    });
})

module.exports = router;
