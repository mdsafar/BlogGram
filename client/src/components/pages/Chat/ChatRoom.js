import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getChats } from "../../../actions/chatAction";
import ScrollToBottom from "react-scroll-to-bottom"
import Messages from "./Messages.js";
import { DELETE_MESSAGE_RESET } from "../../../constants/chatConstants";
import Loader from '../../layout/Loader/Loader'
import EmojiPicker from 'emoji-picker-react';



const ChatRoom = ({ socket }) => {
    const dispatch = useDispatch()
    const { roomId } = useParams()
    const navigate = useNavigate()
    const { user: loggedUser } = useSelector((state) => state.user)
    const { loading, chats, from, to, isDeleted } = useSelector((state) => state.myChats)
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    const [selectedMsg, setSelectedMsg] = useState('');
    const [loadAction, setLoadAction] = useState(true)
    const [showEmoji, setShowEmoji] = useState(false)



    useEffect(() => {
        if (socket) {
            socket.emit("join-room", { roomId: roomId })
        }
        dispatch(getChats(roomId))
    }, [dispatch, roomId, socket])


    function selectEmoji(item) {
       setMessage((prev)=> prev+item.emoji)
    }


    function sendMessage() {
        if (message !== '') {
            const messageData = {
                message: message,
                room: roomId,
                user: loggedUser._id,
                time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
            setMessage('')
            socket.emit('send-message', (messageData))
            setChat((prev) => [...prev, messageData])
            setShowEmoji(false)
        }
    }



    const handleDeleteMsg = () => {
        dispatch(deleteMessage(roomId, selectedMsg))
        socket.emit('delete-message', { room: roomId })
    }


    useEffect(() => {

        if (socket) {
            socket.off('message-from-server');
            socket.on('message-from-server', (data) => {
                setChat((prevChats) => [...prevChats, data]);
            });

            socket.on('message-deleted', (data) => {
                if (data.success) {
                    dispatch(getChats(roomId))
                    setLoadAction(false)

                }
            })
        }


        if (chats) {
            setChat(chats?.map((chat) => chat))
        }

        if (isDeleted) {
            dispatch(getChats(roomId))
            setLoadAction(false)
            setSelectedMsg('')
            dispatch({ type: DELETE_MESSAGE_RESET })
        }

    }, [socket, dispatch, chats, roomId, isDeleted])


    const fromLoggedUser = from?._id === loggedUser?._id

    return <>
        {loading && loadAction ? (
            <Loader />
        ) : (
            <section className="chatRoom-section">
                <div className="chatRoom">
                    <div className='chatRoom-user-container'>
                        <div>
                            <div className="chatRoom-user">
                                <i onClick={() => navigate('/direct/inbox')} className="bi bi-arrow-left-short"></i>
                                <div className="chatRoom-user-img">
                                    <Link to={fromLoggedUser ? `/${to?.username}` : `/${from?.username}`}>
                                        <img src={fromLoggedUser ? to?.avatar?.url : from?.avatar?.url} alt="" /></Link>
                                </div>
                                <div className="chatRoom-user-name">
                                    <Link to={fromLoggedUser ? `/${to?.username}` : `/${from?.username}`}>
                                        <h1>{fromLoggedUser ? to?.fullname : from?.fullname}</h1></Link>
                                </div>
                            </div>
                            {selectedMsg ? <button onClick={handleDeleteMsg}><i className="bi bi-trash3"></i></button> : ''}
                        </div>
                    </div>
                    <div className="chatRoom-msg-section">
                        <ScrollToBottom className="chatRoom-messages" >
                            {chat &&
                                chat.map((chats, index) => {
                                    return <Messages
                                        key={index}
                                        chats={chats}
                                        onSelect={setSelectedMsg}
                                        isSelected={selectedMsg && selectedMsg === chats._id} />
                                })}
                        </ScrollToBottom>
                    </div>
                    <div className='chatRoom-input-container'>
                        {showEmoji &&
                            <div className="emoji-picker">
                                <EmojiPicker height={'360px'} width={"340px"} onEmojiClick={selectEmoji} />
                            </div>
                        }
                        <i onClick={() => setShowEmoji(!showEmoji)} className="bi bi-emoji-laughing"></i>
                        <input
                            className="message-input"
                            type="text"
                            placeholder="Message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </section>
        )}
    </>

}

export default ChatRoom;