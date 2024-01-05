import TimeAgo from "javascript-time-ago";
import React, { useEffect, useState } from "react";
import en from 'javascript-time-ago/locale/en'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubComment, getSubCommentLikeStatus, likeSubComment, unlikeSubComment } from "../../../actions/blogAction";
import SmallLoader from "../../layout/SmallLoader/SmallLoader";


const SubComments = ({ subComment, slug, commentId, handleReply }) => {
    const dispatch = useDispatch()
    const { user: loggedUser } = useSelector((state) => state.user)
    const { subCommentLikeStatus } = useSelector((state) => state.commentLikeStatus)
    const { loading } = useSelector((state) => state.deleteComment)
    const { commentLikedSuccess } = useSelector((state) => state.likeComment)
    const { commentUnlikedSuccess } = useSelector((state) => state.unlikeComment)
    const [showDelete, setShowDelete] = useState(false)
    const [showMore,setShowMore] = useState(false)

    TimeAgo.addLocale(en)
    const createdTime = subComment ? new Date(subComment.createdAt) : new Date();

    const isSubCommentLiked = subCommentLikeStatus[subComment._id]

    useEffect(() => {
        dispatch(getSubCommentLikeStatus(slug, commentId, subComment._id))
    }, [dispatch, slug, subComment._id, commentId])

    function toggleMouseOver() {
        setShowDelete(!showDelete)
    }

    function handleLikeSubComment() {
        dispatch(likeSubComment(slug, commentId, subComment._id))
    }

    function handleUnlikeSubComment() {
        dispatch(unlikeSubComment(slug, commentId, subComment._id))
    }

    function handleDelete() {
        dispatch(deleteSubComment(slug, commentId, subComment._id))
    }


    useEffect(() => {
        if (commentLikedSuccess || commentUnlikedSuccess) {
            dispatch(getSubCommentLikeStatus(slug, commentId, subComment._id))
        }
    },[     dispatch,
            slug,
            commentId,
            subComment._id,
            commentLikedSuccess,
            commentUnlikedSuccess
     ])

     const truncatedText = subComment.text.length > 150 ? subComment.text.slice(0, 150) : subComment.text;


    return (
        <div className="comment-section" onMouseEnter={toggleMouseOver} onMouseLeave={toggleMouseOver}>
            <div className="commentSection-user" >
                <div className="homeCard-user-img">
                    <Link to={loggedUser._id === subComment.userId._id ? `/profile` : `/${subComment.userId.username}`}><img src={subComment.userId.avatar.url} alt="" /></Link>
                </div>
                <div className="commentSection-content">
                    <div className="comment">
                        <div className="comment-user">
                            <Link to={loggedUser._id === subComment.userId._id ? `/profile` : `/${subComment.userId.username}`}><h2>{subComment.userId.username}</h2></Link>
                            <p>{new TimeAgo('en-US').format(createdTime)}</p>
                        </div>
                        <p>{showMore ? subComment.text : truncatedText}
                          {subComment.text.length > 150 && <span onClick={()=> setShowMore(!showMore)}>{showMore ? '...Show Less' : '...Show More'}</span>}</p>
                    </div>
                    <div className="commentSection-bottom">
                        <div className="commentSection-like">
                            {isSubCommentLiked ? (
                                <i onClick={handleUnlikeSubComment} style={{ color: "#2E8A99" }} className="bi bi-heart-fill"></i>
                            ) : (
                                <i onClick={handleLikeSubComment} className="bi bi-heart"></i>
                            )}
                            {subComment.likes.length > 0 && <p>{subComment.likes.length}</p>}
                        </div>
                        <p onClick={() => handleReply(subComment.userId.username, commentId)}>Reply</p>
                        {loading ? (
                            showDelete &&
                            <SmallLoader />
                        ) : (
                            loggedUser._id === subComment.userId._id && showDelete &&
                            <i onClick={handleDelete} className="bi bi-trash"></i>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubComments