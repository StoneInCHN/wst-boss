
const simpleSuccess = {
  "code": "0000",
  "desc": "操作成功",
  "msg": null
}
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
      "serialNo": "108,11111",
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
      "contactPhone3": "",
      "id": 2,
      "distCause": null,
      "qrCodeId": 1,
      "contactPhone": "18425578457",
      "createDate": 1517208229000,
      "serialNo": "222",
      "fixPhone":"(028)84572457",
      "fixPhone2":null,
      "fixPhone3":null
    },
    {
      "contactPhone2": "1889645450",
      "addrInfo": "高兴区兴龙湖23434ghao",
      "realName": "习大大",
      "contactPhone3": "",
      "id": 1,
      "distCause": null,
      "qrCodeId": null,
      "contactPhone": "15687745789",
      "createDate": 1517208229000,
      "serialNo": "242",
      "fixPhone":"(028)84572457",
      "fixPhone2":"",
      "fixPhone3":null
    }
  ]
}
const getLastSerialNo = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "lastNo": "333"
  }
}
const getGsDdList = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "distPrice": "12",
      "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
      "gNameSpec": "乐百氏10L",
      "id": 3
    },
    {
      "distPrice": "12",
      "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
      "gNameSpec": "冰川时代12L",
      "id": 4
    },
    {
      "distPrice": "12",
      "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
      "gNameSpec": "冰川时代20L",
      "id": 5
    }
  ]
}
const distInfo = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "distAmount": 12,
      "shopGoods": {
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "distPrice": 15,
        "id": 1,
        "gNameSpec": "冰川时代15L"
      }
    },
    {
      "distAmount": 15,
      "shopGoods": {
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "distPrice": 10,
        "id": 2,
        "gNameSpec": "蓝剑10L"
      }
    }
  ]
}
const lastSO = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "gName": "乐百氏10L",
    "gId": 3,
    "gPic": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
    "gAmount": 20,
    "gCount": 1
  }
}
const getOnGsList = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "distList": {
      "1": 12,
      "2": 15,
      "4": 11,
      "5": 11
    },
    "gList": [
      {
        "distPrice": 15,
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "gNameSpec": "冰川时代15L",
        "id": 1
      },
      {
        "distPrice": 10,
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "gNameSpec": "乐百氏10L",
        "id": 2
      },
      {
        "distPrice": 10,
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "gNameSpec": "蓝剑10L",
        "id": 3
      },
      {
        "distPrice": 15,
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "gNameSpec": "冰川时代12L",
        "id": 4
      },
      {
        "distPrice": 15,
        "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
        "gNameSpec": "冰川时代20L",
        "id": 5
      }
    ]
  }
}
const addSO = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "payType": "COB", //返回的支付方式(水票-WATER_TICKET;货到付款-COB;水票部分抵扣混合-TICKET_COB)
    "cobAmount": 0,  //仍需货到付款金额(支付方式返回混合支付TICKET_COB时显示)
    "id": 20,
    "sn": "408995783115800576"   //订单号
  }
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
  deleteSeriUser: config => {
    console.info("请求【用户管理-删除编号用户】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  getLastSerialNo: config => {
    console.info("请求【用户管理-获取上次用户编号】接口, 请求参数：", config.body);
    return getLastSerialNo;
  },
  createSeriUser: config => {
    console.info("请求【用户管理-新建编号用户】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  editSeriUser: config => {
    console.info("请求【用户管理-修改编号用户】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  getGsDdList: config => {
    console.info("请求【用户管理-未添加优惠信息商品选择列表】接口, 请求参数：", config.body);
    return getGsDdList;
  },  
  distInfo: config => {
    console.info("请求【用户管理-用户优惠信息】接口, 请求参数：", config.body);
    return distInfo;
  },    
  saveGsDist: config => {
    console.info("请求【用户管理-保存优惠信息】接口, 请求参数：", config.body);
    return simpleSuccess;
  },  
  lastSO: config => {
    console.info("请求【用户管理-获取上次订单商品】接口, 请求参数：", config.body);
    return lastSO;
  },  
  getOnGsList: config => {
    console.info("请求【用户管理-上架商品选择列表】接口, 请求参数：", config.body);
    return getOnGsList;
  },
  addSO: config => {
    console.info("请求【用户管理-商家提交订单】接口, 请求参数：", config.body);
    return addSO;
  },
 

};
