import { SET_ALERT, DELET_ALERT } from '../actions/types';

const initialState = {
  msg: '',
  mtype: '',
};

export default function (state = initialState, action) {
  const { type, playload } = action;
  
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        msg: playload.msg,
        mtype: playload.mtype,
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
