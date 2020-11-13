import { SET_ALERT, DELET_ALERT } from '../actions/types';

const initialState = {
  msg: '',
  mtype: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        msg: payload.msg,
        mtype: payload.mtype,
      };
    case DELET_ALERT:
      return {
        ...state,
        msg: '',
        mtype: '',
      };
    default:
      return state;
  }
}
