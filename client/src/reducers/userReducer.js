import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, CLEAR_ERRORS, FOLLOWING_STATUS_FAIL, FOLLOWING_STATUS_REQUEST, FOLLOWING_STATUS_SUCCESS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_RESET, FOLLOW_USER_SUCCESS, LOAD_PROFILE_FAIL, LOAD_PROFILE_REQUEST, LOAD_PROFILE_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, OTP_HELPER_FAIL, OTP_HELPER_REQUEST, OTP_HELPER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_RESET, RESET_PASSWORD_SUCCESS, SEARCH_USER_FAIL, SEARCH_USER_REQUEST, SEARCH_USER_RESET, SEARCH_USER_SUCCESS, UNFOLLOW_USER_FAIL, UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";


let parsedUser;
const userFromLocalStorage = localStorage.getItem('userInfo')

if (userFromLocalStorage) {
    parsedUser = JSON.parse(userFromLocalStorage)
}

const initialState = {
    user: parsedUser,
    isAuthenticated: !!parsedUser,
    loading: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                success: action.payload.success,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const otpReducer = (state = {}, action) => {
    switch (action.type) {
        case OTP_HELPER_REQUEST:
            return {
                ...state,
                loading: true
            };

        case OTP_HELPER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            };

        case OTP_HELPER_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                success: action.payload.success
            };

        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RESET_PASSWORD_RESET:
            return {
                ...state,
                message: null,
                success: null,
                error: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};



export const searchUserReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SEARCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case SEARCH_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SEARCH_USER_RESET:
            return {
                ...state,
                error: null,
                users: null
            }
        default:
            return state;
    }
}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_PROFILE_REQUEST:
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOAD_PROFILE_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                blogs: action.payload.blogs
            }
        case LOAD_PROFILE_FAIL:
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateLoading: true
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                isUpdated: action.payload
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload
            }
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changeLoading: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changeLoading: false,
                isChanged: action.payload
            }
        case CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                changeLoading: false,
                changeError: action.payload
            }

        case CHANGE_PASSWORD_RESET:
            return {
                ...state,
                isChanged: null,
                changeError: null
            }

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: null,
                updateError: null
            }

        default:
            return state;
    }
}

export const allUsersReducer = (state = {},action)=>{
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ALL_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload
            }
        case ALL_USERS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export const followingStatusReducer = (state = {
    followingStatus: {}
}, action) => {
    switch (action.type) {
        case FOLLOWING_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FOLLOWING_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                followingStatus: {
                    ...state.followingStatus,
                    [action.payload.username]: action.payload.isFollowing
                }
            }
        case FOLLOWING_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const followUserReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOW_USER_REQUEST:
        case UNFOLLOW_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FOLLOW_USER_SUCCESS:
        case UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case FOLLOW_USER_FAIL:
        case UNFOLLOW_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case FOLLOW_USER_RESET:
            return {
                ...state,
                success: null,
                error: null
            }
        default:
            return state;
    }
}


