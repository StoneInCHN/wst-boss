import { fetch, post, patch, put, lift, postByForm } from "../config";

const common = {
  auth(params) {
    return lift(post("/common/auth", params));
  },
  jsApiConfig (params) {
    return post('/common/wx/jsapiConfig', params)
  },
  wxAuth (params) {
    return fetch('/common/wx/auth/0', params)
  },
  wxAuthToken(params) {
    return lift(post("/common/wx/authToken", params));
  },  
  getUserInfo () {
    return fetch('/getUserInfo')
  },
  getCobType(){
    return lift(post('/common/cobType'))
  },
  getKey(){
    return fetch('/common/getKey')
  },
  //图片上传
  uploadImg(params){
    return postByForm('/common/uploadImg', params)
  },
  //商家注册
  regSeller(params){
    return lift(post("/shop/regSeller",params))
  }
};

export default common;
