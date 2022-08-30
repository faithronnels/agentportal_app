import { combineReducers } from "redux";

import commision from "./commisionReducer";
import request from "./requestReducer";
import users from "./userReducer";
import auth from "./authReducer";
import agentReg from "./agentRegistrationReducer";
import   notice from "./notificationReducer";

export default combineReducers({
  commision,
  request,
  users,
  auth,
  agentReg,
  notice,
});
