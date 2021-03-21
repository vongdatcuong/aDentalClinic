import {secretKey, initializeAPIService, httpPost} from '../base-api';
import aes from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import apiPath from '../path';
import strings from '../../configs/strings';

// Toast
import {toast} from 'react-toastify';

let user = null;

class AuthService {
  async logIn(username, password) {
    try {
      const data = {
        username: username,
        password: password,
      };
      const result = await httpPost({
        url: apiPath.authorization.authorization + apiPath.authorization.logIn,
        option: {},
        body: data
      });
      if (result.success){
        user = result.user;
        localStorage.setItem("user", aes.encrypt(JSON.stringify(result.user), secretKey));
        localStorage.setItem("token", aes.encrypt(result.token, secretKey));
        localStorage.setItem("refreshToken", aes.encrypt(result.refreshToken, secretKey));
        localStorage.setItem("expirationTime", aes.encrypt(result.expirationTime, secretKey));
        localStorage.setItem("expirationRefreshTime", aes.encrypt(result.expirationRefreshTime, secretKey));
      }
      return result;
    } catch (err) {
      user = null;
      return {
        success: false,
        message: strings.logInFailMsg
      };
    }
  }

  async isAuthenticated() {
    // Check expiration time
    const now = new Date();
    let expirationTime = aes.decrypt(localStorage.getItem("expirationTime") || "", secretKey).toString(CryptoENC);
    if (!expirationTime){
      this.logOut();
      return false;
    }
    expirationTime = new Date(expirationTime);
    if (expirationTime > now){
      return true;
    } else {
      // Check refresh expiration
      if (await this.refreshToken(now)){
        return true;
      } else {
        this.logOut();
        return false;
      }
    }
  }

  async refreshToken(now){
    now = now || new Date();
    let expirationRefreshTime = aes.decrypt(localStorage.getItem("expirationRefreshTime") || "", secretKey).toString(CryptoENC);
    if (!expirationRefreshTime){
      return false;
    }
    expirationRefreshTime = new Date(expirationRefreshTime);
    if (expirationRefreshTime > now){
      let refreshToken = aes.decrypt(localStorage.getItem("refreshToken") || "", secretKey).toString(CryptoENC);
      if (!refreshToken){
        return false;
      }
      // Get new token
      const data = {
        refreshToken: refreshToken          
      };
      try {
        const result = await httpPost({
          url: apiPath.authorization.authorization + apiPath.authorization.refreshToken,
          option: {},
          body: data
        });
        if (result.success){
          localStorage.setItem("token", aes.encrypt(result.token, secretKey));
          localStorage.setItem("expirationTime", aes.encrypt(result.expirationTime, secretKey));
          return true;
        }
        toast.error(result.message)
        return false;
      } catch(err){
        toast.error(strings.refreshTokenFailMsg);
        return false;
      }
    } else {
      return false;
    }
  }

  logOut() {
    user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("expirationRefreshTime");
  }

  getCurrentUser() {
    if (user){
      return user;
    }
    let userS = localStorage.getItem("user");
    if (!userS){
      return {};
    }
    userS = JSON.parse(aes.decrypt(userS, secretKey).toString(CryptoENC));
    if (Boolean(userS.username)){
      user = userS;
      return user;
    }
    return {};
  }

  getToken(){
    return {
      token: aes.decrypt(localStorage.getItem("token") || "", secretKey).toString(CryptoENC),
      refreshToken: aes.decrypt(localStorage.getItem("refreshToken") || "", secretKey).toString(CryptoENC),
    }
  }

  updateCurrentUser(newUser) {
    const userS = Object.assign(
      {},
      JSON.parse(localStorage.getItem("user")),
      newUser
    );
    user = userS;
    localStorage.removeItem("user");
    localStorage.setItem("user", aes.encrypt(JSON.stringify(userS), secretKey));
  }
}

export default new AuthService();
