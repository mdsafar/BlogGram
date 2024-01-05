import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getBlogLikeStatus, getFollowingUserBlogs, likeBlog, unlikeBlog } from "../../../actions/blogAction";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import { LIKE_BLOG_RESET } from "../../../constants/blogConstants";


const HomeBlogCard = ({ blog,handleLoadingAction }) => {

    const dispatch = useDispatch()
    const { blogLikeStatus } = useSelector((state) => state.blogLikeStatus)
    const {user:loggedUser} = useSelector((state)=> state.user)
    const { blogLikedSuccess, blogUnlikedSuccess } = useSelector((state) => state.likeBlog)
    TimeAgo.addLocale(en)
    const createdTime = new Date(blog.createdAt);

    const isBlogLiked = blogLikeStatus[blog.slug]

    useEffect(() => {
        dispatch(getBlogLikeStatus(blog.slug))
    }, [dispatch, blog.slug])

    function handleLikeBlog() {
        dispatch(likeBlog(blog.slug))
    }

    function handleUnlikeBlog() {
        dispatch(unlikeBlog(blog.slug))
    }

    useEffect(() => {
       if(blogLikedSuccess || blogUnlikedSuccess){
          handleLoadingAction()
          dispatch(getFollowingUserBlogs())
          dispatch(getBlogLikeStatus(blog.slug)) 
       }
       return(()=>{
          dispatch({type:LIKE_BLOG_RESET})
       })
    },[dispatch,blog.slug,handleLoadingAction,blogLikedSuccess,blogUnlikedSuccess])


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
                    <p>{blog.likes.length} Likes</p>
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