import Mock from "mockjs";
import api from "./api";
import mine from "./mine";
import user from "./user";
import order from "./order";

Mock.mock(/getUserInfo/, "get", api.getUserInfo);
//我的>>
//管理-->商品管理	
Mock.mock(/getGList/, "post", mine.getGList); //商品列表	
Mock.mock(/editGStatus/, "post", mine.editGStatus); //修改商品状态(上架，下架，删除)	
Mock.mock(/getWBrand/, "post", mine.getWBrand); //添加/编辑商品页面-->获取水品牌（entityId品牌ID为null）/获取子产品（entityId品牌ID必填）	
Mock.mock(/getSpec/, "post", mine.getSpec); //添加/编辑商品页面-->获取规格	
Mock.mock(/addWG/, "post", mine.addWG); //添加/编辑商品页面-->新增商品	
Mock.mock(/editWG/, "post", mine.editWG); //添加/编辑商品页面-->编辑商品	
//管理-->员工管理	
Mock.mock(/listShopEmp/, "post", mine.listShopEmp); //员工列表
Mock.mock(/deleteEmp/, "post", mine.deleteEmp); //删除员工
Mock.mock(/getWxByNickName/, "post", mine.getWxByNickName); //添加员工-->搜索 微信昵称获取人信息	
Mock.mock(/updateEmp/, "post", mine.updateEmp); //添加/更新员工
//管理-->店铺管理
Mock.mock(/getInfo/, "post", mine.getInfo); //获取商家(店铺)信息	
Mock.mock(/updateInfo/, "post", mine.updateInfo); //更新商家(店铺)信息	
//管理-->二维码管理	
Mock.mock(/genQrPdf/, "get");//批量生成二维码	
//统计	
Mock.mock(/finReport/, "post", mine.finReport); //商家收支统计
Mock.mock(/pageFinDetail/, "post", mine.pageFinDetail); //商家收支统计

//用户>>
Mock.mock(/summar/, "post", user.summar); //用户管理-主页
Mock.mock(/pageSeriUsers/, "post", user.pageSeriUsers); //用户管理-总编号用户（列表，编号查询）	
Mock.mock(/deleteSeriUser/, "post", user.deleteSeriUser); //用户管理-总编号用户-删除编号用户
Mock.mock(/getLastSerialNo/, "post", user.getLastSerialNo); //用户管理-总编号用户-获取上次用户编号
Mock.mock(/createSeriUser/, "post", user.createSeriUser); //用户管理-总编号用户-新建编号用户	
Mock.mock(/editSeriUser/, "post", user.editSeriUser); //用户管理-总编号用户-修改编号用户	
Mock.mock(/pageShopUsers/, "post", user.pageShopUsers); //用户管理-总订单用户（列表）	
Mock.mock(/getGsDdList/, "post", user.getGsDdList); //用户管理-未添加优惠信息商品选择列表
Mock.mock(/distInfo/, "post", user.distInfo); //用户管理-用户优惠信息
Mock.mock(/saveGsDist/, "post", user.saveGsDist); //用户管理-保存优惠信息
Mock.mock(/lastSO/, "post", user.lastSO); //用户管理-获取上次订单商品
Mock.mock(/getOnGsList/, "post", user.getOnGsList); //用户管理-上架商品选择列表
Mock.mock(/addSO/, "post", user.addSO); //用户管理-商家提交订单

//订单
Mock.mock(/pageShopOrders/, "post", order.pageShopOrders); //商家订单信息
Mock.mock(/oprSO/, "post", order.oprSO); //商家操作订单s

export default Mock;
