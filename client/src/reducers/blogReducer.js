import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_RESET, ADD_COMMENT_SUCCESS, ADD_SUBCOMMENT_FAIL, ADD_SUBCOMMENT_REQUEST, ADD_SUBCOMMENT_SUCCESS, ALL_BLOGS_FAIL, ALL_BLOGS_REQUEST, ALL_BLOGS_SUCCESS, BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_LIKE_STATUS_FAIL, BLOG_LIKE_STATUS_REQUEST, BLOG_LIKE_STATUS_SUCCESS, COMMENT_LIKE_STATUS_FAIL, COMMENT_LIKE_STATUS_REQUEST, COMMENT_LIKE_STATUS_SUCCESS, CREATE_BLOG_FAIL, CREATE_BLOG_REQUEST, CREATE_BLOG_RESET, CREATE_BLOG_SUCCESS, DELETE_BLOG_FAIL, DELETE_BLOG_REQUEST, DELETE_BLOG_RESET, DELETE_BLOG_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_RESET, DELETE_COMMENT_SUCCESS, DELETE_SUBCOMMENT_FAIL, DELETE_SUBCOMMENT_REQUEST, DELETE_SUBCOMMENT_SUCCESS, FOLLOWING_USER_BLOGS_FAIL, FOLLOWING_USER_BLOGS_REQUEST, FOLLOWING_USER_BLOGS_SUCCESS, LIKE_BLOG_FAIL, LIKE_BLOG_REQUEST, LIKE_BLOG_RESET, LIKE_BLOG_SUCCESS, LIKE_COMMENT_FAIL, LIKE_COMMENT_REQUEST, LIKE_COMMENT_RESET, LIKE_COMMENT_SUCCESS, LIKE_SUBCOMMENT_FAIL, LIKE_SUBCOMMENT_REQUEST, LIKE_SUBCOMMENT_SUCCESS, SUBCOMMENT_LIKE_STATUS_FAIL, SUBCOMMENT_LIKE_STATUS_REQUEST, SUBCOMMENT_LIKE_STATUS_SUCCESS, UNLIKE_BLOG_FAIL, UNLIKE_BLOG_REQUEST, UNLIKE_BLOG_SUCCESS, UNLIKE_COMMENT_FAIL, UNLIKE_COMMENT_REQUEST, UNLIKE_COMMENT_RESET, UNLIKE_COMMENT_SUCCESS, UNLIKE_SUBCOMMENT_FAIL, UNLIKE_SUBCOMMENT_REQUEST, UNLIKE_SUBCOMMENT_SUCCESS, UPDATE_BLOG_FAIL, UPDATE_BLOG_REQUEST, UPDATE_BLOG_RESET, UPDATE_BLOG_SUCCESS } from "../constants/blogConstants";



export const followingUserBlogsReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOWING_USER_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FOLLOWING_USER_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            }
        case FOLLOWING_USER_BLOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const newBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case CREATE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_BLOG_RESET:
            return {
                ...state,
                success: null,
                error: null
            }
        default:
            return state;
    }
}

export const blogReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BLOG_REQUEST:
            return{
                ...state,
                updateLoading:true
            }
        case UPDATE_BLOG_SUCCESS:
            return{
                ...state,
                updateLoading:false,
                isUpdated:action.payload
            }
        case UPDATE_BLOG_FAIL:
            return{
                ...state,
                updateLoading:false,
                updateError:action.payload
            }

        case UPDATE_BLOG_RESET:
            return{
                ...state,
                isUpdated:null,
                updateError:null
            }

        case DELETE_BLOG_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                isDeleted: action.payload
            }
        case DELETE_BLOG_FAIL:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.payload
            }

        case DELETE_BLOG_RESET:
            return{
                ...state,
                isDeleted:null,
                deleteError:null
            }
            
        default:
            return state;
    }

}


export const allBlogsReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_BLOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload
            }
        case ALL_BLOGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const blogDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BLOG_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                blog: action.payload
            }
        case BLOG_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const likeBlogReducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE_BLOG_REQUEST:
        case UNLIKE_BLOG_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LIKE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogLikedSuccess: action.payload
            };
        case UNLIKE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogUnlikedSuccess: action.payload
            };
        case LIKE_BLOG_FAIL:
        case UNLIKE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case LIKE_BLOG_RESET:
            return {
                ...state,
                error: null,
                blogLikedSuccess: null,
                blogUnlikedSuccess: null
            }

        default:
            return state;
    }
};


export const blogLikeStatusReducer = (state = {
    blogLikeStatus: {}
}, action) => {
    switch (action.type) {
        case BLOG_LIKE_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case BLOG_LIKE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogLikeStatus: {
                    ...state.blogLikeStatus,
                    [action.payload.slug]: action.payload.isLiked
                }
            }
        case BLOG_LIKE_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}


export const addCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
        case ADD_SUBCOMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_COMMENT_SUCCESS:
        case ADD_SUBCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case ADD_COMMENT_FAIL:
        case ADD_SUBCOMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case ADD_COMMENT_RESET:
            return {
                ...state,
                error: null,
                success: null
            }

        default:
            return state
    }
}

export const likeCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE_COMMENT_REQUEST:
        case LIKE_SUBCOMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LIKE_COMMENT_SUCCESS:
        case LIKE_SUBCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                commentLikedSuccess: action.payload,
            }
        case LIKE_COMMENT_FAIL:
        case LIKE_SUBCOMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case LIKE_COMMENT_RESET:
            return {
                ...state,
                error: null,
                commentLikedSuccess: null
            }

        default:
            return state;
    }
}

export const unlikeCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case UNLIKE_COMMENT_REQUEST:
        case UNLIKE_SUBCOMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UNLIKE_COMMENT_SUCCESS:
        case UNLIKE_SUBCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                commentUnlikedSuccess: action.payload
            }
        case UNLIKE_COMMENT_FAIL:
        case UNLIKE_SUBCOMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UNLIKE_COMMENT_RESET:
            return {
                ...state,
                error: null,
                commentUnlikedSuccess: null
            }

        default:
            return state;
    }
}

export const commentLikeStatusReducer = (state = {
    commentLikeStatus: {},
    subCommentLikeStatus: {}
}, action) => {
    switch (action.type) {
        case COMMENT_LIKE_STATUS_REQUEST:
        case SUBCOMMENT_LIKE_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case COMMENT_LIKE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                commentLikeStatus: {
                    ...state.commentLikeStatus,
                    [action.payload.commentId]: action.payload.isCommentLiked
                }
            }
        case SUBCOMMENT_LIKE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                subCommentLikeStatus: {
                    ...state.subCommentLikeStatus,
                    [action.payload.subCommentId]: action.payload.isSubCommentLiked
                }
            }
        case COMMENT_LIKE_STATUS_FAIL:
        case SUBCOMMENT_LIKE_STATUS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const deleteCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COMMENT_REQUEST:
        case DELETE_SUBCOMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_COMMENT_SUCCESS:
        case DELETE_SUBCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case DELETE_COMMENT_FAIL:
        case DELETE_SUBCOMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_COMMENT_RESET:
            return {
                ...state,
                error: null,
                success: null
            }
        default:
            return state;
    }
}