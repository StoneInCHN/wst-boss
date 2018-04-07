
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
  createSeriUser (params) {  	
    return post('/sUser/createSeriUser', params); //用户管理-总编号用户-新建编号用户
  },
  pageShopUsers (params) {  	
    return post('/sUser/pageShopUsers', params); //用户管理-总订单用户（列表）
  },


}

export default user;