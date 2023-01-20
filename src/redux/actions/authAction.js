import config from "../../config";
import axios from "axios";
import {
  CLEAR_AUTH,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  AUTH_SUCCESS,
  CLEAR_AUTH_SUCCESS,
  SET_AUTH_LOADING,
  CLEAR_AUTH_LOADING,
  SET_CURRENT_USER,
  SET_ISAUTHENTICATED,
  CLEAR_ISAUTHENTICATED,
  SET_CURRENT_ACCESS,
  CLEAR_CURRENT_ACCESS,
  CLEAR_CURRENT_USER,
} from "../actions/types";

export const checkAuthState = () => (dispatch) => {
  if (localStorage.jwtToken) {
    dispatch(setIsAuthenticated());

    const jwtString = localStorage.getItem("jwtToken");
    const jwtTokenString = jwtString.split(`${config.ConcatStr}`);
    const refresh_token = jwtTokenString[0];
    const rx = jwtTokenString[2];
    const userId = jwtTokenString[3];
    const accessString = localStorage.getItem("accessToken");
    const accessTokenString = accessString.split(`${config.ConcatStr}`);
    const accesstoken = accessTokenString[0];
    const ax = accessTokenString[1];
    const currentTime = new Date(Date.now()).getTime();

    dispatch(currentUser(userId));
    dispatch(setCurrentAccess(accesstoken));

    if (rx < currentTime) {
      dispatch(logoutUser());
      window.location.href = "/signin";
    }
    if (ax < currentTime) {
      dispatch(refreshtoken(refresh_token));
    }
  }
};

export const loginUser = (formInput) => async (dispatch) => {
  dispatch(setAuthLoading());
  dispatch(clearAuthError());
  dispatch(clearCurrentAccess());
  dispatch(clearAuthSuccessMsg());
  dispatch(clearIsAuthenticated());
  const url = `${config.Urls.base}/sessions`;
  const formData = JSON.stringify(formInput);
  try {
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const sessionId = res.data.data.session_id;
    const refreshToken = res.data.data.refresh_token;
    const accessToken = res.data.data.access_token;
    const userId = res.data.data.user_id;

    dispatch(clearAuthLoading());
    dispatch(setAuthSuccess(res.data.messages[0]));
    dispatch(setCurrentAccess(accessToken));
    dispatch(setIsAuthenticated());
    localStorage.setItem(
      "jwtToken",
      refreshToken +
        `${config.ConcatStr}` +
        sessionId +
        `${config.ConcatStr}` +
        (new Date(Date.now()).getTime() + 10080 * 60000) +
        `${config.ConcatStr}` +
        userId
    );
    localStorage.setItem(
      "accessToken",
      accessToken +
        `${config.ConcatStr}` +
        (new Date(Date.now()).getTime() + 1440 * 60000)
    );
    dispatch(currentUser(userId));
  } catch (err) {
    dispatch(clearAuthLoading());
    dispatch(clearIsAuthenticated());
    dispatch(setAuthError("Username/Password Incorrect"));
  }
};

