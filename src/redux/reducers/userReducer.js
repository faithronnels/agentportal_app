import {
  GET_USERS,
  CLEAR_USERS,
  DELETE_USER,
  USER_ERROR,
  CLEAR_USER_ERROR,
  USER_SUCCESS,
  CLEAR_USER_SUCCESS,
  SET_USER_LOADING,
  GET_USER_ROLE,
  CLEAR_USER_LOADING,
} from "../actions/types";

const initialState = {
  users: null,
  userRoles: [],
  isLoading: false,
  errorMsg: null,
  successMsg: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case GET_USER_ROLE:
      return {
        ...state,
        userRoles: [...payload],
        isLoading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((users) => users.userId !== payload)],
        isLoading: false,
      };

    case USER_ERROR:
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };
    case CLEAR_USER_ERROR:
      return { ...state, errorMsg: "" };
    case CLEAR_USERS:
      return { ...state, users: null };
    case USER_SUCCESS:
      return { ...state, successMsg: payload, isLoading: false };
    case CLEAR_USER_SUCCESS:
      return { ...state, successMsg: "" };
    case SET_USER_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_USER_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
export default userReducer;
