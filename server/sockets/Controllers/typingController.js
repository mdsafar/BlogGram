
export const typingStarted = ({ socket, room }) => {
    let skt = socket.broadcast;
    skt = room ? skt.to(room) : skt;
    skt.emit("typing-started-from-server");
  };
  
  export const typingStopped = ({ socket, room }) => {
    let skt = socket.broadcast;
    skt = room ? skt.to(room) : skt;
    skt.emit("typing-stopped-from-server");
  };