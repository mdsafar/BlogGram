import React, { useState } from "react"
import './Header.css'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"


const Header = () => {
   const [searchBarOpen, setSearchBarOpen] = useState(false)
   const { user: loggedUser } = useSelector((state) => state.user)
   const { user } = useSelector((state) => state.profile)
   const navigate = useNavigate()


   function toggleSearchBar() {
      setSearchBarOpen(!searchBarOpen)
   }

   function closeSearchBar() {
      setSearchBarOpen(false)
   }


   return <>
      <div className="header">
         <div className="logo" onClick={()=> navigate('/')}>
            <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502 502" >
               <g>
                  <g>
                     <path fill="#2E8A99" d="M63.556,449.996c0,23.199,18.806,42.004,42.004,42.004h180.094 c84.249,0,152.791-68.542,152.791-152.791c0-55.096-29.317-103.47-73.166-130.354c12.422-19.943,19.611-43.467,19.611-68.642 C384.889,68.413,326.476,10,254.675,10H105.56c-23.198,0-42.004,18.806-42.004,42.004 C63.556,52.004,63.556,449.996,63.556,449.996z M147.564,94.009h107.111c25.477,0,46.205,20.727,46.205,46.205 s-20.727,46.205-46.205,46.205H147.564V94.009z M285.654,407.991h-138.09V270.427h107.111h30.978 c37.927,0,68.782,30.855,68.782,68.782S323.581,407.991,285.654,407.991z"></path>
                     <path d="M285.653,502H105.56c-28.675,0-52.004-23.329-52.004-52.004V52.004C53.556,23.329,76.885,0,105.56,0h149.116 c77.313,0,140.213,62.899,140.213,140.214c0,22.904-5.591,45.338-16.243,65.449c19.747,13.797,36.34,31.897,48.335,52.815 c14.042,24.489,21.464,52.405,21.464,80.73C448.444,428.973,375.417,502,285.653,502z M105.56,20 c-17.647,0-32.004,14.356-32.004,32.004v397.992c0,17.647,14.356,32.004,32.004,32.004h180.094 c78.735,0,142.791-64.056,142.791-142.791c0-50.029-25.567-95.572-68.393-121.828c-2.271-1.393-3.894-3.635-4.506-6.228 s-0.164-5.323,1.244-7.585c11.84-19.008,18.099-40.916,18.099-63.354C374.889,73.928,320.961,20,254.676,20H105.56z M285.653,417.991H147.564c-5.522,0-10-4.478-10-10V270.427c0-5.522,4.478-10,10-10h138.089c43.44,0,78.782,35.342,78.782,78.782 S329.094,417.991,285.653,417.991z M157.564,397.991h128.089c32.412,0,58.782-26.369,58.782-58.782s-26.37-58.782-58.782-58.782 H157.564V397.991z M254.676,196.418H147.564c-5.522,0-10-4.478-10-10V94.009c0-5.522,4.478-10,10-10h107.111 c30.991,0,56.204,25.214,56.204,56.205S285.667,196.418,254.676,196.418z M157.564,176.418h97.111 c19.963,0,36.204-16.241,36.204-36.204c0-19.964-16.241-36.205-36.204-36.205h-97.111V176.418z"></path>
                  </g>
                  <g>
                     <path d="M97,403c-5.522,0-10-4.478-10-10V115c0-5.522,4.478-10,10-10s10,4.478,10,10v278C107,398.522,102.522,403,97,403z"></path>
                  </g>
                  <g>
                     <path d="M97,84c-5.522,0-10-4.478-10-10V52c0-5.522,4.478-10,10-10s10,4.478,10,10v22C107,79.522,102.522,84,97,84z"></path>
                  </g>
               </g>
            </svg>
         </div>
         <div className="navbar">
            <NavLink to="/" className="nav-item">
               <i className="bi bi-house-door"></i>
               <p>Home</p>
            </NavLink>
            <NavLink to="/explore" className="nav-item" >
               <i className="bi bi-collection"></i>
               <p>Explore</p>
            </NavLink>
            <NavLink to="/direct/inbox" className="nav-item" >
               <i className="bi bi-chat"></i>
               <p>Message</p>
            </NavLink>
            <NavLink to="/create-blog" className="nav-item ">
               <i className="bi bi-plus-square"></i>
               <p>Create</p>
            </NavLink>
            <Link className="nav-item" >
               <i onClick={toggleSearchBar} className="bi bi-search"></i>
               <p onClick={toggleSearchBar}>Search</p>
            </Link>
            <NavLink to="/profile" className="nav-img" >
               <img src={user?._id === loggedUser?._id ? user?.avatar.url : loggedUser?.avatar.url} alt="" />
            </NavLink>
         </div>
      </div>
      <SearchBar searchBarOpen={searchBarOpen} closeSearchBar={closeSearchBar} />
   </>
}


export default Header;