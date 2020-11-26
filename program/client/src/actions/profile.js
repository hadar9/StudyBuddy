import axios from 'axios';
import { setalert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from '../actions/types';

//get my profile
export const getmyprofile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// update profile
export const updateprofile = ({
  avatar,
  firstname,
  lastname,
  studyat,
  studyfield,
}) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      avatar,
      firstname,
      lastname,
      studyat,
      studyfield,
    });

    const res = await axios.post('/api/profile', body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setalert('changes saved!', 'success'));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    dispatch(setalert('Error editing!', 'danger'));
  }
};
