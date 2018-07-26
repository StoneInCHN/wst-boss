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
  CREDIT: "赊账",
  COB: "货到付款"
};

export const CobPayTypeText = {
  ["OFFLINE_TICKET"]: "水票",
  ["CASH"]: "现金",
  ["WECHAT"]: "微信",
  ["ALIPAY"]: "支付宝",
  ["COB"]: "货到付款",
  ["CREDIT"]: "赊账"
};

export const OrderOtherStatus = {
  FINISH: "已完成",
  UNDELIVER: "无法送达",
  REJECT: "已拒绝",
  CANCEL: "已取消"
};

export const AssignActionTypeEnum = {
  ASSIGN: "toAssign", //指派
  REASSIGNMENT: "toReassignment", //改派
  FINISH: "toFinish" //直接送达
};

export const PayMethodActionTypeEnum = {
  ASSIGN_2_FINISH: "assign2Finish", //指派
  DIRECT_FINISH: "directFinish" //直接送达
};

