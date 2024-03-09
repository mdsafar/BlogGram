import React, { useEffect } from "react";
import './Home.css'
import { useDispatch, useSelector } from "react-redux"
import HomeBlogCard from "./HomeBlogCard";
import { getFollowingUserBlogs } from "../../../actions/blogAction";
import Loader from "../../layout/Loader/Loader";
import Header from '../../layout/Header/Header'
import Footer from "../../layout/Footer/Footer";



const Home = () => {
    const dispatch = useDispatch()
    const { blogs, loading } = useSelector((state) => state.followingUserBlogs)


    useEffect(() => {
        dispatch(getFollowingUserBlogs())
    }, [dispatch])


    return <>
      <Header/>
        {loading ? (
            <Loader />
        ) : (
            <section>
                {blogs &&
                  blogs.length !== 0 ? (
                    [...blogs].reverse().map((blog) => {
                        return <HomeBlogCard blog={blog}  key={blog._id} />
                    })
                  ):(
                  <div className="no-Homeblogs">
                    <h1>Welcome, Explore to Know More :)</h1>
                  </div>
                  )
                }
            </section>
        )}
        <Footer/>
    </>
}

export default Home;