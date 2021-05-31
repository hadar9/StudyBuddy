import {
    MSG_SENT,
    MSG_RECEIVED,
    MSG_ERROR,
    GROUPS_FOUND,
    CHOOSE_GROUP,
    SET_RECIPIENT,
    SET_CURRENT_GROUP,
    CREATE_NEW_GROUP,
    LEAVE_GROUP,
  } from '../actions/types';

  const initialState = {
        messages: {},
        groups: {},
        recipient: null,
        current_group: null,
  };
  
  export default function filesystem(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case MSG_SENT:
        case MSG_RECEIVED:
            return {
                ...state,
                messages: payload,
            };
        case GROUPS_FOUND:
            return{
                ...state,
                groups: payload,
            }
        case CHOOSE_GROUP:
            return{
                ...state,
                messages: payload,
            }
        case SET_RECIPIENT:
            return{
                ...state,
                recipient: payload,
            }
        case SET_CURRENT_GROUP:
            return{
                ...state,
                current_group: payload,
            }
        case CREATE_NEW_GROUP:
        case LEAVE_GROUP:
        case MSG_ERROR:
        
        default:
            return state;
    }
  }