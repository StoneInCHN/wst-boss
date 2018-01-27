
import {fetch, post, patch, put} from './config'

const baseUrl = "/"

export default{

  login (params) {
    return post('/login', params)
  },
  getUserInfo (params) {
    return fetch('/getUserInfo', params)
  }

}