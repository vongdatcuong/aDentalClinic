import figures from '../configs/figures';
import AuthService from './authentication/auth.service';


const BASE_URL_API = "http://localhost:4000/api";
const secretKey = "The way of Reactjs";


/** REQUEST MODEL
 *  url: string
 *  option (Optional): Object
 *  body: Object
 */

//INITIALIZE
const initializeAPIService = () => {
  /*const res = AuthService.getToken();
  token = res.token;
  refreshToken = res.refreshToken;*/
};

//GET METHOD
const httpGet = async (requestModel) => {
  requestModel = requestModel || {};
  requestModel.url = requestModel.url || "";
  requestModel.option = requestModel.option || {};
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(BASE_URL_API + requestModel.url, {
      method: "GET",
      ...requestModel.option,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.token,
      },
    });
    if (response.status === figures.apiStatus.unauthorized){
      if (await AuthService.refreshToken()){
        try {
          tokens = AuthService.getToken();
          response = await fetch(BASE_URL_API + requestModel.url, {
            method: "GET",
            ...requestModel.option,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokens.token,
            },
          });
        } catch(err){
          throw err;
        }
      } else {
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
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
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(BASE_URL_API + requestModel.url, {
      ...requestModel.option,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.token,
      },
      body: JSON.stringify(requestModel.body),
    });
    if (response.status === figures.apiStatus.unauthorized){
      if (await AuthService.refreshToken()){
        try {
          tokens = AuthService.getToken();
          response = await fetch(BASE_URL_API + requestModel.url, {
            ...requestModel.option,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokens.token,
            },
            body: JSON.stringify(requestModel.body),
          });
        } catch(err){
          throw err;
        }
      } else {
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
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
  requestModel.body = requestModel.body || {};
  let tokens = AuthService.getToken();
  try {
    let response = await fetch(BASE_URL_API + requestModel.url, {
      ...requestModel.option,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokens.token,
      },
    });
    if (response.status === figures.apiStatus.unauthorized){
      if (await AuthService.refreshToken()){
        try {
          tokens = AuthService.getToken();
          response = await fetch(BASE_URL_API + requestModel.url, {
            ...requestModel.option,
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + tokens.token,
            },
          });
        } catch(err){
          throw err;
        }
      } else {
        AuthService.logOut();
        window.location.reload();
      }
    }
    const json = await response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export { secretKey, initializeAPIService, httpGet, httpPost, httpPut };
export default {
  secretKey,
  initializeAPIService,
  httpGet,
  httpPost,
  httpPut
}
