import React, { useEffect, useState } from "react";
import "./BlogDetails.css"
import Header from '../../layout/Header/Header'
import { useDispatch, useSelector } from "react-redux";
import { addComment, addSubComment, getBlogDetails, getBlogLikeStatus, likeBlog, unlikeBlog } from "../../../actions/blogAction";
import { Link, useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import Loader from "../../layout/Loader/Loader";
import SmallLoader from "../../layout/SmallLoader/SmallLoader"
import { ADD_COMMENT_RESET } from "../../../constants/blogConstants";
import { followUser, getFollowingStatus } from "../../../actions/userAction";
import EmojiPicker from 'emoji-picker-react';


const BlogDetails = () => {
    const dispatch = useDispatch()
    const { blog, loading } = useSelector((state) => state.blogDetails);
    const { user: loggedUser } = useSelector((state) => state.user)
    const { blogLikeStatus } = useSelector((state) => state.blogLikeStatus)
    const { loading: commentloading, success: addCommentSuccess } = useSelector((state) => state.addComment)
    const { success: followSuccess } = useSelector((state) => state.followUser)
    const { followingStatus } = useSelector((state) => state.followingStatus)
    const { slug } = useParams();
    const [show, setShow] = useState(false)
    const [loadingAction, setLoadingAction] = useState(true)
    const [reply, setReply] = useState(false)
    const [comment, setComment] = useState('')
    const [replyText, setReplyText] = useState('')
    const [commentId, setCommentId] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [isBlogLiked,setIsBlogLiked] = useState(false)
    const [totalLikes,setTotalLikes] = useState(0)


    TimeAgo.addLocale(en)
    const createdTime = blog ? new Date(blog.createdAt) : new Date();

    const name = blog?.userId?.username
    const isFollowing = followingStatus[name]


    useEffect(() => {
        dispatch(getBlogDetails(slug))
        dispatch(getBlogLikeStatus(slug))
        name && dispatch(getFollowingStatus(name))
        setTotalLikes(blog?.likes.length)
        setIsBlogLiked(blogLikeStatus[blog?.slug])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, slug, name,blog?.slug])



    function handleLikeBlog() {
        dispatch(likeBlog(blog?.slug))
        setIsBlogLiked(true)
        setTotalLikes(prev => prev + 1)
    }

    function handleUnlikeBlog() {
        dispatch(unlikeBlog(blog?.slug))
        setIsBlogLiked(false)
        setTotalLikes(prev => prev - 1)
    }

    function selectEmoji(item) {
        if (reply) {
            setReplyText((prev) => prev + item.emoji)
        } else {
            setComment((prev) => prev + item.emoji)
        }

    }

    const handleComment = () => {
        if (comment !== '') {
            dispatch(addComment(slug, comment))
            setComment('')
            setShowEmoji(false)
        }
    }

    function handleReply(username, commentId) {
        setReply(true)
        setComment('')
        setReplyText(`@${username} `)
        setCommentId(commentId)
    }


    const handleSubComment = () => {
        if (replyText !== '') {
            dispatch(addSubComment(slug, commentId, replyText))
            setReply(false)
            setShowEmoji(false)
        }
    }

    function handleFollowUser() {
        dispatch(followUser(blog?.userId._id))
    }


    function handleLoadingAction() {
        setLoadingAction(false)
    }


    useEffect(() => {
        if (followSuccess) {
            setLoadingAction(false)
            dispatch(getBlogDetails(slug))
            name && dispatch(getFollowingStatus(name))
        }

        if (addCommentSuccess) {
            setLoadingAction(false)
            dispatch(getBlogDetails(slug))
            dispatch({ type: ADD_COMMENT_RESET })
        }

    }, [dispatch,
        slug,
        addCommentSuccess,
        name, followSuccess])



    const controlNavbar = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
            setShowEmoji(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [])


    return <>
        <Header />
        {loadingAction && loading ? (
            <Loader />
        ) : (
            <section className="blogDetails">
                <div className="blogDetails-container">
                    <div className="blogDetails-user">
                        <div className="homeCard-user-img">
                            <Link to={loggedUser?._id === blog?.userId._id ? `/profile` : `/${blog?.userId.username}`}><img src={blog?.userId.avatar.url} alt="" /></Link>
                        </div>
                        <div>
                            <div>
                                <Link to={loggedUser?._id === blog?.userId._id ? `/profile` : `/${blog?.userId.username}`}><h2>{blog?.userId.username}</h2></Link>
                                <p>{new TimeAgo('en-US').format(createdTime)}</p>
                            </div>
                            {loggedUser?._id !== blog?.userId._id ?
                                !isFollowing && <p onClick={handleFollowUser}>Follow</p> : ''
                            }
                        </div>
                    </div>
                    <div className="blogDetails-content">
                        <h1>{blog?.title}</h1>
                        <p>{blog?.content}</p>
                    </div>
                    <div className="blogDetails-bottom">
                        <div className="blogDetails-like">
                            {isBlogLiked ? (
                                <i onClick={handleUnlikeBlog} style={{ color: "#2E8A99" }} className="bi bi-heart-fill"></i>
                            ) : (
                                <i onClick={handleLikeBlog} className="bi bi-heart"></i>
                            )}
                            <p>{totalLikes} Likes</p>
                        </div>
                        <div className="blogDetails-comment">
                            <i className="bi bi-chat-text"></i>
                            <p>{blog?.comments.length} Comments</p>
                        </div>
                    </div>
                    <div className="commentSection-container">
                        <h1>Comments</h1>
                        {blog?.comments.length !== 0 ? (
                            blog?.comments.sort((a, b) => {
                                if (a.userId._id === loggedUser._id) return -1;
                                if (b.userId._id === loggedUser._id) return 1;
                                return 0
                            }).map((comment) => {
                                return <CommentSection
                                    key={comment._id}
                                    comment={comment}
                                    slug={slug}
                                    handleReply={handleReply}
                                    handleLoadingAction={handleLoadingAction}
                                />
                            })
                        ) : (
                            <div className="no-comments">
                                <h1>No Comments</h1>
                            </div>

                        )}
                    </div>
                    <div className={`comment-input-container ${show && 'show'}`}>
                        {showEmoji && show &&
                            <div className="emoji-picker">
                                <EmojiPicker height={'360px'} width={"340px"} onEmojiClick={selectEmoji} />
                            </div>
                        }
                        <i onClick={() => setShowEmoji(!showEmoji)} className="bi bi-emoji-laughing"></i>
                        {commentloading ? (
                            <div className="comment-loader">
                                <SmallLoader />
                            </div>
                        ) : (
                            !reply ? (
                                <input
                                    className="comment-input"
                                    type="text"
                                    placeholder="Add a Comment..."
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                                />
                            ) : (
                                <>
                                    <input
                                        className="comment-input"
                                        type="text"
                                        placeholder="Reply..."
                                        onChange={(e) => setReplyText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubComment()}
                                        value={replyText}
                                    />
                                    <i onClick={() => setReply(false)} id="reply-close" className="bi bi-x-lg"></i>
                                </>
                            )
                        )}
                        <button onClick={reply ? handleSubComment : handleComment}>{reply ? `Reply` : `Comment`}</button>
                    </div>

                </div>
            </section>
        )}
    </>
}

export default BlogDetails;