import { SET_ALERT, DELET_ALERT } from '../actions/types';

export const setalert = (msg, mtype) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    playload: { msg, mtype },
  });
};
export const deletealert = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: DELET_ALERT,
    });
  }, 4000);
};
