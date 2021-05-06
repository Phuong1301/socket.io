const express = require("express");
const socket = require("socket.io");
const path=require('path')

const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
// Static files
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const io = socket(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

Users = [];


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connected', 'connected with server')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('addUser', function(data) {
    console.log( data + " user is login");
    Users.push(data);
  });

  socket.on('findUser', function(data) {
    var user = Users.find(user => { return user == data})
    if(!user) {
      io.emit('notfound', 'the user is not connect');
    }
    else {
      io.emit('found', user);
      socket.join('room1');
    }
  })
});

io.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat-message', msg);
  });
});
