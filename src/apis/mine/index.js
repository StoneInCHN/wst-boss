
import {fetch, post, patch, put} from '../config'

const baseUrl = "/"

const  mine = {

  listShopEmp (params) {
    return post('/shopEmp/listShopEmp', params); //商家送水员信息
  },
  deleteEmp (params) {
    return post('/shopEmp/deleteEmp', params); //商家删除送水员
  },
  getWxByNickName (params) {
    return post('/shopEmp/getWxByNickName', params); //微信昵称获取人信息
  },
  updateEmp (params) {
    return post('/shopEmp/updateEmp', params); //商家新增送水员??没看到有新增接口，只有这个更新接口，将就用了
  },
  getInfo (params) {
    return post('/shop/getInfo', params); // 获取商家信息
  },
  updateInfo (params) {
    return post('/shop/updateInfo', params); //编辑商家信息
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
  },
  genQrPdf (params) {
    console.info("请求【批量生成二维码】接口, 请求参数：", params);
    var url = "http://localhost:8080/wst-boss/shopQrcode/genQrPdf?userId=1&pageSize=5?userId="+params.userId+"&pageSize="+params.pageSize;
    return fetch(url); //批量生成二维码
  }
}

export default mine;