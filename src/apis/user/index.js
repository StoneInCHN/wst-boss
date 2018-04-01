
import {fetch, post, patch, put} from '../config'


const  user = {

  summar (params) {  	
    return post('/sUser/summar', params);//用户管理主页
  },
  pageShopUsers (params) {  	
    return post('/sUser/pageShopUsers', params);//用户管理-订单用户列表
  },
  pageSeriUsers (params) {  	
    return post('/sUser/pageSeriUsers', params);//用户管理-查询编号用户
  },  

}

export default user;