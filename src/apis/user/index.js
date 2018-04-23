
import {fetch, post, patch, put, lift} from '../config'


const  user = {

  summary (params) {    
    return lift(post('/sUser/summary', params)); //用户管理主页
  },
  pageSeriUsers (params) {    
    return lift(post('/sUser/pageSeriUsers', params)); //用户管理-总编号用户（列表，编号查询）  
  },  
  deleteSeriUser (params) {   
    return lift(post('/sUser/delSeriUser', params)); //用户管理-总编号用户-删除编号用户 
  },
  getLastSerialNo (params) {   
    return lift(post('/sUser/getLastSerialNo', params)); //用户管理-总编号用户-获取上次用户编号
  },
  createSeriUser (params) {   
    return lift(post('/sUser/createSeriUser', params)); //用户管理-总编号用户-新建编号用户
  },
  editSeriUser (params) {   
    return lift(post('/sUser/editSeriUser', params)); //用户管理-总编号用户-修改编号用户
  },  
  pageShopUsers (params) {    
    return lift(post('/sUser/pageShopUsers', params)); //用户管理-总订单用户（列表）
  },
  getGsDdList (params) {    
    return lift(post('/sUser/getGsDdList', params)); //用户管理-未添加优惠信息商品选择列表
  },  
  distInfo (params) {    
    return lift(post('/sUser/distInfo', params)); //用户管理-用户优惠信息
  },
  saveGsDist (params) {    
    return lift(post('/sUser/saveGsDist', params)); //用户管理-保存优惠信息
  },
  lastSO (params) {    
    return lift(post('/sorder/seriUser/lastSO', params)); //用户管理-获取上次订单商品
  },  
  getOnGsList (params) {    
    return lift(post('/sGoods/getOnGsList', params)); //用户管理-上架商品选择列表
  },  
  addSO (params) {    
    return lift(post('/sorder/seriUser/addSO', params)); //用户管理-商家提交订单
  },   

}

export default user;