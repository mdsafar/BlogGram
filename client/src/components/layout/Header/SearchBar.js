import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../../../actions/userAction";
import { SEARCH_USER_RESET } from "../../../constants/userConstants";
import SmallLoader from "../SmallLoader/SmallLoader"


const SearchBar = ({ searchBarOpen, closeSearchBar }) => {
    const dispatch = useDispatch()
    const { users, error, loading } = useSelector((state) => state.searchUser)
    const [keyword, setKeyword] = useState('')
    const elementRef = useRef()



    useEffect(() => {
        if (keyword.trim() !== '') {
            dispatch(searchUser(keyword))
        }

        if (!searchBarOpen) {
            setKeyword('')
        }

        dispatch({ type: SEARCH_USER_RESET })

    }, [dispatch, keyword, searchBarOpen])


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (elementRef.current && !elementRef.current.contains(e.target)) {
                closeSearchBar();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeSearchBar]);



    return (
        <div className={`SearchBar ${searchBarOpen && 'open'}`}>
            <div className="searchBar-container" ref={elementRef}>
                <div className="searchBar-input">
                    <input type="text" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                    {loading &&
                        <div className="search-loader">
                            <SmallLoader />
                        </div>
                    }
                </div>
                {error ? (
                    <div className="user-notFound"> <h1>{error}.</h1></div>
                ) : (
                    <div className="searchBar-results">
                        {keyword !== '' &&
                            users?.map((user) => {
                                return <Link to={`/${user.username}`} className="result-user" key={user._id} onClick={closeSearchBar}>
                                    <div className="result-user-img">
                                        <img src={user.avatar.url} alt="" />
                                    </div>
                                    <div className="result-user-name">
                                        <h1>{user.username}</h1>
                                        <p>{user.fullname}</p>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar