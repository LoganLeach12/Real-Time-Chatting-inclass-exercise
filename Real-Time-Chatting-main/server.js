const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Step 8: Serve static files
app.use(express.static(__dirname));

// Step 9: Handle Socket.io events
io.on('connection', (socket) => {
  console.log('a user connected');

  // Step 10: Broadcast to all clients when a user joins
  socket.broadcast.emit('user joined', 'User');

  // Step 11: Listen for chat messages and broadcast them to all clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Step 12: Handle disconnection and broadcast when a user leaves
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user left', 'User');
  });
});

// Step 13: Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
