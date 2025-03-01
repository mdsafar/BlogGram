import axios from "axios"
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, FOLLOWING_STATUS_FAIL, FOLLOWING_STATUS_REQUEST, FOLLOWING_STATUS_SUCCESS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, LOAD_PROFILE_FAIL, LOAD_PROFILE_REQUEST, LOAD_PROFILE_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, OTP_HELPER_FAIL, OTP_HELPER_REQUEST, OTP_HELPER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UNFOLLOW_USER_FAIL, UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants"


const Url = "https://blog-gram-server.onrender.com/api/v1"

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.post(`${Url}/api/v1/login`, { username, password }, config).then((response) => {
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            dispatch({ type: LOGIN_SUCCESS, payload: response.data })
        })
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.message })
    }
}

export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })


        const config = { headers: { "Content-Type": "application/json" } };

        await axios.post(`${Url}/api/v1/signup`, userData, config).then((response) => {
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { success: response.data.success } })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: REGISTER_USER_FAIL, payload: err.response.data.message })
    }
}


export const verifyEmail = (userId, otp) => async (dispatch) => {
    try {

        dispatch({ type: OTP_HELPER_REQUEST })


        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.post(`${Url}/api/v1/verify-email`, { userId, otp }, config).then((response) => {
            dispatch({ type: OTP_HELPER_SUCCESS, payload: response.data })
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: OTP_HELPER_FAIL, payload: err.response.data.message })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } };

        await axios.post(`${Url}/api/v1/forgotPassword`, { email }, config).then((response) => {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data.message })
    }
}

export const forgotPasswordVerify = (email, otp, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        await axios.post(`${Url}/api/v1/forgotPasswordVerify`, { email, otp, password }, config).then((response) => {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data.message })
    }
};



export const getUserProfile = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_PROFILE_REQUEST })

        await axios.get(`${Url}/api/v1/account`, { withCredentials: true }).then((response) => {
            dispatch({
                type: LOAD_PROFILE_SUCCESS, payload: {
                    user: response.data.user,
                    blogs: response.data.blogs
                }
            })
        })

    } catch (err) {
        dispatch({ type: LOAD_PROFILE_FAIL, payload: err.response.data.message })
    }
}

export const getUserDetails = (name) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })

        await axios.get(`${Url}/api/v1/${name}`, { withCredentials: true }).then((response) => {
            dispatch({
                type: USER_DETAILS_SUCCESS, payload: {
                    user: response.data.user,
                    blogs: response.data.blogs
                }
            })
        })

    } catch (err) {
        dispatch({ type: USER_DETAILS_FAIL, payload: err.response.data.message })
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.put(`${Url}/api/v1/account/update`, userData, config).then((response) => {
            localStorage.setItem('userInfo', JSON.stringify(response.data.user))
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.message })
    }
}

export const changePassword = (oldPass, newPass) => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_PASSWORD_REQUEST })

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.put(`${Url}/api/v1/changePassword`, { oldPass, newPass }, config).then((response) => {
            dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: CHANGE_PASSWORD_FAIL, payload: err.response.data.message })
    }
}

export const getFollowingStatus = (username) => async (dispatch) => {
    try {

        dispatch({ type: FOLLOWING_STATUS_REQUEST })

        await axios.get(`${Url}/api/v1/${username}/followStatus`, { withCredentials: true }).then((response) => {
            dispatch({
                type: FOLLOWING_STATUS_SUCCESS, payload: {
                    username,
                    isFollowing: response.data.isFollowing
                }
            })
        })

    } catch (err) {
        console.log(err)
        dispatch({ type: FOLLOWING_STATUS_FAIL, payload: err.response.data.message })
    }
}

export const followUser = (userId) => async (dispatch) => {
    try {

        dispatch({ type: FOLLOW_USER_REQUEST })

        await axios.put(`${Url}/api/v1/follow/${userId}`, {}, { withCredentials: true }).then((response) => {
            dispatch({ type: FOLLOW_USER_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: FOLLOW_USER_FAIL, payload: err.response.data.message })
    }
}

export const unfollowUser = (userId) => async (dispatch) => {
    try {

        dispatch({ type: UNFOLLOW_USER_REQUEST })

        await axios.put(`${Url}/api/v1/unfollow/${userId}`, {}, { withCredentials: true }).then((response) => {
            dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: response.data.success })
        })

    } catch (err) {
        dispatch({ type: UNFOLLOW_USER_FAIL, payload: err.response.data.message })
    }
}


export const searchUser = (name) => async (dispatch) => {
    try {

        dispatch({ type: SEARCH_USER_REQUEST })

        await axios.get(`${Url}/api/v1/account/search?name=${name}`, { withCredentials: true }).then((response) => {
            dispatch({ type: SEARCH_USER_SUCCESS, payload: response.data })
        })

    } catch (err) {
        dispatch({ type: SEARCH_USER_FAIL, payload: err.response.data.message })
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        await axios.get(`${Url}/api/v1/admin/users`,{withCredentials:true}).then((response) => {
            dispatch({ type: ALL_USERS_SUCCESS, payload: response.data })
        })
    } catch (err) {
        dispatch({ type: ALL_USERS_FAIL, payload: err.response.data.message })
    }

}


export const logOut = () => async (dispatch) => {
    try {
        await axios.post(`${Url}/api/v1/logout`, {}, { withCredentials: true })
        localStorage.removeItem('userInfo')
        dispatch({ type: LOGOUT_SUCCESS })

    } catch (err) {
        console.log(err)
        dispatch({ type: LOGOUT_FAIL })
    }
}