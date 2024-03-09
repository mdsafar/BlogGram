import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, getFollowingStatus, unfollowUser } from "../../../actions/userAction";
import { FOLLOW_USER_RESET } from "../../../constants/userConstants";




const FollowersUserList = ({ user, closeFollowersList, closeFollowingList }) => {
    const dispatch = useDispatch()
    const { followingStatus } = useSelector((state) => state.followingStatus)
    const { user: loggedUser } = useSelector((state) => state.user)
    const { success } = useSelector((state) => state.followUser)

    const name = user?.username
    const isFollowing = followingStatus[name]

    useEffect(() => {
        dispatch(getFollowingStatus(name))
    }, [dispatch, name])

    function handleFollow(e) {
        e.preventDefault()
        e.stopPropagation();
        dispatch(followUser(user._id))
    }

    function handleUnfollow(e) {
        e.preventDefault()
        e.stopPropagation();
        dispatch(unfollowUser(user._id))
    }

    useEffect(() => {

        if (success) {
            dispatch(getFollowingStatus(name))
        }

        dispatch({ type: FOLLOW_USER_RESET })

    }, [success, dispatch, name])


    const isLoggedUserIn = user._id === loggedUser._id

    return <>
        <Link to={isLoggedUserIn ? `/profile` : `/${user.username}`}
            className="followers" key={user._id}
            onClick={closeFollowersList || closeFollowingList}>
            <div className="followers-img">
                <img src={user.avatar.url} alt="" />
            </div>
            <div className="followers-details">
                <div className="followers-name">
                    <h1>{user.username}</h1>
                    <p>{user.fullname}</p>
                </div>
                {isLoggedUserIn ?
                    ''
                    :
                    isFollowing ? (
                        <button onClick={handleUnfollow}>Following</button>
                    ) : (
                        <button onClick={handleFollow} id="follow-btn" >Follow</button>
                    )

                }
            </div>

        </Link>
    </>

}

export default FollowersUserList;