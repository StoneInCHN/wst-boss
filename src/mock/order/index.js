const pageShopOrders = {
  code: "0000",
  desc: "操作成功",
  msg: [
    {
      addrInfo: {
        contactPhone: "1231221111",
        fullAddr: "金南园1202"
      },
      amount: 35, //订单总金额
      payType: "CASH", //支付方式
      oStatus: "PENDING",
      empId: null,
      empName: null,
      empAmout: null,
      id: 24,
      orderItems: [
        {
          gName: "蓝剑10L",
          count: 2,
          amount: 20
        },
        {
          gName: "冰川时代15L",
          count: 1,
          amount: 15
        }
      ],
      createDate: 1517553794000
    },
    {
      addrInfo: {
        contactPhone: "12345678901",
        fullAddr: "金南园1202"
      },
      amount: 45,
      payType: "WECHAT",
      oStatus: "CANCEL",
      empId: 1,
      empName: "张三",
      empAmout: 5,
      id: 23,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 3,
          amount: 45
        }
      ],
      createDate: 1517512312
    },
    {
      addrInfo: {
        contactPhone: "12345678901",
        fullAddr: "金南园1202"
      },
      amount: 45,
      payType: "WECHAT",
      oStatus: "UNDELIVER",
      empId: 1,
      empName: "王五",
      empAmout: 5,
      id: 22,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 3,
          amount: 45
        }
      ],
      createDate: 1517512312
    },
    {
      addrInfo: {
        contactPhone: "12345678901",
        fullAddr: "金南园1202"
      },
      amount: 45,
      payType: "WECHAT",
      oStatus: "FINISH",
      empId: 1,
      empName: "李四",
      empAmout: 5,
      id: 21,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 3,
          amount: 45
        }
      ],
      createDate: 1517512312
    },
    {
      addrInfo: {
        contactPhone: "12345678901",
        fullAddr: "金南园1202"
      },
      amount: 45,
      payType: "WECHAT",
      oStatus: "REJECT",
      empId: 1,
      empName: "张三",
      empAmout: 5,
      id: 20,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 3,
          amount: 45
        }
      ],
      createDate: 1517512312
    }
  ]
};

const oprSO = {
    "code": "0000",
    "desc": "操作成功",
    "msg": null
  }

export default {
  pageShopOrders: config => {
    return pageShopOrders;
  },
  oprSO: config => {
    return oprSO;
  }
};
