const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/buddies', require('./routes/api/buddies'));
app.use('/api/drives', require('./routes/api/drives'));
app.use('/api/filesystem', require('./routes/api/filesystem'));

io.on('connection', (socket) => {
  socket.emit('sendmessage', 'hi');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`));
