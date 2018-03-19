import Mock from 'mockjs';
import api from './api';
import mine from "./mine";

Mock.mock(/getUserInfo/, 'get', api.getUserInfo);
Mock.mock(/listShopEmp/, "post", mine.listShopEmp);

export default Mock