<template>
  <div class="order">
      <Header/>
      <Icon class="order-setting" name="setting"  @click="setting"/>
      <Tabs :actice="active" class="order-tabs">
          <Tab title="待处理">
              <OrderItem/>
              <OrderItem/>
              <OrderItem/>
              <OrderItem/>
              <OrderItem/>
              <OrderItem/>
          </Tab>
          <Tab title="配送中">配送中</Tab>
          <Tab title="已完成">已完成</Tab>
      </Tabs>
      <Footer/>
  </div>
</template>
<script>
import Header from "@/pages/wechat/Header";
import Footer from "@/pages/wechat/Footer";
import OrderItem from "@/pages/order/OrderItem";
import { Tab, Tabs, Icon } from "vant";
export default {
  name: "order",
  components: {
    Tab,
    Tabs,
    Icon,
    OrderItem,
    Header,
    Footer
  },
  data() {
    return {
      active: 2
    };
  },
  methods: {
    setting() {
      console.log("setting");
    }
  }
};
</script>
<style>
.order {
  position: relative;
}
.order-setting {
  position: absolute;
  right: 15px;
  top: 60px;
  color: #666;
  z-index: 1000;
}
.order-tabs {
  padding-bottom: 50px;
}
.order-tabs .van-tabs__wrap {
  padding-right: 50px;
}
</style>

