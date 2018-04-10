import { fetch, post, patch, put } from "../config";

const common = {
  auth(params) {
    return post("/common/auth", params);
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
  }
};

export default common;
