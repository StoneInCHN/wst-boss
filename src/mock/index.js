import Mock from 'mockjs';
import api from './api';
import mine from "./mine";

Mock.mock(/getUserInfo/, 'get', api.getUserInfo);
Mock.mock(/listShopEmp/, "post", mine.listShopEmp);//员工列表
Mock.mock(/deleteEmp/, "post", mine.deleteEmp);//删除员工

export default Mock