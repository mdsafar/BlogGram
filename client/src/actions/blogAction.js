import axios from "axios"
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_SUBCOMMENT_FAIL, ADD_SUBCOMMENT_REQUEST, ADD_SUBCOMMENT_SUCCESS, ALL_BLOGS_FAIL, ALL_BLOGS_REQUEST, ALL_BLOGS_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_LIKE_STATUS_FAIL, BLOG_LIKE_STATUS_REQUEST, BLOG_LIKE_STATUS_SUCCESS, COMMENT_LIKE_STATUS_FAIL, COMMENT_LIKE_STATUS_REQUEST, COMMENT_LIKE_STATUS_SUCCESS, CREATE_BLOG_FAIL, CREATE_BLOG_REQUEST, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_SUBCOMMENT_FAIL, DELETE_SUBCOMMENT_REQUEST, DELETE_SUBCOMMENT_SUCCESS, FOLLOWING_USER_BLOGS_REQUEST, FOLLOWING_USER_BLOGS_SUCCESS, LIKE_BLOG_FAIL, LIKE_BLOG_REQUEST, LIKE_BLOG_SUCCESS, LIKE_COMMENT_FAIL, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, LIKE_SUBCOMMENT_FAIL, LIKE_SUBCOMMENT_REQUEST, LIKE_SUBCOMMENT_SUCCESS, SUBCOMMENT_LIKE_STATUS_FAIL, SUBCOMMENT_LIKE_STATUS_REQUEST, SUBCOMMENT_LIKE_STATUS_SUCCESS, UNLIKE_BLOG_FAIL, UNLIKE_BLOG_REQUEST, UNLIKE_BLOG_SUCCESS, UNLIKE_COMMENT_FAIL, UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_SUCCESS, UNLIKE_SUBCOMMENT_FAIL, UNLIKE_SUBCOMMENT_REQUEST, UNLIKE_SUBCOMMENT_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_SUCCESS } from "../constants/blogConstants"



const Url = "http://localhost:4000"

export const getFollowingUserBlogs = () => async (dispatch) => {
    try {

        dispatch({ type: FOLLOWING_USER_BLOGS_REQUEST })

        await axios.get(`${Url}/api/v1/b/following/users`, { withCredentials: true }).then((response) => {
            dispatch({ type: FOLLOWING_USER_BLOGS_SUCCESS, payload: response.data })
        })

    } catch (err) {

        dispatch({ type: FOLLOWING_USER_BLOGS_SUCCESS, payload: err.response.data.message })

    }
}


export const createBlog = (title,content) => async(dispatch)=>{
    try {
        dispatch({type:CREATE_BLOG_REQUEST})

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true }


        await axios.post(`${Url}/api/v1/create`,{title,content},config).then((response)=>{
            dispatch({type:CREATE_BLOG_SUCCESS,payload:response.data.success})
        })

    } catch (err) {
        console.log(err)
         dispatch({type:CREATE_BLOG_FAIL,payload:err.response.data.message})
    }
}

export const updateBlog = (id,title,content) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_BLOG_REQUEST})


        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.put(`${Url}/api/v1/b/${id}`,{title,content},config).then((response)=>{
            dispatch({type:UPDATE_BLOG_SUCCESS,payload:response.data.success})
        })
        
    } catch (err) {
        dispatch({type:UPDATE_BLOG_FAIL,payload:err.response.data.message})
    }
}


export const deleteBlog = (id)=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_BLOG_REQUEST})

        await axios.delete(`${Url}/api/v1/b/${id}`,{withCredentials:true}).then((response)=>{
              dispatch({type:DELETE_BLOG_SUCCESS,payload:response.data.success})
        })
        
    } catch (err) {
        dispatch({type:DELETE_BLOG_FAIL,payload:err.response.data.message})
    }
}


