import { fetch, post, patch, put, lift } from "../config";

const common = {
  auth(params) {
    return lift(post("/wst-boss/common/auth", params));
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
