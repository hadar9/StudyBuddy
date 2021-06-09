const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const Group = require('../../models/ChatGroup');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Pusher = require("pusher");


router.post('/leavegroup', auth, async (req,res)=>
{   
    const user_id = req.body.user._id;
    const username = req.body.user.username;
    const group_id = req.body.group;

    const group = await Group.findOneAndUpdate(
        {_id: group_id},
        {$pullAll: {names: [username], group: [user_id]}},
        {new: true},
        );
    if(group.names.length === 0)
    {
        const message = await Message.findById(group._id);
        group.delete();
        message.delete();
    }
    res.json(group);
    
});

router.post('/creategroup', auth, async (req,res)=>
{   
    const user = await User.findById(req.body.user_id);
    
    let group = new Group({names: [req.body.user], group: [req.body.user_id], group_name: req.body.name});
    let message = new Message({_id: group._id, messages: [{}]});
    const drive = await Drive.findOneAndUpdate(
        {_id: req.body.drive_id},
        { $push: { chatgroup: {_id: group._id}} },
        { new: true });
    group.save();
    message.save();
    res.json({drive: drive});
});

router.post('/adduser', auth, async (req,res)=>
{
    
    try{
        const group = await Group.findOneAndUpdate(
            { _id: req.body.group_id }, 
            { $push: { names: req.body.username, group: req.body.user} },
            {new: true}
        )
    }
    catch (err) {
        res.status(500).send(err, 'Server Error');
    }
});

router.post('/choosegroup', auth, async (req,res)=>
{
    try{
        const group = await Group.findById(req.body.group);
        var messages = await Message.findById(req.body.group)
        res.json({messages: messages, group: group});
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
            if(groups[i].group_name === "")
            {
                if(user_id == groups[i].names[0])
                {
                    other_users.push([groups[i].group[1]._id, groups[i].names[1], groups[i]._id, groups[i].group[1].avatar ])
                }
                else
                {
                    other_users.push([groups[i].group[0]._id, groups[i].names[0], groups[i]._id, groups[i].group[0].avatar ])
                }
            }
            else
            {
                other_users.push(["", groups[i].group_name, groups[i]._id]);
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
