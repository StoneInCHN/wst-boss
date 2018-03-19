
import {fetch, post, patch, put} from '../config'

const baseUrl = "/"

const  mine = {

  listShopEmp (params) {
    return post('/shopEmp/listShopEmp', params)
  }  

}

export default mine;