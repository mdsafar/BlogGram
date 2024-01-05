import { DELETE_MESSAGE_FAIL, DELETE_MESSAGE_REQUEST, DELETE_MESSAGE_RESET, DELETE_MESSAGE_SUCCESS, GET_INBOX_FAIL, GET_INBOX_REQUEST, GET_INBOX_SUCCESS, MY_CHATS_FAIL, MY_CHATS_REQUEST, MY_CHATS_SUCCESS } from "../constants/chatConstants";

export const getMyInboxReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_INBOX_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_INBOX_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case GET_INBOX_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const myChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case MY_CHATS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload.chats,
                from: action.payload.from,
                to: action.payload.to
            }
        case MY_CHATS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_MESSAGE_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }

        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                deleteLoading: true,
                isDeleted: action.payload
            }

        case DELETE_MESSAGE_FAIL:
            return {
                ...state,
                deleteLoading: false,
                deleteError: action.payload
            }

        case DELETE_MESSAGE_RESET:
            return {
                ...state,
                isDeleted: null,
                deleteError: null
            }

        default:
            return state;
    }
}

