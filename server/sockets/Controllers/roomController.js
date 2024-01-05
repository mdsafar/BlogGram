import Room from "../Models/rooms.js";


export const newRoomCreated = async ({ socket, from, to }) => {
    try {
        const roomId = Date.now()

        const roomFound = await Room.findOne({
            $or: [
                { $and: [{ from: from }, { to: to }] },
                { $and: [{ from: to }, { to: from }] }
            ]
        })

        if (!roomFound) {
            const room = new Room({
                from: from,
                to: to,
                roomId: roomId
            })

            await room.save();
            socket.emit("new-room-created-server", (roomId))
        } else {
            socket.emit('new-room-created-server', (roomFound.roomId))
        }
    } catch (err) {
        console.log(err)
    }
}

export const joinRoom = ({ socket, roomId }) => {
    socket.join(roomId)
    socket.broadcast.emit("new-room-created");
}

