
const listShopEmp = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "realName": "王五",
      "id": 1,
      "wechatAcct": "111111@qq.com",
      "cellPhoneNum": "18487759620"
    },
    {
      "realName": "李四",
      "id": 2,
      "wechatAcct": "monkey",
      "cellPhoneNum": "15085547847"
    }
  ]
};

const simpleSuccess = {
  "code": "0000",
  "desc": "操作成功",
  "msg": null
}


export default {
  listShopEmp: config => {
    console.info("员工列表", config.body);
    return listShopEmp;
  },
  deleteEmp: config => {
    console.info("删除员工", config.body);
    return simpleSuccess;
  },
  updateEmp: config => {
    console.info("新增/更新员工", config.body);
    return simpleSuccess;
  }
  
};
