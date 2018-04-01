
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
  },
  getGList (params) {
    return post('/sGoods/getGList', params); //商品管理列表
  },
  editGStatus (params) {
    return post('/sGoods/editGStatus', params); //修改商品状态
  },
  getWBrand (params) {
    return post('/sGoods/getWBrand', params); //获取水品牌
  },
  getSpec (params) {
    return post('/sGoods/getSpec', params); //获取品牌规格
  },
  addWG (params) {
    return post('/sGoods/addWG', params); //商家新增商品
  },
  editWG (params) {
    return post('/sGoods/editWG', params); //商家编辑商品
  } 
}

export default mine;