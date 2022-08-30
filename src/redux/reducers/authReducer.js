import {
  CLEAR_AUTH,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  AUTH_SUCCESS,
  CLEAR_AUTH_SUCCESS,
  SET_AUTH_LOADING,
  CLEAR_AUTH_LOADING,
  SET_CURRENT_ACCESS,
  CLEAR_CURRENT_ACCESS,
  SET_ISAUTHENTICATED,
  CLEAR_ISAUTHENTICATED,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
} from "../actions/types";

const initialState = {
  accessToken: null,
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  errorMsg: null,
  successMsg: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ERROR:
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        errorMsg: "",
      };
    case CLEAR_AUTH:
      return {
        ...state,
        AUTHs: {},
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        successMsg: payload,
        isLoading: false,
      };
    case SET_ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case CLEAR_ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case SET_CURRENT_ACCESS:
      return {
        ...state,
        accessToken: payload,
        isLoading: false,
      };
    case CLEAR_CURRENT_ACCESS:
      return {
        ...state,
        accessToken: null,
        isLoading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };

    case CLEAR_AUTH_SUCCESS:
      return { ...state, successMsg: "" };
    case SET_AUTH_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_AUTH_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default authReducer;
