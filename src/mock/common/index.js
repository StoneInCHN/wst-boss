const wxApiConfig = {
  code: "0000",
  desc: null,
  msg: {
    jsapi_ticket: "d5360eb401cb80f00",
    signature: "a13c98ea854c82d536011e98d58b56c763e54f36",
    url: "http://localhost:8080/wst-boss/swagger-ui.html",
    nonceStr: "6a35b18c-5713-44d0-9713-d8028def03c2",
    timestamp: "1520492347",
    appId: "wx3598eb401cb80f00"
  }
};
const CobType = {
  code: "0000",
  desc: "操作成功",
  msg: {
    cobPayType: [
      "OFFLINE_TICKET", //纸质水票
      "CASH", //现金
      "WECHAT", //微信
      "ALIPAY", //支付宝
      "CREDIT" //赊账
    ]
  }
};
export default {
  wxApiConfig: config => {
    return wxApiConfig;
  },
  getCobType: config => {
    return CobType;
  }
};
