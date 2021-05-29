import axios from 'axios';
import { choosefolder, deletefolder, deletefilefalse } from './filesystem';
import {
  GET_DRIVES,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
  UPDATED_ELEM_INCHOOSEN_DRIVE,
  SEARCH_DRIVES_SUCCESS,
  ClOSE_SEARCH,
  SEARCH_DRIVE_ERROR,
  CLEAR_DRIVES_STATE,
  GET_CHAT_GROUPS,
} from './types';
import { setalert } from './alert';

export const getchatgroups = (drive_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      drive_id,
    });
    const groups = await axios.post('/api/drives/getchatgroups', body, config);
    dispatch({
      type: GET_CHAT_GROUPS,
      payload: groups.data,
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
export const clearsearchdrives = () => async (dispatch) => {
  dispatch({
    type: ClOSE_SEARCH,
  });
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
      type: SEARCH_DRIVES_SUCCESS,
      payload: { drives: res.data, searchinput: searchdrive },
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

export const confirmjoindrive = (driveid, userid, adminper) => async (
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
      userid,
    });
    const res = await axios.post('/api/drives/confirmjoindrive', body, config);

    dispatch({
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: adminper },
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
export const deletedrivebuddy = (driveid, userid, adminper) => async (
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
      userid,
    });
    const res = await axios.post('/api/drives/deletebuddy', body, config);

    dispatch({
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: adminper },
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
export const rejectreq = (driveid, userid, adminper) => async (dispatch) => {
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
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: adminper },
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
      type: SEARCH_DRIVES_SUCCESS,
      payload: { drives: res.data, searchinput: searchdrive },
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
export const leavedrive = (driveid, searchinput = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
    });
    await axios.post('/api/drives/leavedrive', body, config);

    if (searchinput !== null) {
      dispatch(searchdrives(searchinput));
    } else {
      dispatch(getotherdrives());
    }
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
      payload: { drives: res.data, type: 'mydrives' },
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
      payload: { drives: res.data, type: 'otherdrives' },
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
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: null },
    });
    dispatch(setalert('Changes saved', 'success'));
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
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: null },
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
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: null },
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

export const setdrivepermission = (driveid, permission) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      permission,
    });

    const res = await axios.post(
      '/api/drives/setdrivepermission',
      body,
      config
    );
    dispatch({
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: null },
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

export const setadminper = (
  driveid,
  adminid,
  createfolder,
  upload,
  rename,
  deletee,
  buddymang,
  editmess
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid,
      adminid,
      createfolder,
      upload,
      rename,
      deletee,
      buddymang,
      editmess,
    });

    const res = await axios.post(
      '/api/drives/setadminpermission',
      body,
      config
    );
    dispatch({
      type: UPDATED_ELEM_INCHOOSEN_DRIVE,
      payload: { drive: res.data, per: null },
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
      payload: { drive: res.data.resdrive, per: res.data.per },
    });
    dispatch(choosefolder(res.data.resdrive));
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

export const deletemydrive = (drive) => async (dispatch) => {
  try {
    await dispatch(deletefolder(drive));
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      driveid: drive._id,
    });
    await axios.post('/api/drives/deletemydrive', body, config);
    dispatch(deletefilefalse());
    dispatch(getmydrives());
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

export const renamedrive = (drive, newname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      drive,
      newname,
    });
    await axios.post('/api/drives/rename', body, config);
    dispatch(getmydrives());
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
