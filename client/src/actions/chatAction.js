import axios from "axios"
import { DELETE_MESSAGE_FAIL, DELETE_MESSAGE_REQUEST, DELETE_MESSAGE_SUCCESS, GET_INBOX_FAIL, GET_INBOX_REQUEST, GET_INBOX_SUCCESS, MY_CHATS_FAIL, MY_CHATS_REQUEST, MY_CHATS_SUCCESS } from "../constants/chatConstants"



const Url = "https://bloggram-backend.onrender.com"


export const getMyInbox= () => async(dispatch)=>{
    try {

        dispatch({type:GET_INBOX_REQUEST})

        await axios.get(`${Url}/api/v1/direct/inbox`,{withCredentials:true}).then((response)=>{
            dispatch({type:GET_INBOX_SUCCESS,payload:response.data})
        })
        
    } catch (err) {
        dispatch({type:GET_INBOX_FAIL,payload:err.response.data.message})
    }
}

export const getChats = (roomId)=> async(dispatch)=>{
 try {
    dispatch({type:MY_CHATS_REQUEST})

    await axios.get(`${Url}/api/v1/direct/${roomId}`,{withCredentials:true}).then((response)=>{
        dispatch({type:MY_CHATS_SUCCESS,payload:response.data})
    })
    
 } catch (err) {
    dispatch({type:MY_CHATS_FAIL,payload:err.response.data.message})
 }
}

export const deleteMessage = (roomId,chatId)=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_MESSAGE_REQUEST})

        await axios.delete(`${Url}/api/v1/direct/d/${roomId}/${chatId}`,{withCredentials:true}).then((response)=>{
            dispatch({type:DELETE_MESSAGE_SUCCESS,payload:response.data.success})
        })
        
    } catch (err) {
        console.log()
        dispatch({type:DELETE_MESSAGE_FAIL,payload:err.response.data.message})
    }
}