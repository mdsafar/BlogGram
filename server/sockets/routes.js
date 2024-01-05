import { deleteMessage, sendMessage } from "./Controllers/messageController.js";
import { joinRoom, newRoomCreated } from "./Controllers/roomController.js";
import { typingStarted, typingStopped } from "./Controllers/typingController.js";

const sockets = (socket) => {
  socket.on('send-message', (data) => sendMessage({ socket, ...data }))
  socket.on('delete-message', (data) => deleteMessage({ socket, ...data }));
  socket.on('join-room', (data) => joinRoom({ socket, ...data }))
  socket.on('new-room-created', (data) => newRoomCreated({ socket, ...data }))
  socket.on("typing-started", (data) => typingStarted({ socket, ...data }));
  socket.on("typing-stopped", (data) => typingStopped({ socket, ...data }));


  socket.on("disconnect", () => {
    console.log('user left');
  });

}

export default sockets;