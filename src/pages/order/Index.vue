<template>
  <div class="order" :class="{ 'order-edit': editable }">    
      <div class="order-nav">
        <Button v-if="currentState !== 'OTHER'" class="order-setting" size="small" @click="setting">{{settingText}}</Button>
        <ul class="order-setting-edit" >
            <li v-if="currentState === '_OTHER'"><a >拒绝</a></li>
            <li v-if="currentState === 'PENDING'"><a >指派</a></li>
            <li v-if="currentState === 'PROCESSING'"><a >改派</a></li>
            <li v-if="currentState === 'PENDING'"><a >送达</a></li>
            <li v-if="currentState === 'PROCESSING'"><a >送达</a></li>
            <li v-if="currentState === '_OTHER'"><a >无法送达</a></li>
        </ul>
        <Tabs :actice="active"  class="order-tabs" @click="onTabsClick">
            <Tab v-for="item in tabDatas" :title="item.title" :key="item.status"/>
        </Tabs>
      </div>
      <WstScroll class="order-list" 
        :data="orderList"
        :pullup="pullup"
        :pulldown="pulldown"
        :style="contentStyle"
        emptyContent="暂无订单数据"
      >
          <OrderItem
                v-for="item in orderList" 
                :key="item.id"  
                :item="item" 
                :state="currentState" 
                :editable="editable"
          />
      </WstScroll>
      <Footer/>
      <CallAction/>
      <CommonAssign/>
  </div>
</template>
<script>
import Header from "@/pages/wechat/Header";
import Footer from "@/pages/wechat/Footer";
import OrderItem from "./OrderItem";
import Empty from "@/components/Empty";
import WstScroll from "@/components/WstScroll";
import CallAction from "@/components/CallAction";
import CommonAssign from "@/components/CommonAssign";
import { Tab, Tabs, Icon, Button, Toast, Dialog, Field, Popup } from "vant";
import { mapActions, mapGetters } from "vuex";
import validate from "../../utils/validate";

export default {
  name: "order",
  components: {
    Tab,
    Tabs,
    Icon,
    OrderItem,
    Button,
    Toast,
    Dialog,
    Header,
    Footer,
    Field,
    Popup,
    Empty,
    WstScroll,
    CallAction,
    CommonAssign
  },
  data() {
    return {
      active: -1,
      pullup: true,
      pulldown: true,
      tabDatas: [
        {
          title: "待处理",
          status: "PENDING"
        },
        {
          title: "配送中",
          status: "PROCESSING"
        },
        {
          title: "已完成",
          status: "Other"
        }
      ],
      currentState: "PENDING",
      tabTitles: [
        ["PENDING"],
        ["PROCESSING"],
        ["FINISH", "UNDELIVER", "REJECT", "CANCEL"]
      ],
      count: 0
    };
  },
  mounted() {
    this.getListByStatus(["PENDING"], "PENDING");
  },
  computed: {
    ...mapGetters([
      "checkedOrders",
      "userId",
      "pendingList",
      "processingList",
      "otherList",
      "orderList",
      "editable"
    ]),
    settingText() {
      return this.editable ? "取消" : "管理";
    },
    contentStyle() {
      const flag = !!this.editable
      return flag ? {marginTop:"10.7vw"}: {}
    }
  },
  methods: {
    ...mapActions([
      "setCheckedOrders",
      "setPendingList",
      "setProcessingList",
      "setOtherList",
      "setEditable",
      "reserveOrderList",
      "setToken",
    ]),
    setting() {
      this.setCheckedOrders([]);
      this.setEditable(!this.editable);
    },
    onTabsClick(i) {
      this.setEditable(false);
      const status = this.tabTitles[i];
      if (i === 0) {
        this.currentState = "PENDING";
      } else if (i === 1) {
        this.currentState = "PROCESSING";
      } else {
        this.currentState = "OTHER";
      }
      this.getListByStatus(status, this.currentState);
    },
    getListByStatus(oStatus, type) {
      this.reserveOrderList([])
      const params = {
        oStatus: ["PENDING"],
        pageNumber: 1,
        pageSize: 50,
        userId: this.userId
      };
      this.$api.order.pageShopOrders(params).then(r => {
        if (type === "PENDING") {
          this.setPendingList(r);
        } else if (type === "PROCESSING") {
          this.setProcessingList(r);
        } else {
          this.setOtherList(r);
        }
        this.reserveOrderList(r)
      });
    }
  }
};
</script>
<style lang="less">
.order {
  position: relative;
  background-color: rgba(245, 240, 240, 0.973);
  padding-bottom: 50px;
  background-clip: content-box;
  .order-nav {
    position: relative;
    height: 45px;
    .order-setting {
      position: absolute;
      right: 15px;
      top: 7px;
      color: #4db1e5;
      z-index: 1000;
      font-size: 14px;
      border-color: #4db1e5;
    }
    .order-setting-edit {
      position: absolute;
      top: 50px;
      left: 10px;
      right: 9px;
      display: none;
      z-index: 100;
      line-height: 32px;
      background-color: #fff;
      box-shadow: 0 0 5px #a9a9a9;
      border-radius: 3px;
      li {
        flex: 1;
        text-align: center;
        border-right: 1px solid #ccc;
        a {
          color: #4db1e5;
          display: block;
        }
      }
    }
    .van-tabs__line {
      padding-top: 0;
      background-color: #4db1e5;
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
}
.order-edit {
  .order-nav {
    .order-setting-edit {
      display: flex;
    }
    .van-tabs--line {
      padding-top: 44px;
    }
  }
}
.order-list{
  height: calc(~"100vh - 95px");
  overflow: auto;
}
</style>

