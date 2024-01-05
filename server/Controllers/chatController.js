import AsyncHandler from "express-async-handler"
import Room from "../sockets/Models/rooms.js";


export const getMyInbox = AsyncHandler(async (req, res, next) => {
  const id = req.user._id
  try {
    const chats = await Room.find({
      $or: [{ from: id }, { to: id }],
    })
      .populate("from")
      .populate("to");

    if (chats) {
      res.json(chats);
    } else {
      throw new Error("No chats");
    }

  } catch (err) {
    next(err)
  }
})

export const getChats = AsyncHandler(async (req, res, next) => {
  try {
    const roomId = req.params.roomId

    const chats = await Room.findOne({ roomId }).populate("to").populate('from')

    if (chats) {
      res.json(chats)
    } else {
      throw Error('Lets Chat')
    }

  } catch (err) {
    next(err)
  }
})

export const deleteChat = AsyncHandler(async (req, res, next) => {
  try {
    const { roomId, chatId } = req.params
    const userId  = req.user._id

    const room = await Room.findOne({ roomId })

    if (!room) {
      throw new Error("Room not found");
    }

    const chat = room.chats.find((chat) => chat._id.toString() === chatId)

    if (!chat) {
      throw new Error("Chat not found")
    }

    if (chat.user.toString() !== userId.toString()) {
      res.status(401).json({ success: false, message: 'You Dont Have Permission' });
      return;
    }

    room.chats.pull(chat)
    await room.save()

    res.status(200).json({
      success: true,
      message: "chat Deleted"
    })

  } catch (err) {
    next(err)
  }
})