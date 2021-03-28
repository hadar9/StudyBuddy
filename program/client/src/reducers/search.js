import { SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/types';

const initialState = {
  searchres: [],
  searchloading: false,
  searchinput: '',
  error: {},
};

export default function search(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchloading: true,
        searchres: payload.searchres,
        searchinput: payload.searchinput,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        searchres: [],
        searchloading: false,
        searcuinput: '',
        error: payload,
      };
    default:
      return state;
  }
}
