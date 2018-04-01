import Mock from 'mockjs';
import api from './api';
import mine from "./mine";

Mock.mock(/getUserInfo/, 'get', api.getUserInfo);
Mock.mock(/listShopEmp/, "post", mine.listShopEmp);//员工列表
Mock.mock(/deleteEmp/, "post", mine.deleteEmp);//删除员工
Mock.mock(/updateEmp/, "post", mine.updateEmp);//新增/更新员工
Mock.mock(/getInfo/, "post", mine.getInfo);//获取商家信息
Mock.mock(/updateInfo/, "post", mine.updateInfo);//获取商家信息
Mock.mock(/finReport/, "post", mine.finReport);//商家收支统计
Mock.mock(/pageFinDetail/, "post", mine.pageFinDetail);//商家收支统计
Mock.mock(/getGList/, "post", mine.getGList);//商品管理列表
Mock.mock(/editGStatus/, "post", mine.editGStatus);//修改商品状态
Mock.mock(/getWBrand/, "post", mine.getWBrand);//获取水品牌
Mock.mock(/getSpec/, "post", mine.getSpec);//获取规格
Mock.mock(/addWG/, "post", mine.addWG);//商家新增商品
Mock.mock(/editWG/, "post", mine.editWG);//商家编辑商品
export default Mock