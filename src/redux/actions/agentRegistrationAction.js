import config from "../../config/index";
import axios from "axios";
import { createFormData } from "../../components/commons/apiAccessMethods";
import {
  GET_AGENTREGINFO,
  AGENTREG_ERROR,
  FETCH_REGISTRATIONS,
  CLEAR_AGENTREG_ERRORS,
  CLEAR_AGENTREGINFO,
  AGENTREG_SUCCESS,
  CLEAR_AGENTREG_SUCCESS,
  SET_AGENTREG_LOADING,
  CLEAR_AGENTREG_LOADING,
 
} from "../actions/types.js";

export const setNewRegistration = (formInput) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  if (formInput.passportImage) {
    const passportImage = formInput.passportImage[0];
    formInput.passportImage = passportImage;
  }
  if (formInput.paymentProofImage) {
    const paymentProofImage = formInput.paymentProofImage[0];
    formInput.paymentProofImage = paymentProofImage;
  }
  if (formInput.bankStatementImage) {
    const bankStatementImage = formInput.bankStatementImage[0];
    formInput.bankStatementImage = bankStatementImage;
  }
  if (formInput.utilityBillImage) {
    const utilityBillImage = formInput.utilityBillImage[0];
    formInput.utilityBillImage = utilityBillImage;
  }
  if (formInput.agentIdCardImage) {
    const agentIdCardImage = formInput.agentIdCardImage[0];
    formInput.agentIdCardImage = agentIdCardImage;
  }
  if (formInput.selfieImage) {
    const selfieImage = formInput.selfieImage[0];
    formInput.selfieImage = selfieImage;
  }
  if (formInput.guarantorFormImage) {
    const guarantorFormImage = formInput.guarantorFormImage[0];
    formInput.guarantorFormImage = guarantorFormImage;
  }
  if (formInput.guarantorWorkIdCardImage) {
    const guarantorWorkIdCardImage = formInput.guarantorWorkIdCardImage[0];
    formInput.guarantorWorkIdCardImage = guarantorWorkIdCardImage;
  }
  if (formInput.guarantorUtilityBillImage) {
    const guarantorUtilityBillImage = formInput.guarantorUtilityBillImage[0];
    formInput.guarantorUtilityBillImage = guarantorUtilityBillImage;
  }
  if (formInput.guarantorValidIdCardImage) {
    const guarantorValidIdCardImage = formInput.guarantorValidIdCardImage[0];
    formInput.guarantorValidIdCardImage = guarantorValidIdCardImage;
  }
  if (formInput.newShopDetails) {
    const arrusername = [];
    const arrpassword = [];
    for (var i in formInput.newShopDetails) {
      formInput.username = formInput.newShopDetails[i].username;
      formInput.password = formInput.newShopDetails[i].password;
      arrusername.push(formInput.username + "--INDEX");
      arrpassword.push(formInput.password + "--INDEX");
    }
    formInput.shopUsernames = arrusername;
    formInput.shopPasswords = arrpassword;
  }

  try {
    const url = `${config.Urls.base}/registration`;
    const formData = await createFormData(formInput);
    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-Data;boundary=MyBoundary",
      },
    });

    if (res.data.statusCode === 200) {
      dispatch(
        setRegistrationSuccess(
          "Registration submitted successfully.Our Customer relationship Officers will be in touch with you shortly"
        )
      );
    } else {
      dispatch(setRegistrationError(res.data.message));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const fetchRegistrations = (inputData) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  let regUrl;

  switch (inputData.status) {
    case "initiate":
      regUrl = `${config.Urls.base}/registration/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "paymentverification":
    case "accountcreation":
      regUrl = `${config.Urls.base}/manage_registration/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "verified":
      regUrl = `${config.Urls.base}/manage_registration/verified/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "unverified":
      regUrl = `${config.Urls.base}/manage_registration/unverified/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "archive":
      regUrl = `${config.Urls.base}/manage_registration/agentAccountArchive/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    case "search":
      regUrl = `${config.Urls.base}/search_registration/${inputData.searchType}/${inputData.searchData}/page/${inputData.pageno}/page_limit/${inputData.limit}`;

      break;
    default:
      break;
  }

  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      const response = await fetch(`${regUrl}`, {
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
        dispatch(setAgentRegistrations(resData.data));
      } else if (resData && resData.statusCode === 404) {
        dispatch(setAgentRegistrations([]));
      }
    }
  } catch (err) {
    dispatch(setAgentRegistrations([]));
  }
};

export const getRegistrationInfoById = (agentId) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearAgentRegInfo());

  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];

      const url = `${config.Urls.base}/manage_registration/${agentId}`;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      dispatch(setAgentRegInfo(res.data.data.reg[0]));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const updateRegInfo = (formInput) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  dispatch(clearAgentRegInfo());

  const agentId = formInput.agentid;
  if (formInput.newShopDetails) {
    const arrusername = [];
    const arrpassword = [];
    const arrshopdetail = [];
    for (var i in formInput.newShopDetails) {
      formInput.shopname = formInput.newShopDetails[i].shopname;
      formInput.password = formInput.newShopDetails[i].password;
      formInput.shopDetailId = formInput.newShopDetails[i].new_shop_details_id;
      arrusername.push(formInput.shopname + "--INDEX");
      arrpassword.push(formInput.password + "--INDEX");
      arrshopdetail.push(formInput.shopDetailId + "--INDEX");
    }
    formInput.shopUsernames = arrusername;
    formInput.shopPasswords = arrpassword;
    formInput.shopDetailIds = arrshopdetail;
  }

  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];

      const url = `${config.Urls.base}/registration/${agentId}`;
      // const formData = await createFormData(formInput);
      const resData = await axios.patch(url, formInput, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      if (resData.data.statusCode === 200) {
        dispatch(getRegistrationInfoById(agentId));
        dispatch(setRegistrationSuccess(resData.data.messages[0]));
      } else {
        dispatch(clearRegistrationLoading());
        dispatch(setRegistrationError(resData.data.messages[0]));
      }
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const csuDeleteRegistration = (formInput) => async (dispatch) => {
  const agentId = formInput.agentid;
  try {
    if (localStorage.jwtToken) {
      const url = `${config.Urls.base}/registration/${agentId}`;
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      dispatch(setRegistrationLoading());
      dispatch(clearRegistrationError());
      dispatch(clearRegistrationSuccessMsg());
      dispatch(clearAgentRegInfo());

      let res = await axios.delete(url, {
        headers: {
          // "x-auth-token": token,
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      dispatch(setRegistrationSuccess(res.data.messages[0]));
      const loadtable = {
        limit: 10,
        pageno: 1,
        status: "initiate",
      };
      fetchRegistrations(loadtable);
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const csuVerifyAgentPayment = (formInput) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  dispatch(clearAgentRegInfo());
  try {
    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];

      const url = `${config.Urls.base}/manage_registration`;
      let res = await axios.post(url, formInput, {
        headers: {
          // "x-auth-token": token,
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      dispatch(setRegistrationSuccess(res.data.messages[0]));
      dispatch(getRegistrationInfoById(formInput.agentId));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const csuReVerifyPayment = (formInput) => async (dispatch) => {
  const shopVerificationId = formInput.shopVerificationId;

  try {
    if (localStorage.jwtToken) {
      const url = `${config.Urls.base}/manage_registration/shopVerificationId/${shopVerificationId}`;
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      dispatch(setRegistrationLoading());
      dispatch(clearRegistrationError());
      dispatch(clearRegistrationSuccessMsg());
      dispatch(clearAgentRegInfo());

      let res = await axios.patch(url, formInput, {
        headers: {
          // "x-auth-token": token,
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      dispatch(setRegistrationSuccess(res.data.messages[0]));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};

export const accountVerifyPayment = (formInput) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  dispatch(clearAgentRegInfo());
  try {
    // $agentId = formInput.agentId;

    if (localStorage.jwtToken) {
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];

      const url = `${config.Urls.base}/manage_registration/${formInput.agentId}`;
      // const formData = await createFormData(formInput);
      // const formData = JSON.stringify(formInput);
      const res = await axios.patch(url, formInput, {
        headers: {
          // "x-auth-token": token,
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      dispatch(getRegistrationInfoById(formInput.agentId));
      dispatch(setRegistrationSuccess(res.data.messages[0]));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};
export const itAccountUpdate = (formInput) => async (dispatch) => {
  dispatch(setRegistrationLoading());
  dispatch(clearRegistrationError());
  dispatch(clearRegistrationSuccessMsg());
  dispatch(clearAgentRegInfo());
  try {
    if (localStorage.jwtToken) {
      const url = `${config.Urls.base}/manage_registration/${formInput.agentId}`;
      const accessString = localStorage.getItem("accessToken");
      const accessTokenString = accessString.split(`${config.ConcatStr}`);
      const accessToken = accessTokenString[0];
      const res = await axios.patch(url, formInput, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      dispatch(getRegistrationInfoById(formInput.agentId));
      dispatch(setRegistrationSuccess(res.data.messages[0]));
    }
  } catch (err) {
    dispatch(clearRegistrationLoading());
    dispatch(setRegistrationError(err.response.data.messages[0]));
  }
};


export const setRegistrationLoading = () => ({
  type: SET_AGENTREG_LOADING,
});
export const clearRegistrationLoading = () => ({
  type: CLEAR_AGENTREG_LOADING,
});
export const clearRegistrationSuccessMsg = () => ({
  type: CLEAR_AGENTREG_SUCCESS,
});
export const setRegistrationError = (errorMsg) => ({
  type: AGENTREG_ERROR,
  payload: errorMsg,
});
export const setRegistrationSuccess = (successMsg) => ({
  type: AGENTREG_SUCCESS,
  payload: successMsg,
});

export const clearRegistrationError = () => {
  return {
    type: CLEAR_AGENTREG_ERRORS,
  };
};
export const clearAgentRegInfo = () => {
  return {
    type: CLEAR_AGENTREGINFO,
  };
};
export const setAgentRegInfo = (payload) => {
  return {
    type: GET_AGENTREGINFO,
    payload: payload,
  };
};
export const setAgentRegistrations = (data) => {
  return {
    type: FETCH_REGISTRATIONS,
    payload: data,
  };
};