export const getAllBlogs = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_BLOGS_REQUEST })

        await axios.get(`${Url}/api/v1/all/blogs`, { withCredentials: true }).then((response) => {
            dispatch({type: ALL_BLOGS_SUCCESS,payload:response.data })
        })

    } catch (err) {
        dispatch({ type: ALL_BLOGS_FAIL, payload: err.response.data.message })
    }
}

export const getBlogDetails = (slug) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAILS_REQUEST })

        await axios.get(`${Url}/api/v1/b/${slug}`, { withCredentials: true }).then((response) => {
            dispatch({ type: BLOG_DETAILS_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: BLOG_DETAILS_FAIL, payload: err.response.data.message })
    }
}


export const likeBlog = (slug) => async(dispatch)=>{
    try {

        dispatch({type:LIKE_BLOG_REQUEST})

        await axios.put(`${Url}/api/v1/b/${slug}/like`,{},{withCredentials:true}).then((response)=>{
            dispatch({type:LIKE_BLOG_SUCCESS,payload:response.data.success})
        })
        
    } catch (err) {

        dispatch({type:LIKE_BLOG_FAIL,payload:err.response.data.message})
    }
}

export const unlikeBlog = (slug) => async(dispatch)=>{
    try {

        dispatch({type:UNLIKE_BLOG_REQUEST})

        await axios.put(`${Url}/api/v1/b/${slug}/unlike`,{},{withCredentials:true}).then((response)=>{
            dispatch({type:UNLIKE_BLOG_SUCCESS,payload:response.data.success})
        })
        
    } catch (err) {
        dispatch({type:UNLIKE_BLOG_FAIL,payload:err.response.data.message})
    }
}



export const getBlogLikeStatus = (slug) => async (dispatch) => {
    try {

        dispatch({ type: BLOG_LIKE_STATUS_REQUEST })

        await axios.get(`${Url}/api/v1/b/${slug}/likeStatus`, { withCredentials: true }).then((response) => {
            dispatch({
                type: BLOG_LIKE_STATUS_SUCCESS,
                payload: {
                    slug,
                    isLiked: response.data.isLiked
                }
            })
        })

    } catch (err) {
        dispatch({ type: BLOG_LIKE_STATUS_FAIL, payload: err.response.data.message })
    }
}


