import config from "../../config";

import {
  GET_USERS,
  USER_ERROR,
  CLEAR_USERS,
  DELETE_USER,
  GET_USER_ROLE,
  CLEAR_USER_ERROR,
  USER_SUCCESS,
  CLEAR_USER_SUCCESS,
  SET_USER_LOADING,
  CLEAR_USER_LOADING,
} from "./types";

export const getAllUser = () => async (dispatch) => {
  dispatch(setUserLoading());
  dispatch(clearUsers());
  // dispatch(clearUserSuccessMsg());
  try {
    const url = `${config.Urls.base}/users`;
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const resData = await res.json();
   
    if (resData.statusCode === 200) {
      dispatch(clearUserLoading());
      dispatch(setUsers(resData.data.users));
    }
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.messages[0],
    });
    dispatch(clearUserLoading());
  }
};
export const getUserRoles = () => async (dispatch) => {
  try {
    const url = `${config.Urls.base}/userRole`;
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const resData = await res.json();

    if (resData.statusCode === 200) {
      dispatch({
        type: GET_USER_ROLE,
        payload: resData.data.userRole,
      });
    } else {
      dispatch({
        type: USER_ERROR,
        payload: resData.messages[0],
      });
    }
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.data.messages[0],
    });
  }
};

export const setNewUser = (formInput) => async (dispatch) => {
  dispatch(setUserLoading());
  dispatch(clearUserError());
  dispatch(clearUserSuccessMsg());
  try {
    const url = `${config.Urls.base}/users`;
    const body = JSON.stringify(formInput);
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });
    const data = await res.json();

    if (data.statusCode === 200) {
      dispatch(getAllUser());
      dispatch(setUserSuccess("Record successfully added"));
    } else {
      dispatch(clearUserLoading());
      dispatch(setUserError(data.messages[0]));
    }
  } catch (err) {
    dispatch(clearUserLoading());
    dispatch(setUserError(err.response.data.messages[0]));
  }
};

export const updateUser = (formInput, userId) => async (dispatch) => {
  formInput.roleId = parseInt(formInput.roleId);
  dispatch(setUserLoading());
  dispatch(clearUserError());
  dispatch(clearUserSuccessMsg());

  try {
    const url = `${config.Urls.base}/users/${userId}`;
    const body = JSON.stringify(formInput);
    const res = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });
    const data = await res.json();

    if (data.statusCode === 200) {
      await dispatch(getAllUser());
      dispatch(setUserSuccess("Record successfully updated"));
    } else {
      dispatch(clearUserLoading());
      dispatch(setUserError(data.messages[0]));
    }
  } catch (err) {
    dispatch(clearUserLoading());
    dispatch(setUserError(err.response.data.messages[0]));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(setUserLoading());
  dispatch(clearUserError());
  dispatch(clearUserSuccessMsg());
  const url = `${config.Urls.base}/users/${userId}`;
  const res = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();

  if (data.statusCode === 200) {
    dispatch({
      type: DELETE_USER,
      payload: userId,
    });

    dispatch(setUserSuccess(data.messages[0]));
  } else {
    dispatch(clearUserLoading());
    dispatch(setUserError(data.messages[0]));
  }
};

export const setUserLoading = () => ({
  type: SET_USER_LOADING,
});

export const clearUserLoading = () => ({
  type: CLEAR_USER_LOADING,
});

export const clearUserSuccessMsg = () => ({
  type: CLEAR_USER_SUCCESS,
});

export const setUserError = (errorMsg) => ({
  type: USER_ERROR,
  payload: errorMsg,
});

export const setUserSuccess = (successMsg) => ({
  type: USER_SUCCESS,
  payload: successMsg,
});

export const clearUserError = () => {
  return {
    type: CLEAR_USER_ERROR,
  };
};

export const clearUsers = () => {
  return {
    type: CLEAR_USERS,
  };
};

export const setUsers = (data) => {
  return {
    type: GET_USERS,
    payload: data,
  };
};
