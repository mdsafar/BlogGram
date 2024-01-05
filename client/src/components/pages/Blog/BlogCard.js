import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import en from 'javascript-time-ago/locale/en'
import TimeAgo from "javascript-time-ago";
import './BlogCard.css'
import { useDispatch, useSelector } from "react-redux"
import {deleteBlog} from "../../../actions/blogAction"
import { getUserProfile } from "../../../actions/userAction";
import SmallLoader from "../../layout/SmallLoader/SmallLoader"
import { DELETE_BLOG_RESET } from "../../../constants/blogConstants";
import UpdateBlog from "./UpdateBlog";



const BlogCard = ({ blog,handleLoadingAction }) => {
    const dispatch = useDispatch()
    const { deleteLoading,isDeleted } = useSelector((state)=> state.blog)
    const { user: loggedUser } = useSelector((state) => state.user)
    const [showOption, setShowOption] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const cardRef = useRef(null);

    TimeAgo.addLocale(en);
    const createdTime = blog ? new Date(blog.createdAt) : new Date();
  
    const handleOptionsClick = (e) => {
      e.preventDefault();
      setShowOption(!showOption);
    };
  
    const handleDelete = (e) => {
      e.preventDefault();
      dispatch(deleteBlog(blog._id));
      setIsUpdateOpen(false); 
    };
  
    const handleShowUpdate = (e) => {
      e.preventDefault();
      setShowOption(false);
      setIsUpdateOpen(true); 
    };
  
    const handleCloseUpdate = () => {
      setIsUpdateOpen(false);
    };
  
    useEffect(() => {
      if (isDeleted) {
        handleLoadingAction();
        dispatch(getUserProfile());
        dispatch({ type: DELETE_BLOG_RESET });
      }

      if (isUpdateOpen && cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [dispatch, isDeleted, handleLoadingAction,isUpdateOpen]);


    return <>
        <Link to={`/b/${blog.slug}`} className="blogCard" >
            <div className="blogCard-content">
                <div>
                    <h1>{blog.title}</h1>
                    {blog.userId === loggedUser._id &&
                        <div className="blogCard-options" ref={cardRef} >
                            <i onClick={handleOptionsClick} className="bi bi-three-dots-vertical"></i>
                            <div className={showOption ? 'show' : ''}>
                                <i onClick={handleShowUpdate} className="bi bi-pencil-square"></i>
                               {deleteLoading ? <div className="delete-loader"><SmallLoader/></div> : <i onClick={handleDelete}  className="bi bi-trash3"></i>}
                            </div>
                        </div>
                    }
                </div>
                <p>
                    {
                        blog.content.length > 200
                            ? `${blog.content.slice(0, 200)}`
                            : blog.content
                    }
                    {blog.content.length > 200 && (
                        <span>...SeeMore</span>
                    )}
                </p>
                <div className="blogCard-likes">
                    <p>{blog.likes.length} Likes</p>
                    <p>{new TimeAgo('en-US').format(createdTime)}</p>
                </div>
            </div>
        </Link>
        {isUpdateOpen && <UpdateBlog blog={blog} handleCloseUpdate={handleCloseUpdate} /> }
   </>
}

export default BlogCard