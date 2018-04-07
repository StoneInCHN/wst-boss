
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

const getWxByNickName = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "headImgUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
      "subscribeTime": null,
      "openId": "dfdfdf",
      "sex": null,
      "nickname": "aaaa",
      "id": 1
    },
    {
      "headImgUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
      "subscribeTime": null,
      "openId": "11111111111f",
      "sex": null,
      "nickname": "bbbb",
      "id": 2
    }
  ]
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
    "notice": "冰川时代涨价了"
  }
}

const finReport = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "dayEmpExp": 100,
    "totalIncome": 200,
    "monIncome": 23.89,
    "monEmpExp": 67.00,
    "dayIncome": 23.99,
    "totalEmpExp": 100
  }
}

var allDetail = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "addrInfo": "天府新区华阳街道22号1000楼",
      "empId": null,
      "amount": "12",
      "payType": "ALIPAY",
      "ym": "2018-3",
      "empName": null,
      "id": 1,
      "type": "INCOME",
      "createDate": 1517208229000
    },
    {
      "addrInfo": "天府新区华阳和平街街道22号",
      "empId": 1,
      "amount": "5",
      "payType": null,
      "ym": "2018-3",
      "empName": "王五",
      "id": 2,
      "type": "OUTCOME",
      "createDate": 1517208229000
    },
    {
      "addrInfo": "天府新区华阳街道22号",
      "empId": 1,
      "amount": "5",
      "payType": null,
      "ym": "2018-2",
      "empName": "王五",
      "id": 3,
      "type": "OUTCOME",
      "createDate": 1517208229000
    }
  ]
}
var incomeDetail = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [
    {
      "addrInfo": "天府新区华阳街道22号1000楼",
      "empId": null,
      "amount": "12",
      "payType": "ALIPAY",
      "ym": "2018-3",
      "empName": null,
      "id": 1,
      "type": "INCOME",
      "createDate": 1517208229000
    }
  ]
}
var outcomeDetail = {
  "code": "0000",
  "desc": "操作成功",
  "msg": [{
      "addrInfo": "天府新区华阳和平街街道22号",
      "empId": 1,
      "amount": "5",
      "payType": null,
      "ym": "2018-3",
      "empName": "王五",
      "id": 2,
      "type": "OUTCOME",
      "createDate": 1517208229000
    },
    {
      "addrInfo": "天府新区华阳街道22号",
      "empId": 1,
      "amount": "5",
      "payType": null,
      "ym": "2018-2",
      "empName": "王五",
      "id": 3,
      "type": "OUTCOME",
      "createDate": 1517208229000
    }
  ]
}
const getGList = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "gList": [
      {
        "brandName": "蓝剑",
        "brandId": "1",
        "gInfo": [
          {
            "gSpec": "15L",
            "distPrice": 15,
            "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "gName": "冰川时代",
            "brandId": 1,
            "id": 1,
            "originPrice": 16,
            "gStatus": "ON",
            "gDeposit": null
          },
          {
            "gSpec": "10L",
            "distPrice": 10,
            "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "gName": "蓝剑",
            "brandId": 1,
            "id": 2,
            "originPrice": 10,
            "gStatus": "OFF",
            "gDeposit": null
          }
        ]
      },
      {
        "brandName": "乐百氏",
        "brandId": "2",
        "gInfo": [
          {
            "gSpec": "10L",
            "distPrice": 10,
            "picUrl": "//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
            "gName": "乐百氏",
            "brandId": 2,
            "id": 3,
            "originPrice": 10,
            "gStatus": "ON",
            "gDeposit": null
          }
        ]
      }
    ]
  }
}
const allBrands = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "brands": [
      {
        "name": "蓝剑",
        "id": 14
      },
      {
        "name": "农夫山泉",
        "id": 15
      }
    ]
  }
}
const allGoodsName = {
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "brands": [
      {
        "name": "冰川时代1",
        "id": 14
      },
      {
        "name": "蓝剑矿泉水",
        "id": 15
      }
    ]
  }
}
const getSpec={
  "code": "0000",
  "desc": "操作成功",
  "msg": {
    "specs": [
      {
        "picUrl": "/path/11.jpg",
        "unit": "L",
        "specValue": 15,
        "id": 2
      },
      {
        "picUrl": "/path/11.jpg",
        "unit": "L",
        "specValue": 20,
        "id": 3
      }
    ]
  }
}

export default {
  listShopEmp: config => {
    console.info("请求【员工列表】接口, 请求参数：", config.body);
    return listShopEmp;
  },
  deleteEmp: config => {
    console.info("请求【删除员工】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  getWxByNickName: config => {
    console.info("请求【微信昵称获取人信息】接口, 请求参数：", config.body);
    return getWxByNickName;
  },
  updateEmp: config => {
    console.info("请求【新增/更新员工】接口, 请求参数：", config.body); //好像没有新增接口？？
    return simpleSuccess;
  },
  getInfo: config => {
    console.info("请求【获取商家信息】接口, 请求参数：", config.body);
    return getInfo;
  },
  updateInfo: config => {
    console.info("请求【编辑商家信息】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  finReport: config => {
    console.info("请求【商家收支统计】接口, 请求参数：", config.body);
    return finReport;
  },
  pageFinDetail: config => {
    console.info("请求【商家收支明细】接口, 请求参数：", config.body);
    var list = [];
    var req = eval('(' + config.body + ')');
    if(req.bType == null){
        return allDetail;
      }else{
        if(req.bType == 'INCOME' ){
          return incomeDetail; 
        }else if(req.bType == 'OUTCOME' ){
          return outcomeDetail; 
        }
      }          
  },
  getGList: config => {
    console.info("请求【商品管理列表】接口, 请求参数：", config.body);
    return getGList;
  },
  editGStatus: config => {
    console.info("请求【修改商品状态】接口, 请求参数：", config.body);
    return simpleSuccess;
  },  
  getWBrand: config => {
    var req = eval('(' + config.body + ')');
    if(req.entityId != null){
      console.info("请求【获取子产品】接口, 请求参数：", config.body);
      return allGoodsName;
    }else{
      console.info("请求【获取水品牌】接口, 请求参数：", config.body);
      return allBrands;
    }       
  },  
  getSpec: config => {
    console.info("请求【获取品牌规格】接口, 请求参数：", config.body);
    return getSpec;
  }, 
  addWG: config => {
    console.info("请求【商家新增商品】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  editWG: config => {
    console.info("请求【商家编辑商品】接口, 请求参数：", config.body);//好像接口文档没有这个接口
    return simpleSuccess;
  },
};
