import {legacy_createStore as createStore,combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { allUsersReducer, followUserReducer, followingStatusReducer, forgotPasswordReducer, otpReducer, profileReducer, searchUserReducer, userReducer } from "./reducers/userReducer"
import { addCommentReducer, allBlogsReducer, blogDetailsReducer, blogLikeStatusReducer, blogReducer, commentLikeStatusReducer, deleteCommentReducer, followingUserBlogsReducer, likeBlogReducer, likeCommentReducer, newBlogReducer, unlikeCommentReducer } from "./reducers/blogReducer"
import { getMyInboxReducer, myChatsReducer } from "./reducers/chatReducer"



const reducer = combineReducers({
   user:userReducer,
   otp:otpReducer,
   forgotPassword:forgotPasswordReducer,
   searchUser:searchUserReducer,
   profile:profileReducer,
   allUsers:allUsersReducer,
   followUser:followUserReducer,
   followingStatus:followingStatusReducer,
   followingUserBlogs:followingUserBlogsReducer,
   newBlog:newBlogReducer,
   blog:blogReducer,
   allBlogs:allBlogsReducer,
   blogDetails:blogDetailsReducer,
   likeBlog:likeBlogReducer,
   blogLikeStatus:blogLikeStatusReducer,
   addComment:addCommentReducer,
   likeComment:likeCommentReducer,
   unlikeComment:unlikeCommentReducer,
   commentLikeStatus:commentLikeStatusReducer,
   deleteComment:deleteCommentReducer,
   myInbox:getMyInboxReducer,
   myChats:myChatsReducer,
})


const middleware = [thunk]


const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))

export default store;