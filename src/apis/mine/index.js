
import {fetch, post, patch, put} from '../config'

const baseUrl = "/"

const  mine = {

  listShopEmp (params) {
    return post('/shopEmp/listShopEmp', params);
  },
  deleteEmp (params) {
    return post('/shopEmp/deleteEmp', params);
  },
  updateEmp (params) {
    return post('/shopEmp/updateEmp', params);
  },
  getInfo (params) {
    return post('/shop/getInfo', params);
  },
  updateInfo (params) {
    return post('/shop/updateInfo', params);
  },
  finReport (params) {
    return post('/shop/finReport', params); //商家收支统计
  },
  pageFinDetail (params) {
    return post('/shop/pageFinDetail', params); //商家收支明细
  }
  
}

export default mine;