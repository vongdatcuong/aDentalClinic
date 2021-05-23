import figures from "../configs/figures";
import strings from "../configs/strings";
import AuthService from "./authentication/auth.service";

// i18next
import { getI18n } from "react-i18next";

// Toast
import { toast } from "react-toastify";

const BASE_URL_API = "http://localhost:4000/api";
const SOCKET_URL = "http://localhost:4000/";
const secretKey = "The way of Reactjs";

/** REQUEST MODEL
 *  url: string
 *  option (Optional): Object
 *  query: Object (GET)
 *  body: Object (POST)
 */

//INITIALIZE
const initializeAPIService = () => {
  /*const res = AuthService.getToken();
  token = res.token;
  refreshToken = res.refreshToken;*/
};

const parseQueryObject = (queryObj) => {
  let ans = "";
  Object.keys(queryObj).forEach((key, index) => {
    ans += (index === 0 ? "?" : "&") + key + "=" + queryObj[key];
  });
  return ans;
};

//GET METHOD
const httpGet = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        method: "GET",
        ...requestModel.option,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.token,
        },
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              method: "GET",
              ...requestModel.option,
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.token,
              },
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    json.status = response.status;
    return json;
  } catch (e) {
    throw e;
  }
};

//POST METHOD
const httpPost = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        ...requestModel.option,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.token,
        },
        body: JSON.stringify(requestModel.body),
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              ...requestModel.option,
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.token,
              },
              body: JSON.stringify(requestModel.body),
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    json.status = response.status;
    return json;
  } catch (e) {
    throw e;
  }
};

//PUT METHOD
const httpPut = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        ...requestModel.option,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.token,
        },
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              ...requestModel.option,
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.token,
              },
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    json.status = response.status;
    return json;
  } catch (e) {
    throw e;
  }
};

//PATCH METHOD
const httpPatch = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        ...requestModel.option,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.token,
        },
        body: JSON.stringify(requestModel.body),
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              ...requestModel.option,
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.token,
              },
              body: JSON.stringify(requestModel.body),
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    json.status = response.status;
    return json;
  } catch (e) {
    throw e;
  }
};

//DELETE METHOD
const httpDelete = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        ...requestModel.option,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens.token,
        },
        body: JSON.stringify(requestModel.body),
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              ...requestModel.option,
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.token,
              },
              body: JSON.stringify(requestModel.body),
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    json.status = response.status;
    return json;
  } catch (e) {
    throw e;
  }
};

//GET PDF METHOD
const httpGetPdf = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.query = requestModel.query || {};
  requestModel.query.lang =
    requestModel.query.lang || getI18n()?.language || "en";
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(
      BASE_URL_API + requestModel.url + parseQueryObject(requestModel.query),
      {
        method: "GET",
        ...requestModel.option,
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + tokens.token,
        },
      }
    );
    if (response.status === figures.apiStatus.unauthorized) {
      if (await AuthService.refreshToken()) {
        try {
          tokens = AuthService.getToken();
          response = await fetch(
            BASE_URL_API +
              requestModel.url +
              parseQueryObject(requestModel.query),
            {
              method: "GET",
              ...requestModel.option,
              headers: {
                "Content-Type": "application/pdf",
                Authorization: "Bearer " + tokens.token,
              },
            }
          );
        } catch (err) {
          throw err;
        }
      } else {
        toast.error(strings.refreshTokenFailMsg);
        AuthService.logOut();
        window.location.reload();
      }
    }
    return response;
  } catch (e) {
    throw e;
  }
};

export {
  secretKey,
  initializeAPIService,
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
  httpGetPdf,
};

export default {
  BASE_URL_API,
  SOCKET_URL,
  secretKey,
  initializeAPIService,
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
  httpGetPdf,
};
