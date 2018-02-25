<template>
  <div class="order">
      <Button class="order-setting" size="small" @click="setting">{{settingText}}</Button>
      <Tabs :actice="active" class="order-tabs">
          <Tab title="待处理">
              <Item state="pending" :editable="editable"/>
              <Item state="pending" :editable="editable"/>
              <Item state="pending" :editable="editable"/>
          </Tab>
          <Tab title="配送中">
              <Item state="delivery"/>
              <Item state="delivery"/>
              <Item state="delivery"/>
              <Item state="delivery"/>
          </Tab>
          <Tab title="已完成">
              <Item state="complete"/>
              <Item state="complete"/>
          </Tab>
      </Tabs>
      <Footer/>
  </div>
</template>
<script>
import Header from "@/pages/wechat/Header";
import Footer from "@/pages/wechat/Footer";
import OrderItem from "@/pages/order/OrderItem";
import Item from "@/pages/order/Item";
import { Tab, Tabs, Icon, Button } from "vant";
export default {
  name: "order",
  components: {
    Tab,
    Tabs,
    Icon,
    OrderItem,
    Item,
    Button,
    Header,
    Footer
  },
  data() {
    return {
      active: 2,
      settingText: "管理",
      editable: true
    };
  },
  methods: {
    setting() {
      if (this.settingText === "管理") {
        this.settingText = "取消";
      } else {
        this.settingText = "管理";
      }
      console.log("setting");
    }
  }
};
</script>
<style lang="less">
.order {
  position: relative;
  background-color: rgba(245, 240, 240, 0.973);
  padding-bottom: 50px;

  .order-setting {
    position: absolute;
    right: 15px;
    top: 7px;
    color: #4db1e5;
    z-index: 1000;
    font-size: 14px;
    border-color: #4db1e5;
  }
  .van-tabs__nav--line {
    padding-left: 50px;
    padding-right: 80px;
  }
  .van-tab--active {
    color: #4db1e5;
  }
  .van-tabs__nav-bar {
    background-color: #4db1e5;
  }
}
</style>

