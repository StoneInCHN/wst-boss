
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

const getInfo = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "bussBeginTime": "09:00",
    "shopName": "红魔曼联",
    "id": 1,
    "bussEndTime": "19:00",
    "mobilePhoneNum": "15863254259",
    "status": "ACTIVED",
    "telphoneNum": null,
    "notice": "宾川时代涨价了"
  }
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
  },
  getInfo: config => {
    console.info("获取商家信息", config.body);
    return getInfo;
  },
  updateInfo: config => {
    console.info("编辑商家信息", config.body);
    return simpleSuccess;
  },
};
