
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
export default {
  listShopEmp: config => {
    console.info("请求【员工列表】接口, 请求参数：", config.body);
    return listShopEmp;
  },
  deleteEmp: config => {
    console.info("请求【删除员工】接口, 请求参数：", config.body);
    return simpleSuccess;
  },
  updateEmp: config => {
    console.info("请求【新增/更新员工】接口, 请求参数：", config.body);
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
  }

  
};
