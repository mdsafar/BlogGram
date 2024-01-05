import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../../../actions/blogAction";
import { getUserProfile } from "../../../actions/userAction";
import SmallLoader from "../../layout/SmallLoader/SmallLoader";
import { UPDATE_BLOG_RESET } from "../../../constants/blogConstants";



const UpdateBlog = ({ blog, handleCloseUpdate }) => {

    const dispatch = useDispatch()
    const { isUpdated, updateLoading } = useSelector((state) => state.blog)
    const [title, setTitle] = useState(blog?.title)
    const [content, setContent] = useState(blog?.content)


    const handleUpdate = (e) => {
        e.preventDefault();
        if (title !== '' && content !== '') {
            dispatch(updateBlog(blog._id, title, content)).then(() => {
                handleCloseUpdate()
            })
        }
    }

    useEffect(() => {
        if (isUpdated) {
            dispatch(getUserProfile())
        }
        dispatch({ type: UPDATE_BLOG_RESET })
    }, [dispatch, isUpdated])




    return <div className="updateBlog-container">
        <h1 className="cancel" onClick={handleCloseUpdate} >Cancel</h1>
        <div className="updateBlog">
            <div className="blog-form">
                <form onSubmit={handleUpdate}>
                    <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                    <textarea rows="15" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content} />
                    <button id="update-btn" type="submit" >{updateLoading ? <div className="follow-loader" ><SmallLoader /></div> : 'Update'}</button>
                </form>
            </div>
        </div>
    </div>
    
}

export default UpdateBlog