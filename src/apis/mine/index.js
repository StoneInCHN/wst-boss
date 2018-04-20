
import {fetch, post, patch, put, lift} from '../config'

const baseUrl = "/"

const  mine = {

  listShopEmp (params) {
    return lift(post('/wst-boss/shopEmp/listShopEmp', params)); //商家送水员信息
  },
  deleteEmp (params) {
    return lift(post('/wst-boss/shopEmp/deleteEmp', params)); //商家删除送水员
  },
  getWxByNickName (params) {
    return lift(post('/wst-boss/shopEmp/getWxByNickName', params)); //微信昵称获取人信息
  },
  updateEmp (params) {
    return lift(post('/wst-boss/shopEmp/updateEmp', params)); //商家新增送水员??没看到有新增接口，只有这个更新接口，将就用了
  },
  getInfo (params) {
    return lift(post('/wst-boss/shop/getInfo', params)); // 获取商家信息
  },
  updateInfo (params) {
    return lift(post('/wst-boss/shop/updateInfo', params)); //编辑商家信息
  },
  finReport (params) {
    return lift(post('/wst-boss/shop/finReport', params)); //商家收支统计
  },
  pageFinDetail (params) {
    return lift(post('/wst-boss/shop/pageFinDetail', params)); //商家收支明细
  },
  getGList (params) {
    return lift(post('/wst-boss/sGoods/getGList', params)); //商品管理列表
  },
  editGStatus (params) {
    return lift(post('/wst-boss/sGoods/editGStatus', params)); //修改商品状态
  },
  getWBrand (params) {
    return lift(post('/wst-boss/sGoods/getWBrand', params)); //获取水品牌
  },
  getSpec (params) {
    return lift(post('/wst-boss/sGoods/getSpec', params)); //获取品牌规格
  },
  addWG (params) {
    return lift(post('/wst-boss/sGoods/addWG', params)); //商家新增商品
  },
  editWG (params) {
    return lift(post('/wst-boss/sGoods/editWG', params)); //商家编辑商品
  },
  genQrPdf (params) {
    console.info("请求【批量生成二维码】接口, 请求参数：", params);
    var url = "/wst-boss/shopQrcode/genQrPdf?userId=1&pageSize=5?userId="+params.userId+"&pageSize="+params.pageSize;
    return fetch(url); //批量生成二维码
  }
}

export default mine;