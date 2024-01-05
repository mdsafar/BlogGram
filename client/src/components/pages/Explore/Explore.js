import React, { useEffect } from "react";
import ExploreBlogCard from "./ExploreBlogCard";
import { useDispatch, useSelector } from "react-redux"
import { getAllBlogs } from "../../../actions/blogAction";
import "./Explore.css"
import Loader from "../../layout/Loader/Loader";
import Header from '../../layout/Header/Header'
import Footer from "../../layout/Footer/Footer";


const Explore = () => {
    const dispatch = useDispatch();
    const { blogs, loading } = useSelector((state) => state.allBlogs)


    useEffect(() => {
        dispatch(getAllBlogs())
    }, [dispatch])

    return <>
     <Header/>
    {loading ? (
            <Loader />
        ) : (
            <section>
                <div className="exploreCard-section">
                    { blogs &&
                        blogs?.map((blog) => {
                            return <ExploreBlogCard blog={blog} key={blog._id} />
                        })}
                </div>
            </section>
        )}
        <Footer/>
    </>
}

export default Explore