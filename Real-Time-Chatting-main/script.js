document.addEventListener('DOMContentLoaded', function () {
  // Step 3: Connect to the server using Socket.io
  const socket = io();

  // Step 4: Get references to HTML elements
  const messageContainer = document.getElementById('message-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // Step 5: Add event listeners for sending messages
  sendButton.addEventListener('click', function (e) {
    e.preventDefault();
    sendMessage();
  });

  document.getElementById('send-container').addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
  });

  // Step 6: Define the sendMessage function
  function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
      socket.emit('chat message', message);
      messageInput.value = '';
    }
  }

  // Step 7: Listen for incoming chat messages and user join/leave events
  socket.on('chat message', function (msg) {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  socket.on('user joined', function (username) {
    const joinMessage = document.createElement('div');
    joinMessage.textContent = `${username} joined the chat`;
    messageContainer.appendChild(joinMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });

  socket.on('user left', function (username) {
    const leaveMessage = document.createElement('div');
    leaveMessage.textContent = `${username} left the chat`;
    messageContainer.appendChild(leaveMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });
});
