import React, { useEffect, useRef } from "react"
import FollowersUserList from "./FollowersUserList";
import { useSelector } from "react-redux";



const Following = ({ closeFollowingList, following }) => {
    const elementRef = useRef()
    const {user:loggedUser} = useSelector((state)=> state.user)

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (elementRef.current && !elementRef.current.contains(e.target)) {
                closeFollowingList();
            }
        }

        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeFollowingList]);


    return (
        <div className="overlay" >
            <div className="followers-list" ref={elementRef}>
                <div className="followers-list-container">
                    <div className="followers-list-head">
                        <h1>Following</h1>
                        <i onClick={closeFollowingList} className="bi bi-x-lg"></i>
                    </div>
                    <div className="followers-list-results">
                        {following?.sort((a, b) => {
                            if (a._id === loggedUser._id) return -1;
                            if (b._id === loggedUser._id) return 1;
                            return 0;
                        }).map((user) => {
                            return <FollowersUserList user={user} key={user._id} closeFollowingList={closeFollowingList} />
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Following;