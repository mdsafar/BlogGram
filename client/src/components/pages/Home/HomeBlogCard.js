import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getBlogLikeStatus, likeBlog, unlikeBlog } from "../../../actions/blogAction";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'



const HomeBlogCard = ({ blog }) => {

    const dispatch = useDispatch()
    const { blogLikeStatus } = useSelector((state) => state.blogLikeStatus)
    const { user: loggedUser } = useSelector((state) => state.user)
    const [totalLikes, setTotalLikes] = useState(0)
    const [isBlogLiked, setIsBlogLiked] = useState(false)

    TimeAgo.addLocale(en)
    const createdTime = new Date(blog.createdAt);
    const slug = blog?.slug


    useEffect(() => {
        dispatch(getBlogLikeStatus(slug))
        setTotalLikes(blog?.likes.length)
        setIsBlogLiked(blogLikeStatus[slug])

        // eslint-disable-next-line
    }, [dispatch, slug, blogLikeStatus[slug]])


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

    return <>
        <div className="homeCard-container">
            <div className="homeCard-user">
                <div className="homeCard-user-img">
                    <Link to={loggedUser?._id === blog.userId._id ? `/profile` : `/${blog.userId.username}`}><img src={blog.userId.avatar.url} alt="" /></Link>
                </div>
                <div>
                    <Link to={loggedUser?._id === blog.userId._id ? `/profile` : `/${blog.userId.username}`}><h2>{blog.userId.username}</h2></Link>
                    <p>{new TimeAgo('en-US').format(createdTime)}</p>
                </div>
            </div>
            <div className="homeCard-content">
                <h1>{blog.title}</h1>
                <p>
                    {
                        blog.content.length > 2000
                            ? `${blog.content.slice(0, 2000)}`
                            : blog.content
                    }
                    {blog.content.length > 2000 && (
                        <Link to={`/b/${blog.slug}`}>...SeeMore</Link>
                    )}
                </p>
            </div>
            <div className="homeCard-bottom">
                <div className="homeCard-like">
                    {isBlogLiked ? (
                        <i onClick={handleUnlikeBlog} style={{ color: "#2E8A99" }} className="bi bi-heart-fill"></i>
                    ) : (
                        <i onClick={handleLikeBlog} className="bi bi-heart"></i>
                    )}
                    <p>{totalLikes} Likes</p>
                </div>
                <Link to={`/b/${blog.slug}`} className="homeCard-comment">
                    <i className="bi bi-chat-text"></i>
                    <p>{blog.comments.length} Comments</p>
                </Link>
            </div>
        </div>
    </>
}

export default HomeBlogCard