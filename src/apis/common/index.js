import { fetch, post, patch, put, lift, postByForm } from "../config";
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from "constants";

const common = {
  auth(params) {
    return lift(post("/common/auth", params));
  },
  jsApiConfig(params) {
    return post("/common/wx/jsapiConfig", params);
  },
  wxAuth(params) {
    return fetch("/common/wx/auth/0", params);
  },
  wxAuthToken(params) {
    return lift(post("/common/wx/authToken", params));
  },
  getUserInfo() {
    return fetch("/getUserInfo");
  },
  getCobType() {
    return lift(post("/common/cobType"));
  },
  getKey() {
    return fetch("/common/getKey");
  },
  //图片上传
  uploadImg(params) {
    return postByForm("/common/uploadImg", params);
  },
  //商家注册
  regSeller(params) {
    return lift(post("/shop/regSeller", params));
  },
  getOpenId(params) {
    return lift(post("/common/wx/getOpenId", params));
  }
};

export default common;
