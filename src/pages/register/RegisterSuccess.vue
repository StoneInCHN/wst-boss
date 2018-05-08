<template>
  <div class="register-success">
    <p>
      <Icon class="icon-success" name="certificate"/>
    </p>
    <p>注册成功</p>
    <p>感谢您注册成为云水站商家</p>
    <p>请联系云水站客服协助您使用该系统。</p>
    <p>客服电话：18030701005</p>
  </div>
</template>
<script>
import { Icon } from "vant";
export default {
  name: "RegisterSuccess",
  components: {
    Icon
  }
};
</script>
<style lang="less" >
.register-success {
  padding-top: 100px;
  p {
    text-align: center;
    margin-top: 10px;
    .icon-success {
      font-size: 100px;
      color: #00a0e9;
    }
  }
  p:last-child {
    margin-top: 50px;
  }
}
</style>
