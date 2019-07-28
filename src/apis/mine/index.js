import { fetch, post, patch, put, lift } from "../config";

const mine = {
  listShopEmp(params) {
    return lift(post("/shopEmp/listShopEmp", params)); //商家送水员信息
  },
  deleteEmp(params) {
    return lift(post("/shopEmp/delEmp", params)); //商家删除送水员
  },
  getWxByNickName(params) {
    return lift(post("/shopEmp/getWxByNickName", params)); //微信昵称获取人信息
  },
  updateEmp(params) {
    return lift(post("/shopEmp/updateEmp", params)); //商家新增送水员??没看到有新增接口，只有这个更新接口，将就用了
  },
  getInfo(params) {
    return lift(post("/shop/getInfo", params)); // 获取商家信息
  },
  updateInfo(params) {
    return lift(post("/shop/updateInfo", params)); //编辑商家信息
  },
  finReport(params) {
    return lift(post("/shop/finReport", params)); //商家收支统计
  },
  pageFinDetail(params) {
    return lift(post("/shop/pageFinDetail", params)); //商家收支明细
  },
  getGList(params) {
    return lift(post("/sGoods/getGList", params)); //商品管理列表
  },
  editGStatus(params) {
    return lift(post("/sGoods/editGStatus", params)); //修改商品状态
  },
  getWBrand(params) {
    return lift(post("/sGoods/getWBrand", params)); //获取水品牌
  },
  getSpec(params) {
    return lift(post("/sGoods/getWBrandSpec", params)); //获取品牌规格
  },
  addWG(params) {
    return lift(post("/sGoods/addWG", params)); //商家新增商品
  },
  editWG(params) {
    return lift(post("/sGoods/editGPrice", params)); //商家编辑商品
  },
  //http://test.yeager.vip/wst-boss/shopQrcode/getQrPdfUrl?userId=1&pageSize=2
  getQrPdfUrl(params) {
    //return fetch('/shopQrcode/getQrPdfUrl?userId='+params.userId+'&pageSize='+params.pageSize); //批量生成二维码
    return post("/shopQrcode/getQrPdfUrl", params); //批量生成二维码
  },
  updatePwd(params) {
    return post("/seller/sweb/updatePwd", params);
  },
  getCntOrder(params) {
    return lift(post("/sorder/cntOrders", params));
  }

  
};

export default mine;
