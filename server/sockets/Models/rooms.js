import mongoose from "mongoose";


const roomSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roomId:{
        type:String,
        required:true
    },
    chats:[
        { 
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            message:{
                type:String,
                required:true
            },
            time: String,
        },
    ],
})

const Room = mongoose.model("Room",roomSchema)

export default Room