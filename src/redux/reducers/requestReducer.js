import {
  GET_REQUEST,
  REQUEST_ERROR,
  GET_CATEGORY,
  CLEAR_REQUEST_ERRORS,
  REQUEST_SUCCESS,
  CLEAR_REQUEST_SUCCESS,
  SET_REQUEST_LOADING,
  CLEAR_REQUEST_LOADING,
} from "../actions/types";

const initialState = {
  requests: null,
  isLoading: false,
  errorMsg: null,
  successMsg: null,
  category: [],
};

const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REQUEST:
      return {
        ...state,
        requests: payload,
        isLoading: false,
      };

    case GET_CATEGORY:
      return {
        ...state,
        category: [...payload],
        isLoading: false,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    case CLEAR_REQUEST_ERRORS:
      return { ...state, errorMsg: "" };
    case REQUEST_SUCCESS:
      return { ...state, successMsg: payload, isLoading: false };
    case CLEAR_REQUEST_SUCCESS:
      return { ...state, successMsg: "" };
    case SET_REQUEST_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_REQUEST_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
export default requestReducer;
