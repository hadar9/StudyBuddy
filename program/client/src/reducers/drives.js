import {
  GET_DRIVES,
  CREATE_DRIVE_ERROR,
  CLEAR_DRIVES,
  CHOOSE_DRIVE,
  UNCHOOSE_DRIVE,
} from '../actions/types';

const initialState = {
  drives: [],
  drivesloading: false,
  drive: null,
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
      };
    case CHOOSE_DRIVE:
      return {
        ...state,
        drive: payload,
        driveloading: true,
      };
    case UNCHOOSE_DRIVE:
      return {
        ...state,
        drive: null,
        driveloading: false,
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
        drive: null,
        driveloading: false,
        error: {},
      };
    default:
      return state;
  }
}
