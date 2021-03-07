import { GET_DRIVES, CREATE_DRIVE_ERROR, CLEAR_DRIVES } from '../actions/types';

const initialState = {
  drives: [],
  drivesloading: false,
  error: {},
};

export default function drives(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DRIVES:
      return {
        ...state,
        drives: payload,
        drivesloading: true,
      };

    case CREATE_DRIVE_ERROR:
      return {
        drives: [],
        drivesloading: false,
        error: payload,
      };
    case CLEAR_DRIVES:
      return {
        drives: [],
        drivesloading: false,
        error: {},
      };
    default:
      return state;
  }
}
