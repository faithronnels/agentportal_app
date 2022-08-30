import { GET_NOTIFICATION, NOTIFICATION_ERROR } from "../actions/types";

const initialState = {
  notification: [],
  loading: true,
  errors: null,
};

const NotificationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        notification: payload,
        loading: false,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        errors: [...payload],
        loading: false,
      };

    default:
      return state;
  }
};
export default NotificationReducer;
