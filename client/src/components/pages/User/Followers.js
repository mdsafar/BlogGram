import React, { useEffect, useRef } from "react"
import './Followers.css'
import FollowersUserList from "./FollowersUserList"
import { useSelector } from "react-redux"




const Followers = ({ closeFollowersList, followers }) => {
    const elementRef = useRef()
    const { user: loggedUser } = useSelector((state) => state.user)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (elementRef.current && !elementRef.current.contains(e.target)) {
                closeFollowersList();
            }
        }

        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeFollowersList]);


    return (
        <div className="overlay" >
            <div className="followers-list" ref={elementRef}>
                <div className="followers-list-container" >
                    <div className="followers-list-head">
                        <h1>Followers</h1>
                        <i onClick={closeFollowersList} className="bi bi-x-lg"></i>
                    </div>
                    <div className="followers-list-results">
                        {followers?.sort((a, b) => {
                            if (a._id === loggedUser._id) return -1;
                            if (b._id === loggedUser._id) return 1;
                            return 0;
                        }).map((user) => {
                            return <FollowersUserList user={user} key={user._id} closeFollowersList={closeFollowersList} />
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Followers;