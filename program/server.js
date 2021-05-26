const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
const Messages = require("./models/Message");
const cors = require('cors');
const Pusher = require("pusher");
const mongoose = require("mongoose");

// const pusher = new Pusher({
//   appId: "1208583",
//   key: "15ee8a2632b6c33c4e5b",
//   secret: "088fc81407965c22311e",
//   cluster: "eu",
//   useTLS: true,
// });



//Connect to DB
connectDB();
//Watch Chat stream
// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Chat connected");
//   const msgCollection = db.collection("messages");
//   const changeStream = msgCollection.watch();
//   changeStream.on('change', (change)=>{
//     if (change.operationType === "insert") {
//       const messageDetails = change.fullDocument;
//       pusher.trigger("messageEvent","inserted",{
//         name: messageDetails.name,
//         message: messageDetails.message,
//         timestamp: messageDetails.timestamp,
//         received : messageDetails.received
//     });
//   } 
//   else {
//       console.log("Error triggering Pusher");
//   }
//   })
// })

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/buddies', require('./routes/api/buddies'));
app.use('/api/drives', require('./routes/api/drives'));
app.use('/api/filesystem', require('./routes/api/filesystem'));
app.use('/api/chat', require('./routes/api/chat'))

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`));
