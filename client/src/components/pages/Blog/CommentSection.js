import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
import "./CommentSection.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getBlogDetails, getCommentLikeStatus, likeComment, unlikeComment } from "../../../actions/blogAction";
import SubComments from "./SubComments";
import { DELETE_COMMENT_RESET } from "../../../constants/blogConstants";
import SmallLoader from "../../layout/SmallLoader/SmallLoader";


const CommentSection = ({ comment, handleReply, handleLoadingAction }) => {
    const dispatch = useDispatch()
    const { user: loggedUser } = useSelector((state) => state.user)
    const { commentLikeStatus } = useSelector((state) => state.commentLikeStatus)
    const { success: deleteCommentSuccess, loading } = useSelector((state) => state.deleteComment)
    const [showDelete, setShowDelete] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [showMore,setShowMore] = useState(false)
    const {slug} = useParams()
    const [isCommentLiked,setIsCommentLiked] = useState(false)
     const [totalLikes,setTotalLikes] = useState(0)

    TimeAgo.addLocale(en)
    const createdTime = comment ? new Date(comment.createdAt) : new Date();
    const commentId = comment?._id
  


    useEffect(() => {
          dispatch(getCommentLikeStatus(slug, commentId))  
          setIsCommentLiked(commentLikeStatus[commentId])
          setTotalLikes(comment.likes.length)

        // eslint-disable-next-line
    }, [dispatch, slug, commentId])


    function toggleMouseOver() {
        setShowDelete(!showDelete)
    }

    function handleShowReply() {
        setShowReplies(!showReplies)
    }

    function handleLikeComment() {
        dispatch(likeComment(slug, commentId))
        setIsCommentLiked(true)
        setTotalLikes(prev => prev + 1)
    }

    function handleUnlikeComment() {
        dispatch(unlikeComment(slug, commentId))
        setIsCommentLiked(false)
        setTotalLikes(prev => prev - 1)
    }

    function handleDelete() {
        dispatch(deleteComment(slug, commentId))
    }

    useEffect(() => {

        if (deleteCommentSuccess) {
            handleLoadingAction()
            dispatch(getBlogDetails(slug))
            dispatch({ type: DELETE_COMMENT_RESET })
        }

    },
        [dispatch,
            slug,
            commentId,
            handleLoadingAction,
            deleteCommentSuccess
        ])

        const truncatedText = comment.text.length > 150 ? comment.text.slice(0, 150) : comment.text;

    return (
        <div className="comment-section">
            <div className="commentSection-user" onMouseEnter={toggleMouseOver} onMouseLeave={toggleMouseOver}>
                <div className="homeCard-user-img">
                    <Link to={loggedUser._id === comment.userId._id ? `/profile` : `/${comment.userId.username}`}><img src={comment.userId.avatar.url} alt="" /></Link>
                </div>
                <div className="commentSection-content">
                    <div className="comment">
                        <div className="comment-user">
                            <Link to={loggedUser._id === comment.userId._id ? `/profile` : `/${comment.userId.username}`}><h2>{comment.userId.username}</h2></Link>
                            <p>{new TimeAgo('en-US').format(createdTime)}</p>
                        </div>
                        <p>{showMore ? comment.text : truncatedText}
                        {comment.text.length > 150 && 
                        <span onClick={()=> setShowMore(!showMore)}>{showMore ? '...ShowLess' : '...ShowMore'}</span>}
                        </p>
                    </div>
                    <div className="commentSection-bottom">
                        <div className="commentSection-like">
                            {isCommentLiked ? (
                                <i onClick={handleUnlikeComment} style={{ color: "#2E8A99" }} className="bi bi-heart-fill"></i>
                            ) : (
                                <i onClick={handleLikeComment} className="bi bi-heart"></i>
                            )}
                            {totalLikes > 0 && <p>{totalLikes}</p>}
                        </div>
                        <p onClick={() => handleReply(comment.userId.username, commentId)} >Reply</p>
                        {loading ? (
                            showDelete &&
                            <SmallLoader />
                        ) : (
                            loggedUser._id === comment.userId._id && showDelete && (
                                <i onClick={handleDelete} className="bi bi-trash"></i>
                            )
                        )
                        }
                    </div>
                </div>
            </div>
            {comment.subComments.length !== 0 &&
                <div className="subComments-container">
                    <p onClick={handleShowReply}>
                        {!showReplies ? `⎯ View replies (${comment.subComments.length})` : `⎯ Hide replies`}
                    </p>
                    {showReplies && comment.subComments.map((subComment) => {
                        return <SubComments
                            subComment={subComment}
                            slug={slug}
                            commentId={commentId}
                            key={subComment._id}
                            handleReply={handleReply}
                        />
                    })
                    }
                </div>
            }
        </div>
    )
}


export default CommentSection;