export const refreshtoken = (rft) => async (dispatch) => {
  dispatch(setAuthLoading());
  dispatch(clearAuthError());
  dispatch(clearCurrentAccess());
  const token = { refresh_token: rft };
  const formData = JSON.stringify(token);
  const jwtString = localStorage.getItem("jwtToken");
  const jwtTokenString = jwtString.split(`${config.ConcatStr}`);
  const sessionId = jwtTokenString[1];
  const accessString = localStorage.getItem("accessToken");
  const accessTokenString = accessString.split(`${config.ConcatStr}`);
  const accessToken = accessTokenString[0];
  const url = `${config.Urls.base}/sessions/${sessionId}`;

  try {
    const res = await axios.patch(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });

    const newsessionId = res.data.data.session_id;
    const newrefreshToken = res.data.data.refresh_token;
    const newAccessToken = res.data.data.access_token;
    const newuserId = res.data.data.user_id;

    dispatch(clearAuthLoading());
    dispatch(setAuthSuccess(res.data.messages[0]));
    dispatch(setCurrentAccess(newAccessToken));
    dispatch(setIsAuthenticated());

    localStorage.setItem(
      "jwtToken",
      newrefreshToken +
        `${config.ConcatStr}` +
        newsessionId +
        `${config.ConcatStr}` +
        (new Date(Date.now()).getTime() + 10080 * 60000) +
        `${config.ConcatStr}` +
        newuserId
    );
    localStorage.setItem(
      "accessToken",
      newAccessToken +
        `${config.ConcatStr}` +
        (new Date(Date.now()).getTime() + 1440 * 60000)
    );

    dispatch(currentUser(newuserId));
  } catch (err) {
    dispatch(clearAuthLoading());
    dispatch(setAuthError(err.response.data.messages[0]));
  }
};
export const currentUser = (userId) => async (dispatch) => {
  dispatch(setAuthLoading());
  dispatch(clearAuthError());
  dispatch(clearAuthSuccessMsg());
  const url = `${config.Urls.base}/users/${userId}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (resData.statusCode === 200) {
      dispatch({
        type: SET_CURRENT_USER,
        payload: resData.data,
      });
    }
  } catch (err) {
    dispatch(clearAuthLoading());
    dispatch(clearIsAuthenticated());
    dispatch(setAuthError(err.response));
  }
};

export const deleteAuth = () => async (dispatch) => {
  if (localStorage.jwtToken) {
    const jwtString = localStorage.getItem("jwtToken");
    const jwtTokenString = jwtString.split(`${config.ConcatStr}`);
    const jwtToken = jwtTokenString[0];
    const sessionId = jwtTokenString[1];
    const accessString = localStorage.getItem("accessToken");
    const accessTokenString = accessString.split(`${config.ConcatStr}`);
    const accessToken = accessTokenString[0];
    const url = `${config.Urls.base}/sessions/${sessionId}`;
    const body = JSON.stringify(`'refresh_token': '${jwtToken}'`);

    try {
      await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${accessToken}`,
        },
        body: body,
      });
    } catch (err) {
      dispatch(setAuthError(err.response));
      dispatch(clearAuthLoading());
      dispatch(clearIsAuthenticated());
    }
  }
};

export const forgotPassword = (formInput) => async (dispatch) => {
  dispatch(clearAuthError());
  dispatch(clearCurrentAccess());
  dispatch(clearAuthSuccessMsg());
  dispatch(clearIsAuthenticated());
  dispatch(setAuthLoading());

  const email = formInput.email;
  const url = `${config.Urls.base}/users/emailId/${email}`;

  try {
    const res = await axios.patch(url, {
      headers: {
        // "x-auth-token": token,
        "Content-Type": "application/json",
      },
    });
  
    if (res.data.statusCode === 200) {
      dispatch(setAuthSuccess(res.data.messages[0]));
    } else {
      dispatch(setAuthError(res.data.messages[0]));
      dispatch(clearAuthLoading());
    }
  } catch (err) {
   
    dispatch(clearAuthLoading());
    dispatch(clearIsAuthenticated());
    dispatch(
      setAuthError(
        err.code === "ERR_NETWORK" ? err.message : err.response.data.messages[0]
      )
    );
  }
};

export const setAuthLoading = () => ({
  type: SET_AUTH_LOADING,
});
export const clearAuthLoading = () => ({
  type: CLEAR_AUTH_LOADING,
});
export const clearAuthSuccessMsg = () => ({
  type: CLEAR_AUTH_SUCCESS,
});
export const setAuthError = (errorMsg) => ({
  type: AUTH_ERROR,
  payload: errorMsg,
});
export const setAuthSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload: payload,
});

export const clearAuthError = () => {
  return {
    type: CLEAR_AUTH_ERROR,
  };
};

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
  };
};
export const setCurrentAccess = (accesstoken) => {
  return {
    type: SET_CURRENT_ACCESS,
    payload: accesstoken,
  };
};
export const clearCurrentAccess = () => {
  return {
    type: CLEAR_CURRENT_ACCESS,
  };
};

export const setIsAuthenticated = () => {
  return {
    type: SET_ISAUTHENTICATED,
  };
};
export const clearIsAuthenticated = () => {
  return {
    type: CLEAR_ISAUTHENTICATED,
  };
};
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
export const logoutUser = () => (dispatch) => {
  dispatch(deleteAuth());
  dispatch(clearCurrentUser());
  dispatch(clearCurrentAccess());
  dispatch(clearIsAuthenticated());
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("accessToken");
};
