import {
  AGENTREG_ERROR,
  CLEAR_AGENTREG_ERRORS,
  FETCH_REGISTRATIONS,
  AGENTREG_SUCCESS,
  GET_AGENTREGINFO,
  CLEAR_AGENTREGINFO,
  CLEAR_AGENTREG_SUCCESS,
  SET_AGENTREG_LOADING,
  CLEAR_AGENTREG_LOADING,
} from "../actions/types";

const initialState = {
  agentsAccountInfo: null,
  agentRegistrations: null,
  isLoading: false,
  errorMsg: null,
  successMsg: null,
};

const agentRegistrationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AGENTREGINFO:
      return {
        ...state,
        agentsAccountInfo: payload,
        isLoading: false,
      };
    case FETCH_REGISTRATIONS:
      return {
        ...state,
        agentRegistrations: payload,
        isLoading: false,
      };
    case CLEAR_AGENTREGINFO:
      return {
        ...state,
        agentsAccountInfo: null,
        isLoading: false,
      };

    case AGENTREG_ERROR:
      return {
        ...state,
        errorMsg: payload,
        isLoading: false,
      };

    case CLEAR_AGENTREG_ERRORS:
      return { ...state, errorMsg: "" };
    case AGENTREG_SUCCESS:
      return { ...state, successMsg: payload, isLoading: false };
    case CLEAR_AGENTREG_SUCCESS:
      return { ...state, successMsg: "" };
    case SET_AGENTREG_LOADING:
      return { ...state, isLoading: true };

    case CLEAR_AGENTREG_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
export default agentRegistrationReducer;
