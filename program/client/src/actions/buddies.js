import axios from 'axios';
import {
  GET_USER_PROFILE,
  CLOSE_USER_PROFILE,
  PROFILE_ERROR,
  CLEAR_BUDDY,
  GET_MYBUDDIES,
  CLOSE_MYBUDDIES,
  ADD_BUDDY,
  CONFIRM_BUDDY,
  DELETE_BUDDY,
  BUDDIES_ERROR,
  SEARCH_BUDDIES_SUCCESS,
  SEARCH_BUDDIES_CLOSE,
  SEARCH_BUDDIES_ERROR,
} from '../actions/types';

export const searchbuddies = (username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      username,
    });

    const res = await axios.post('/api/buddies/buddies', body, config);

    dispatch({
      type: SEARCH_BUDDIES_SUCCESS,
      payload: { mybuddies: res.data, searchinput: username },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_BUDDIES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const closesearchbuddies = () => async (dispatch) => {
  dispatch({
    type: SEARCH_BUDDIES_CLOSE,
  });
};

//Get specific profile with the user id
export const getuserprofile = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id,
    });

    const res = await axios.post('/api/buddies/buddyprofile', body, config);
    dispatch({
      type: GET_USER_PROFILE,
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
//close spesfic user profiel
export const closeuserprofile = () => async (dispatch) => {
  dispatch({
    type: CLOSE_USER_PROFILE,
  });
};

//Get all my buddies
export const getmybuddies = (key) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      key,
    });
    const res = await axios.post('/api/buddies/mybuddies', body, config);
    dispatch({
      type: GET_MYBUDDIES,
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
//close my buddies
export const closemybuddies = () => async (dispatch) => {
  dispatch({
    type: CLOSE_MYBUDDIES,
  });
};

// add buddy
export const addbuddy = (id, searchinput) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id,
      searchinput,
    });
    const res = await axios.post('api/buddies/addbuddy', body, config);

    dispatch({
      type: ADD_BUDDY,
      payload: { mybuddies: res.data, searchinput: searchinput },
    });
  } catch (error) {
    dispatch({
      type: BUDDIES_ERROR,
    });
  }
};

// confirm buddy
export const confirmbuddy = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id,
    });

    const res = await axios.post('api/buddies/confirmbuddy', body, config);

    dispatch({
      type: CONFIRM_BUDDY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BUDDIES_ERROR,
    });
  }
};

// delete buddy
export const deletebuddy = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      id,
    });

    const res = await axios.post('api/buddies/deletebuddy', body, config);
    dispatch({
      type: DELETE_BUDDY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BUDDIES_ERROR,
    });
  }
};
//close my buddies
export const clearbuddy = () => async (dispatch) => {
  dispatch({
    type: CLEAR_BUDDY,
  });
};
