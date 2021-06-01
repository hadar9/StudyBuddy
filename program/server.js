const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const path = require('path');
//Connect to DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/buddies', require('./routes/api/buddies'));
app.use('/api/drives', require('./routes/api/drives'));
app.use('/api/filesystem', require('./routes/api/filesystem'));
app.use('/api/chat', require('./routes/api/chat'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`));
