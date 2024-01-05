import React, { useEffect, useState } from "react";
import './CreateBlog.css'
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../../../actions/blogAction";
import SmallLoader from "../../layout/SmallLoader/SmallLoader"
import { CREATE_BLOG_RESET } from "../../../constants/blogConstants";
import Header from "../../layout/Header/Header";



const CreateBlog = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { success, loading } = useSelector((state) => state.newBlog)


    function handleSubmit(e) {
        e.preventDefault()
        if (title !== '' && content !== '') {
            dispatch(createBlog(title, content))
        }
    }

    useEffect(() => {
        if (success) {
            setTitle('')
            setContent('')
        }
        dispatch({ type: CREATE_BLOG_RESET })
    }, [success, dispatch])


    return <>
        <Header />
        <section>
            <div className="create-blog">
                <div className="blog-form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <textarea rows="24" placeholder="Content" onChange={(e) => setContent(e.target.value)} value={content} />
                        <button type="submit" >{loading ? <div className="follow-loader" ><SmallLoader /></div> : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </section>
    </>
}

export default CreateBlog