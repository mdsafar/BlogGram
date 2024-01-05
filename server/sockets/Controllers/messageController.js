import Room from "../Models/rooms.js"



export const sendMessage = async ({ socket, message, room, user, time }) => {
    try {
        const foundRoom = await Room.findOne({ roomId: room })

        if (foundRoom) {
            foundRoom.chats.push({ message, user, time });
            await foundRoom.save();


            if (socket) {
                let skt = socket.broadcast;
                skt = room ? skt.to(room) : skt;
                skt.emit('message-from-server', { message, user, time });
            }
        }
    } catch (error) {
        console.error(error);
    }
}


export const deleteMessage = async ({ socket, room }) => {
    try {

        const foundRoom = await Room.findOne({ roomId: room });

        if (foundRoom) {
            if (socket) {
                let skt = socket.broadcast;
                skt = room ? skt.to(room) : skt;
                skt.emit('message-deleted', { success : true });
            }
        }

    } catch (error) {
        console.error(error);
    }
};
