const validate = (() => {
  const ruleData = {
    /**
     * @description 不能为空
     * @param val
     * @param msg
     * @return {*}
     */
    isNoNull(val, msg) {
      if (!val) {
        return msg;
      }
    },
    /**
     * @description 最小长度
     * @param val
     * @param length
     * @param msg
     * @return {*}
     */
    minLength(val, length, msg) {
      if (val.toString().length < length) {
        return msg;
      }
    },
    /**
     * @description 最大长度
     * @param val
     * @param length
     * @param msg
     * @return {*}
     */
    maxLength(val, length, msg) {
      if (val.toString().length > length) {
        return msg;
      }
    },
    /**
     * @description 是否是手机号码格式
     * @param val
     * @param msg
     * @return {*}
     */
    isMobile(val, msg) {
      if (!/^1[3-9]\d{9}$/.test(val)) {
        return msg;
      }
    }
  };
  return {
    /**
     * @description 查询接口
     * @param arr
     * @return {*}
     */
    check: function(arr) {
      let ruleMsg, checkRule, _rule;
      for (let i = 0, len = arr.length; i < len; i++) {
        //如果字段找不到
        if (arr[i].el === undefined) {
          return "字段找不到！";
        }
        //遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
          //提取规则
          checkRule = arr[i].rules[j].rule.split(":");
          _rule = checkRule.shift();
          checkRule.unshift(arr[i].el);
          checkRule.push(arr[i].rules[j].msg);
          //如果规则错误
          ruleMsg = ruleData[_rule].apply(null, checkRule);
          if (ruleMsg) {
            //返回错误信息
            return ruleMsg;
          }
        }
      }
    },
    /**
     * @description 添加规则接口
     * @param type
     * @param fn
     */
    addRule: function(type, fn) {
      ruleData[type] = fn;
    },
    /**
     * @description 校验所有接口
     * @param arr
     * @return {*}
     */
    checkAll: function(arr) {
      let ruleMsg,
        checkRule,
        _rule,
        msgArr = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        //如果字段找不到
        if (arr[i].el === undefined) {
          return "字段找不到！";
        }
        //如果字段为空以及规则不是校验空的规则
        //遍历规则
        for (let j = 0; j < arr[i].rules.length; j++) {
          //提取规则
          checkRule = arr[i].rules[j].rule.split(":");
          _rule = checkRule.shift();
          checkRule.unshift(arr[i].el);
          checkRule.push(arr[i].rules[j].msg);
          //如果规则错误
          ruleMsg = ruleData[_rule].apply(null, checkRule);
          if (ruleMsg) {
            //记录错误信息
            msgArr.push({
              el: arr[i].el,
              alias: arr[i].alias,
              rules: _rule,
              msg: ruleMsg
            });
            break;
          }
        }
      }
      //返回错误信息
      return msgArr.length > 0 ? msgArr : false;
    }
  };
})();

export default validate;
