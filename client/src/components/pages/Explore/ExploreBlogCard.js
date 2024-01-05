import TimeAgo from "javascript-time-ago";
import React from "react";
import { Link } from "react-router-dom";
import en from 'javascript-time-ago/locale/en'


const ExploreBlogCard = ({ blog }) => {

    TimeAgo.addLocale(en)
    const createdTime = blog ? new Date(blog.createdAt) : new Date();


    return <>
        <Link to={`/b/${blog.slug}`} className="exploreCard-container" >
            <div className="exploreCard-content">
                <h1>{blog.title}</h1>
                <p>
                    {
                        blog.content.length > 800
                            ? `${blog.content.slice(0, 800)}`
                            : blog.content
                    }
                    {blog.content.length > 800 && (
                        <span >...SeeMore</span>
                    )}
                </p>
                <div>
                    <p>{blog.likes.length} Likes</p>
                    <p>{new TimeAgo('en-US').format(createdTime)}</p>
                </div>
            </div>
        </Link>
    </>
}

export default ExploreBlogCard