import React, { useEffect, useState } from "react";
import './Profile.css'
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../layout/Loader/Loader"
import BlogCard from "../Blog/BlogCard";
import { followUser, getFollowingStatus, getUserDetails, unfollowUser } from "../../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { FOLLOW_USER_RESET } from "../../../constants/userConstants";
import SmallLoader from "../../layout/SmallLoader/SmallLoader"
import Followers from "./Followers";
import Following from "./Following";
import Header from '../../layout/Header/Header'
import NotFound from '../../layout/NotFound/NotFound'
import Footer from '../../layout/Footer/Footer'




const UserDetails = ({ socket }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, blogs, loading } = useSelector((state) => state.profile)
    const { success, loading: followLoading } = useSelector((state) => state.followUser)
    const { user: loggedUser } = useSelector((state) => state.user)
    const { followingStatus } = useSelector((state) => state.followingStatus)
    const [loadingAction, setLoadingAction] = useState(true)
    const [roomId, setRoomId] = useState('')
    const [showFollowersList, setShowFollowersList] = useState(false)
    const [showFollowingList, setShowFollowingList] = useState(false)

    const { name } = useParams()

    const isFollowing = followingStatus[name]

    const userFollowers = user?.followers
    const userFollowing = user?.following

    useEffect(() => {
        dispatch(getUserDetails(name))
        dispatch(getFollowingStatus(name))
    }, [dispatch, name])

    function handleFollowUser() {
        dispatch(followUser(user._id))
    }

    function handleUnfollowUser() {
        dispatch(unfollowUser(user._id))
    }

    function closeFollowersList() {
        setShowFollowersList(false)
    }

    function closeFollowingList() {
        setShowFollowingList(false)
    }


    const isFollowingLoggedUser = user?.following.some((following) => following._id === loggedUser?._id)


    const handleMessage = () => {

        socket.emit('new-room-created', {
            from: loggedUser._id,
            to: user._id
        })

        socket.on("new-room-created-server", (data) => setRoomId(data))
    }

    useEffect(() => {
        if (success) {
            setLoadingAction(false)
            dispatch(getUserDetails(name))
            dispatch(getFollowingStatus(name))
        }

        if (roomId) {
            navigate(`/direct/t/${roomId}`)
        }

        dispatch({ type: FOLLOW_USER_RESET })

    }, [success, dispatch, name, roomId, navigate, userFollowing, userFollowers])


    return <>
        <Header />
        {loading && loadingAction ? (
            <Loader />
        ) : (
            user ? (
                <section className="profile">
                    <div className="profile-container">
                        <div className="profile-top">
                            <div className="profile-user-img">
                                <img src={user?.avatar.url} alt="" />
                            </div>
                            <div className="details-container">
                                <div className="userdetails-name">
                                    <h1>{user?.username}</h1>
                                    <div>
                                        {isFollowing ? (
                                            <button onClick={handleUnfollowUser}>{followLoading ? <div className="unfollow-loader"><SmallLoader /></div> : 'Following'}</button>
                                        ) : (
                                            <button id="follow-btn" onClick={handleFollowUser}>{followLoading ? <div className="follow-loader" ><SmallLoader /></div> : isFollowingLoggedUser ? 'Follow Back' : 'Follow'}</button>
                                        )}
                                        <button onClick={handleMessage}>Message</button>
                                    </div>
                                </div>
                                <div className="details-follow">
                                    <div>
                                        <span>{blogs?.length}</span>
                                        <p>Blogs</p>
                                    </div>
                                    <div onClick={() => setShowFollowersList(true)}>
                                        <span>{user?.followers.length}</span>
                                        <p>Followers</p>
                                    </div>
                                    <div onClick={() => setShowFollowingList(true)}>
                                        <span>{user?.following.length}</span>
                                        <p>Following</p>
                                    </div>
                                </div>
                                <div className="details-bio">
                                    <h3>{user?.fullname}</h3>
                                    <p>{user?.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div className="user-blogs">
                            <h3>Blogs</h3>
                            <div className="blogCard-container">
                                {blogs &&
                                    blogs.length !== 0 ? (
                                    [...blogs].reverse().map((blog) => {
                                        return <BlogCard blog={blog} key={blog._id} />
                                    })
                                ) : (
                                    <div className="no-blogs">
                                        <h1>No Blogs Yet</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <NotFound />
            )
        )}

        {showFollowersList && <Followers closeFollowersList={closeFollowersList} followers={userFollowers} />}
        {showFollowingList && <Following closeFollowingList={closeFollowingList} following={userFollowing} />}

      <Footer/>
    </>
}


export default UserDetails