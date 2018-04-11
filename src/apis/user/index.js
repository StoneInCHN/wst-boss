
import {fetch, post, patch, put} from '../config'


const  user = {

  summar (params) {  	
    return post('/sUser/summar', params); //用户管理主页
  },
  pageSeriUsers (params) {  	
    return post('/sUser/pageSeriUsers', params); //用户管理-总编号用户（列表，编号查询）  
  },  
  deleteSeriUser (params) {  	
    return post('/sUser/deleteSeriUser', params); //用户管理-总编号用户-删除编号用户 
  },
  getLastSerialNo (params) {   
    return post('/sUser/getLastSerialNo', params); //用户管理-总编号用户-获取上次用户编号
  },
  createSeriUser (params) {  	
    return post('/sUser/createSeriUser', params); //用户管理-总编号用户-新建编号用户
  },
  editSeriUser (params) {   
    return post('/sUser/editSeriUser', params); //用户管理-总编号用户-修改编号用户
  },  
  pageShopUsers (params) {  	
    return post('/sUser/pageShopUsers', params); //用户管理-总订单用户（列表）
  },
  getGsDdList (params) {    
    return post('/sUser/getGsDdList', params); //用户管理-未添加优惠信息商品选择列表
  },  
  distInfo (params) {    
    return post('/sUser/distInfo', params); //用户管理-用户优惠信息
  },
  saveGsDist (params) {    
    return post('/sUser/saveGsDist', params); //用户管理-保存优惠信息
  },
  lastSO (params) {    
    return post('/sUser/seriUser/lastSO', params); //用户管理-获取上次订单商品
  },  
  getOnGsList (params) {    
    return post('/sGoods/getOnGsList', params); //用户管理-上架商品选择列表
  },  
  addSO (params) {    
    return post('/sorder/addSO', params); //用户管理-商家提交订单
  },   

}

export default user;