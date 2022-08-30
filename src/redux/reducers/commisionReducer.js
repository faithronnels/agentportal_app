import { GET_COMMISION } from "../actions/types";

const initialState = {
  commision: [],
  loading: true,
  errors: {},
};

const CommisionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMISION:
      return {
        ...state,
        commision: [...payload],
        loading: false,
      };

    default:
      return state;
  }
};
export default CommisionReducer;
