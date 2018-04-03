<template>
  <div class="order" :class="{ 'order-edit': editable }">
      <Button v-if="currentState !== 'OTHER'" class="order-setting" size="small" @click="setting">{{settingText}}</Button>
      <ul class="order-setting-edit" >
          <li v-if="currentState === 'PENDING'"><a @click="refuse">拒绝</a></li>
          <li v-if="currentState === 'PENDING'"><a @click="assign">指派</a></li>
          <li v-if="currentState === 'PROCESSING'"><a @click="assign">改派</a></li>
          <li v-if="currentState !== 'OTHER'"><a @click="service">送达</a></li>
          <li v-if="currentState === 'PROCESSING'"><a @click="call">无法送达</a></li>
      </ul>
      <Tabs :actice="active"  class="order-tabs" @click="onTabsClick">
          <Tab title="待处理">
            <Item
              v-for="item in pendingList" 
              :key="item.id"  
              :item="item" 
              state="PENDING" 
              :editable="editable"
            />
          </Tab>
          <Tab title="配送中">
              <Item
                v-for="item in processingList" 
                :key="item.id"  
                :item="item" 
                state="PROCESSING" 
                :editable="editable"
              />
          </Tab>
          <Tab title="已完成">
              <Item
                v-for="item in otherList" 
                :key="item.id"  
                :item="item" 
                state="OTHER" 
                :editable="editable"
              />
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
      editable: false,
      currentState: "PENDING",
      pendingList: [],
      processingList: [],
      otherList: [],
      tabTitles: [
        ["PENDING"],
        ["PROCESSING"],
        ["FINISH", "UNDELIVER", "REJECT", "CANCEL"]
      ]
    };
  },
  mounted() {
    this.getListByStatus(["PENDING"], "PENDING");
  },
  computed: {
    settingText() {
      return this.editable ? "取消" : "管理";
    }
  },
  methods: {
    setting() {
      this.editable = !this.editable;
    },
    onTabsClick(i) {
      this.editable = false;
      const status = this.tabTitles[i];
      if (i === 0) {
        this.currentState = "PENDING"
      } else if (i === 1) {
        this.currentState = "PROCESSING"
      }else{
        this.currentState = "OTHER"
      }
      this.getListByStatus(status, this.currentState);
    },
    getListByStatus(oStatus, type) {
      const params = {
        oStatus: oStatus,
        pageNumber: 1,
        pageSize: 2,
        userId: 1
      };
      this.$api.order
        .pageShopOrders(params)
        .then(r => {
          console.log({ r });
          if (r.code === "0000") {
            if (type === "PENDING") {
              this.pendingList = r.msg;
            } else if (type === "PROCESSING") {
              this.processingList = r.msg;
            } else {
              this.otherList = r.msg;
            }
          }
        })
        .catch(e => {
          console.log({ e });
        });
    },
    refuse() {
      console.log("refuse");
    },
    assign() {
      console.log("assign");
    },
    service() {
      console.log("service");
    },
    call() {
      console.log("call");
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
    position: fixed;
    right: 15px;
    top: 7px;
    color: #4db1e5;
    z-index: 1000;
    font-size: 14px;
    border-color: #4db1e5;
  }
  .order-setting-edit {
    position: fixed;
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
        color: #06bf04;
        display: block;
      }
    }
  }
  .van-tabs--line {
    padding-top: 0;
  }
  .van-tabs__nav--line {
    padding-left: 50px;
    padding-right: 80px;
  }
  .van-tabs__wrap {
    position: fixed;
  }
  .van-tabs__content {
    margin-top: 50px;
  }
  .van-tab--active {
    color: #4db1e5;
  }
  .van-tabs__nav-bar {
    background-color: #4db1e5;
  }
}
.order-edit {
  .order-setting-edit {
    display: flex;
  }
  .van-tabs--line {
    padding-top: 44px;
  }
}
</style>