export const addComment = (slug, text) => async (dispatch) => {
    try {

        dispatch({ type: ADD_COMMENT_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }, withCredentials: true,
        };

        await axios.post(`${Url}/api/v1/b/${slug}/comment`,{text},config).then((response) => {
            dispatch({ type: ADD_COMMENT_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: ADD_COMMENT_FAIL, payload: err.response.data.message })
    }
}

export const likeComment= (slug,commentId)=> async(dispatch)=>{
    try {

     dispatch({type:LIKE_COMMENT_REQUEST})


     await axios.put(`${Url}/api/v1/b/${slug}/comments/${commentId}/like`,{},{withCredentials:true}).then((response)=>{
        dispatch({type:LIKE_COMMENT_SUCCESS,payload:response.data.success})
     })

    } catch (err) {
        dispatch({type:LIKE_COMMENT_FAIL,payload:err.response.data.message})
    }
}

export const unlikeComment= (slug,commentId)=> async(dispatch)=>{
    try {

     dispatch({type:UNLIKE_COMMENT_REQUEST})


     await axios.put(`${Url}/api/v1/b/${slug}/comments/${commentId}/unlike`,{},{withCredentials:true}).then((response)=>{
        dispatch({type:UNLIKE_COMMENT_SUCCESS,payload:response.data.success})
     })

    } catch (err) {
        dispatch({type:UNLIKE_COMMENT_FAIL,payload:err.response.data.message})
    }
}


export const getCommentLikeStatus = (slug,commentId) => async(dispatch)=>{
    try {

        dispatch({type:COMMENT_LIKE_STATUS_REQUEST})


        await axios.get(`${Url}/api/v1/b/${slug}/comments/${commentId}`,{ withCredentials:true }).then((response)=>{
            dispatch({type:COMMENT_LIKE_STATUS_SUCCESS,payload:{
                commentId,
                isCommentLiked:response.data.isCommentLiked
            }})
        })
        
    } catch (err) {
        dispatch({type:COMMENT_LIKE_STATUS_FAIL,payload:err.response.data.message})
    }
}


export const addSubComment = (slug,commentId, text) => async (dispatch) => {
    try {

        dispatch({ type: ADD_SUBCOMMENT_REQUEST })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }, withCredentials: true,
        };

        await axios.post(`${Url}/api/v1/b/${slug}/comments/${commentId}/subcomment`,{text},config).then((response) => {
            dispatch({ type: ADD_SUBCOMMENT_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: ADD_SUBCOMMENT_FAIL, payload: err.response.data.message })
    }
}


export const likeSubComment= (slug,commentId,subCommentId)=> async(dispatch)=>{
    try {

     dispatch({type:LIKE_SUBCOMMENT_REQUEST})

     await axios.put(`${Url}/api/v1/b/${slug}/comments/${commentId}/subcomments/${subCommentId}/like`,{},{withCredentials:true}).then((response)=>{
        dispatch({type:LIKE_SUBCOMMENT_SUCCESS , payload:response.data.success })
     })

    } catch (err) {
        dispatch({type:LIKE_SUBCOMMENT_FAIL,payload:err.response.data.message})
    }
}


export const unlikeSubComment= (slug,commentId,subCommentId)=> async(dispatch)=>{
    try {

     dispatch({type:UNLIKE_SUBCOMMENT_REQUEST})

     await axios.put(`${Url}/api/v1/b/${slug}/comments/${commentId}/subcomments/${subCommentId}/unlike`,{},{withCredentials:true}).then((response)=>{
        dispatch({type:UNLIKE_SUBCOMMENT_SUCCESS,payload:response.data.success})
     })

    } catch (err) {
        dispatch({type:UNLIKE_SUBCOMMENT_FAIL,payload:err.response.data.message})
    }
}



export const getSubCommentLikeStatus = (slug,commentId,subCommentId) => async(dispatch)=>{
    try{
    
        dispatch({type:SUBCOMMENT_LIKE_STATUS_REQUEST})

        await axios.get(`${Url}/api/v1/b/${slug}/comments/${commentId}/subcomments/${subCommentId}`,{withCredentials:true}).then((response)=>{
          dispatch({type:SUBCOMMENT_LIKE_STATUS_SUCCESS,payload:{
             subCommentId,
             isSubCommentLiked:response.data.isSubCommentLiked
          }})
        })

    }catch(err){
      dispatch({type:SUBCOMMENT_LIKE_STATUS_FAIL,payload:err.response.data.message})
    }
}


export const deleteComment = (slug,commentId) => async(dispatch)=>{
    try{

        dispatch({type:DELETE_COMMENT_REQUEST})

        await axios.delete(`${Url}/api/v1/b/${slug}/comments/${commentId}`,{withCredentials:true}).then((response)=>{
            dispatch({type:DELETE_COMMENT_SUCCESS,payload:response.data.success})
        })

    }catch(err){
       dispatch({type:DELETE_COMMENT_FAIL,payload:err.response.data.message})
    }
}


export const deleteSubComment = (slug,commentId,subCommentId)=> async(dispatch)=>{
    try{
        dispatch({type:DELETE_SUBCOMMENT_REQUEST})

        await axios.delete(`${Url}/api/v1/b/${slug}/comments/${commentId}/subcomments/${subCommentId}`,{withCredentials:true}).then((response)=>{
           dispatch({type:DELETE_SUBCOMMENT_SUCCESS,payload:response.data.success})
        })

    }catch(err){
      dispatch({type:DELETE_SUBCOMMENT_FAIL,payload:err.response.data.message})
    }
}