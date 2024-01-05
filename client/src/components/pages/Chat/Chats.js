import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Chats.css'
import { getMyInbox } from "../../../actions/chatAction";
import Loader from "../../layout/Loader/Loader";
import Header from "../../layout/Header/Header";



const Chats = () => {

    const dispatch = useDispatch()
    const { user: loggedUser } = useSelector((state) => state.user)
    const { users, loading } = useSelector((state) => state.myInbox)

    useEffect(() => {
        dispatch(getMyInbox())
    }, [dispatch])


    const fromLoggedUser = users?.some((usr) => usr.from._id === loggedUser._id)

    return <>
        <Header />
        {loading ? (
            <Loader />
        ) : (
            <section className="chat-section">
                <div className="chat">
                    <h1 className="heading">Messages</h1>
                    <div className="chat-user-list">
                    {users &&
                         users.length !== 0 ? (
                            users?.map((user) => {
                                return  user.chats.length !== 0 && (
                                    <Link to={`/direct/t/${user?.roomId}`} className="chat-user" key={user?._id}>
                                        <div className="chat-user-img">
                                            <img src={fromLoggedUser ? user?.to.avatar?.url : user?.from.avatar?.url} alt="" />
                                        </div>
                                        <div className="chat-user-name">
                                            <h1>{fromLoggedUser ? user?.to.fullname : user?.from.fullname}</h1>
                                            <p>{user.chats.slice(-1).map((msg) => msg.message.slice(0, 20))}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        ):(
                            <div className="no-chats"> <h1>Chat with friends :)</h1></div> 
                        )
                      }
                    </div>
                </div>
            </section>
        )}
    </>
}


export default Chats;
