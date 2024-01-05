import React, { useEffect, useState } from "react";
import './Profile.css'
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, logOut } from "../../../actions/userAction";
import Loader from "../../layout/Loader/Loader"
import BlogCard from "../Blog/BlogCard";
import { Link } from "react-router-dom";
import Following from "./Following";
import Followers from "./Followers";
import Header from '../../layout/Header/Header'
import Footer from "../../layout/Footer/Footer";



const Profile = () => {
    const dispatch = useDispatch()
    const { user, blogs, loading } = useSelector((state) => state.profile)
    const [showFollowersList, setShowFollowersList] = useState(false)
    const [showFollowingList, setShowFollowingList] = useState(false)
    const [loadingAction, setLoadingAction] = useState(true)


    const userFollowers = user?.followers
    const userFollowing = user?.following

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])

    function handleLoadingAction() {
        setLoadingAction(false)
    }

    function closeFollowersList() {
        setShowFollowersList(false)
    }

    function closeFollowingList() {
        setShowFollowingList(false)
    }

    function handleLogOut() {
        dispatch(logOut())
    }

    return <>
        <Header />
        {loading && loadingAction ? (
            <Loader />
        ) : (
            <section className="profile">
                <div className="profile-container">
                    <div className="profile-top">
                        <div className="profile-user-img">
                            <img src={user?.avatar.url} alt="" />
                        </div>
                        <div className="details-container">
                            <div className="details-name">
                                <h1>{user?.username}</h1>
                                <div>
                                    <Link to={'/profile/edit'}><button>Edit Profile</button></Link>
                                    <button onClick={handleLogOut}>LogOut</button>
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
                    {user?.role === 'admin' &&
                        <div className='dash-nav-div'>
                            <Link to="/dashboard" className="dash-nav">
                                <i className="bi bi-speedometer"></i>
                                <p>Dashboard</p>
                            </Link>
                        </div>
                    }
                    <div className="user-blogs">
                        <h3>Blogs</h3>
                        <div className="blogCard-container">
                            {blogs &&
                                blogs.length !== 0 ? (
                                [...blogs].reverse().map((blog) => {
                                    return <BlogCard blog={blog} key={blog._id} handleLoadingAction={handleLoadingAction} />
                                })
                            ) : (
                                <div className="no-blogs">
                                    <h1>No Blogs Yet</h1>
                                    <Link to={'/create-blog'}><button>Create Blog</button></Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )}
        {showFollowersList && <Followers closeFollowersList={closeFollowersList} followers={userFollowers} />}
        {showFollowingList && <Following closeFollowingList={closeFollowingList} following={userFollowing} />}

        <Footer />
    </>
}

export default Profile;