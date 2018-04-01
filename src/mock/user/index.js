
const userSummar = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "tOrderCount": 22,   //总订单数
    "tOrderUserCount": 44,  //总订单用户数
    "mSeriUserCount": 33,   //本月新增编号用户数
    "tOrderAmount": 110,   //总订单金额
    "tSeriUserCount": 55    //总编号用户数
  }
};


const simpleSuccess = {
  "code": "0000",
  "desc": "操作成功",
  "msg": null
}
const pageShopUsers = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "id": 1,
      "addr": {
        "contactName": "李先森",
        "fullAddr": "金南园1202"
      },
      "createDate": 1517208229000,
      "serialNo": "108",
      "cellPhoneNum": "15892999217"
    },
    {
      "id": 2,
      "addr": {
        "contactName": "李先森",
        "fullAddr": "金南园1202"
      },
      "createDate": 1517208229000,
      "serialNo": "108,111",
      "cellPhoneNum": "15892999217"
    }
  ]
}
const pageSeriUsers={
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "contactPhone2": "1589645454",
      "addrInfo": "天府新区兴龙湖123栋1209",
      "realName": "王文武",
      "contactPhone3": null,
      "id": 2,
      "distCause": null,
      "qrCodeId": null,
      "contactPhone": "12345698",
      "createDate": 1517208229000,
      "serialNo": "222"
    }
  ]
}


export default {
  summar: config => {
    console.info("请求【用户管理-主页】接口, 请求参数：", config.body);
    return userSummar;
  },
  pageShopUsers: config => {
    console.info("请求【用户管理-订单用户列表】接口, 请求参数：", config.body);

    return pageShopUsers;
  },
  pageSeriUsers: config => {
    console.info("请求【用户管理-查询编号用户】接口, 请求参数：", config.body);

    return pageSeriUsers;
  },

};
