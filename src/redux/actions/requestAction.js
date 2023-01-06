import config from "../../config/index";
import axios from "axios";
import { createFormData } from "../../components/commons/apiAccessMethods";
import {
  REQUEST_ERROR,
  GET_CATEGORY,
  CLEAR_REQUEST_ERRORS,
  REQUEST_SUCCESS,
  CLEAR_REQUEST_SUCCESS,
  SET_REQUEST_LOADING,
  CLEAR_REQUEST_LOADING,
  GET_REQUEST,
} from "../actions/types.js";

export const fetchRequest = (inputData) => async (dispatch) => {
  dispatch(setRequestLoading());
  dispatch(clearRequestError());
  dispatch(clearRequestSuccessMsg());
  let requestUrl;
  switch (inputData.status) {
    case "all":
      requestUrl = `${config.Urls.base}/requests/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "resolved":
      requestUrl = `${config.Urls.base}/requests/resolved/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "unresolved":
      requestUrl = `${config.Urls.base}/requests/unresolved/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "update":
      requestUrl = `${config.Urls.base}/requests/new/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "search":
      requestUrl = `${
        config.Urls.base
      }/requests/category/${`${inputData.category}`}/status/${
        inputData.resolutionstatus
      }/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    default:
      break;
  }

  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      const response = await fetch(`${requestUrl}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${accessToken}`,
        },
      });
      const resData = await response.json();

      if (resData && resData.statusCode === 200) {
        dispatch(getRequest(resData.data));
      } else if (resData && resData.statusCode === 404) {
        dispatch(getRequest([]));
      }
    }
  } catch (err) {
    dispatch(getRequest([]));
  }
};

export const setNewRequest = (formInput) => async (dispatch) => {
  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      const url = `${config.Urls.base}/requests`;
      dispatch(setRequestLoading());
      dispatch(clearRequestError());
      dispatch(clearRequestSuccessMsg());

      if (formInput.fileImage) {
        const fileImage = formInput.fileImage[0];
        formInput.fileImage = fileImage;
      }
      if (formInput.shopIndoorImage) {
        const shopIndoorImage = formInput.shopIndoorImage[0];
        formInput.shopIndoorImage = shopIndoorImage;
      }
      if (formInput.shopOutdoorImage) {
        const shopOutdoorImage = formInput.shopOutdoorImage[0];
        formInput.shopOutdoorImage = shopOutdoorImage;
      }
      const formData = await createFormData(formInput);

      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      if (res.data.statusCode === 200) {
        dispatch(setRequestSuccess("Request submitted successfully"));
      } else {
        dispatch(setRequestError(res.data.messages));
      }
    }
  } catch (err) {
    dispatch(setRequestError(err.response.data.messages[0]));
    dispatch(clearRequestLoading());
  }
};

export const updateRequest = (formInput, requestId) => async (dispatch) => {
  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      const url = `${config.Urls.base}/requests/${requestId}`;
      dispatch(setRequestLoading());
      dispatch(clearRequestError());
      dispatch(clearRequestSuccessMsg());

      const res = await axios.patch(url, formInput, {
        headers: {
          // "x-auth-token": token,
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      if (res.data.statusCode === 200) {
        dispatch(setRequestSuccess("Request updated successfully"));
      } else {
        dispatch(setRequestError(res.data.messages));
      }
    }
  } catch (err) {
    dispatch(clearRequestLoading());
    dispatch(setRequestError(err.response.data.messages[0]));
  }
};
export const getCategory = () => async (dispatch) => {
  try {
    const url = `${config.Urls.base}/category`;
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const resData = await res.json();
    dispatch({
      type: GET_CATEGORY,
      payload: resData.data.categoryInfo,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: err.response.data.messages[0],
    });
  }
};

export const setRequestLoading = () => ({
  type: SET_REQUEST_LOADING,
});
export const clearRequestLoading = () => ({
  type: CLEAR_REQUEST_LOADING,
});
export const clearRequestSuccessMsg = () => ({
  type: CLEAR_REQUEST_SUCCESS,
});
export const setRequestError = (errorMsg) => ({
  type: REQUEST_ERROR,
  payload: errorMsg,
});
export const setRequestSuccess = (successMsg) => ({
  type: REQUEST_SUCCESS,
  payload: successMsg,
});

export const clearRequestError = () => {
  return {
    type: CLEAR_REQUEST_ERRORS,
  };
};

export const getRequest = (data) => {
  return {
    type: GET_REQUEST,
    payload: data,
  };
};
