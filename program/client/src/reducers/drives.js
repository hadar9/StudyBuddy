import {
  GET_DRIVES,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  DRIVE_ERROR,
  CHOOSE_DRIVE,
} from '../actions/types';

const initialState = {
  drives: [],
  drivesloading: false,
  drive: {},
  driveloading: false,
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
        drive: {},
        driveloading: false,
      };
    case CHOOSE_DRIVE:
      return {
        ...state,
        drive: payload,
        driveloading: true,
      };
    case CREATE_DRIVE_ERROR:
    case DRIVE_ERROR:
      return {
        drives: [],
        drivesloading: false,
        error: payload,
        drive: {},
        driveloading: false,
      };
    case CLEAR_DRIVES:
      return {
        drives: [],
        drivesloading: false,
        drive: {},
        driveloading: false,
        error: {},
      };
    default:
      return state;
  }
}
