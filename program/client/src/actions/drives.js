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
  CLEAR_DRIVES_STATE,
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

export const confirmjoindrive = (driveid, userid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      userid,
    });
    const res = await axios.post('/api/drives/confirmjoindrive', body, config);

    dispatch({
      type: CHOOSE_DRIVE,
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
export const deletedrivebuddy = (driveid, userid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      userid,
    });
    const res = await axios.post('/api/drives/deletebuddy', body, config);
    console.log(res.data);
    dispatch({
      type: CHOOSE_DRIVE,
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
export const rejectreq = (driveid, userid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      userid,
    });
    const res = await axios.post('/api/drives/rejectreq', body, config);

    dispatch({
      type: CHOOSE_DRIVE,
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

export const getmydrives = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/drives/getmydrives');
    dispatch({
      type: GET_DRIVES,
      payload: { drives: res.data, drivestype: 'mydrives' },
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

export const getotherdrives = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/drives/getotherdrives');
    dispatch({
      type: GET_DRIVES,
      payload: { drives: res.data, drivestype: 'otherdrives' },
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

export const setbuddypermission = (driveid, buddyid, newper) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      buddyid,
      newper,
    });

    const res = await axios.post(
      '/api/drives/setbuddypermission',
      body,
      config
    );
    dispatch({
      type: CHOOSE_DRIVE,
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

export const addadmin = (driveid, userid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      userid,
    });

    const res = await axios.post('/api/drives/addadmin', body, config);
    dispatch({
      type: CHOOSE_DRIVE,
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
export const deleteadmin = (driveid, userid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      userid,
    });
    const res = await axios.post('/api/drives/deleteadmin', body, config);
    dispatch({
      type: CHOOSE_DRIVE,
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
    dispatch(getmydrives());
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
export const cleardrivesstate = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DRIVES_STATE,
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
    dispatch(cleardrives());
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
