import axios from 'axios';
import {
  MSG_SENT,
  GROUPS_FOUND,
  MSG_ERROR,
  CHOOSE_GROUP,
  SET_RECIPIENT,
  SET_CURRENT_GROUP,
  CREATE_NEW_GROUP,
  LEAVE_GROUP,
  CLEAR_CHAT,
} from '../actions/types';

export const leavegroup = (user, group) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    user,
    group,
  });
  try {
    const res = await axios.post('api/chat/leavegroup', body, config);
    dispatch({
      type: LEAVE_GROUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};
export const adduser = (group_id, user, username) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    group_id,
    user,
    username,
  });

  try {
    await axios.post('api/chat/adduser', body, config);
    dispatch({
      type: CREATE_NEW_GROUP,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};

export const creategroup =
  (name, user_id, user, drive_id) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      name,
      user_id,
      user,
      drive_id,
    });
    console.log(body);

    try {
      const res = await axios.post('api/chat/creategroup', body, config);
      console.log(res.data);
      dispatch({
        type: CREATE_NEW_GROUP,
      });
    } catch (error) {
      dispatch({
        type: MSG_ERROR,
      });
    }
  };

export const setcurrentgroupid = (id, groupname) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENT_GROUP,
      payload: { id: id, groupname: groupname },
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};
export const selectrecipient = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_RECIPIENT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};

export const choosegroup = (group) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    group,
  });

  try {
    const res = await axios.post('api/chat/choosegroup', body, config);
    dispatch({
      type: CHOOSE_GROUP,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};

export const findgroups = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    user,
  });
  try {
    const res = await axios.post('api/chat/findgroups', body, config);
    dispatch({
      type: GROUPS_FOUND,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
  }
};

export const send = (group, sender, message) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    group,
    sender,
    message,
  });
  try {
    const res = await axios.post('api/chat/send', body, config);

    dispatch({
      type: MSG_SENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MSG_ERROR,
    });
    console.log('error in send action');
  }
};

export const clearchat = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CHAT,
  });
};
