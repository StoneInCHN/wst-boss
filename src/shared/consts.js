export const OrderStatusEnum = {
  /**待支付*/
  PENDING: "等待商家接单",
  /**指(改)派*/
  PROCESSING: "配送中",
  /**送达*/
  FINISH: "送达",
  /**拒绝*/
  REJECT: "拒绝",
  /**无法送达*/
  UNDELIVER: "无法送达",
  COMPLETE: "已完成",
  CANCEL: "已取消"
};

export const CobPayTypeEnum = {
  OFFLINE_TICKET: "纸质水票",
  CASH: "现金",
  WECHAT: "微信",
  ALIPAY: "支付宝",
  CREDIT: "赊账"
};
