import { fetch, post, patch, put, lift } from "../config";

const common = {
  auth(params) {
    return lift(post("/common/auth", params));
  },
  jsApiConfig (params) {
    return post('/wx/jsapiConfig', params)
  },
  login (params) {
    return post('/login', params)
  },
  getUserInfo () {
    return fetch('/getUserInfo')
  },
  getCobType(){
    return fetch('/common/cobType')
  },
  getKey(){
    return fetch('/common/getKey')
  },


};

export default common;
