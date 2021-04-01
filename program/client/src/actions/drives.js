import axios from 'axios';
import { choosefolder } from './filesystem';
import {
  GET_DRIVES,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
  SEARCH_DRIVES_SUCCESS,
  SEARCH_DRIVE_ERROR,
} from './types';

export const searchdrives = (drivename) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      drivename,
    });
    const res = await axios.post('/api/drives/searchdrives', body, config);
    dispatch({
      type: SEARCH_DRIVES_SUCCESS,
      payload: { drives: res.data, searchinput: drivename },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const joindrive = (driveid, searchdrive) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      searchdrive,
    });
    const res = await axios.post('/api/drives/joindrive', body, config);

    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const confirmjoindrive = (driveid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
    });
    const res = await axios.post('/api/drives/confirmjoindrive', body, config);

    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletereq = (driveid, searchdrive) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      searchdrive,
    });
    const res = await axios.post('/api/drives/delete', body, config);

    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const leavedrive = (driveid, searchdrive) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      searchdrive,
    });
    const res = await axios.post('/api/drives/leavedrive', body, config);

    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getdrives = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/drives/getmydrives');
    dispatch({
      type: GET_DRIVES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createdrive = (drivename) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    drivename,
  });
  try {
    await axios.post('/api/drives/createdrive', body, config);
    dispatch(getdrives());
  } catch (error) {
    dispatch({
      type: CREATE_DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const cleardrives = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DRIVES,
  });
};

export const choosedrive = (drive) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    drive,
  });
  try {
    const res = await axios.post('/api/drives/choosedrive', body, config);
    dispatch({
      type: CHOOSE_DRIVE,
      payload: res.data,
    });
    dispatch(choosefolder(res.data));
  } catch (error) {
    dispatch({
      type: DRIVE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
