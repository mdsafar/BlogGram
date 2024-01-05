import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../../actions/blogAction';
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en';
import { getAllUsers } from '../../../actions/userAction';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.allUsers);
    const navigate = useNavigate();
    const { blogs } = useSelector((state) => state.allBlogs);
    const [selectedCategory, setSelectedCategory] = useState('users');


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllBlogs());
    }, [dispatch]);


    return (
        <div className='dashboard'>
            <div className='dashboard-header'>
                <div className='dashboard-heading'>
                    <i onClick={() => navigate('/profile')} className="bi bi-arrow-left-short"></i>
                    <h1>Dashboard</h1>
                </div>
                <select onChange={(e) => setSelectedCategory(e.target.value)} className='round'>
                    <option value='users'>Users</option>
                    <option value='blogs'>Blogs</option>
                </select>
            </div>
            <div className='dashboard-content'>
                {selectedCategory === 'users' && (
                    <div className="searchBar-results">
                        {users?.map((user) => {
                            return (
                                <Link to={`/${user.username}`} className="dashboard-user" key={user._id}>
                                    <div className="dashboard-user-img">
                                        <img src={user.avatar.url} alt="" />
                                    </div>
                                    <div className="dashboard-user-name">
                                        <h1>{user.username}</h1>
                                        <p>{user.fullname}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
                {selectedCategory === 'blogs' && (
                    <div className="exploreCard-section">
                        {blogs?.map((blog) => {
                            TimeAgo.addLocale(en)
                            const createdTime = blog ? new Date(blog.createdAt) : new Date();
                            return (<Link key={blog._id} to={`/b/${blog.slug}`} className="exploreCard-container" >
                                <div className="exploreCard-content">
                                    <h1>{blog.title}</h1>
                                    <p>
                                        {
                                            blog.content.length > 400
                                                ? `${blog.content.slice(0, 400)}`
                                                : blog.content
                                        }
                                        {blog.content.length > 400 && (
                                            <span >...SeeMore</span>
                                        )}
                                    </p>
                                    <div>
                                        <p>{blog.likes.length} Likes</p>
                                        <p>{new TimeAgo('en-US').format(createdTime)}</p>
                                    </div>
                                </div>
                                <p className='blog-author'>By <span>{blog.userId.username}</span></p>
                            </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
