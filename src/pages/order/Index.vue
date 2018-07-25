<template>
  <div class="order" :class="{ 'order-edit': editable }">    
      <div class="order-nav">
        <Button v-if="currentState !== 'OTHER'" class="order-setting" size="small" @click="setting">{{settingText}}</Button>
        <ul class="order-setting-edit" >
            <li v-if="currentState === '_OTHER'"><a @click="batchRefuse">拒绝</a></li>
            <li v-if="currentState === 'PENDING'"><a @click="showCommission('openAssign')">指派</a></li>
            <li v-if="currentState === 'PROCESSING'"><a @click="showCommission('openReassignment')">改派</a></li>
            <li v-if="currentState === 'PENDING'"><a @click="showCommission('openAssign2Finish')">送达</a></li>
            <li v-if="currentState === 'PROCESSING'"><a @click="batchFinish()">送达</a></li>
            <li v-if="currentState === '_OTHER'"><a @click="batchUnDelivery">无法送达</a></li>
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
  </div>
</template>
<script>
import Header from "@/pages/wechat/Header";
import Footer from "@/pages/wechat/Footer";
import OrderItem from "./OrderItem";
import AssignPicker from "@/components/AssignPicker";
import PayMethodPicker from "@/components/PayMethodPicker";
import Empty from "@/components/Empty";
import WstScroll from "@/components/WstScroll";
import CallAction from "@/components/CallAction";
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
    AssignPicker,
    PayMethodPicker,
    Field,
    Popup,
    Empty,
    WstScroll,
    CallAction
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
      openAssign: false,
      openReassignment: false,
      openAssign2Finish: false,
      openFinish: false,
      openFinish4Assign: false,
      isLoading: false,
      count: 0,
      showCommissionModel: false,
      commissionPrice: "",
      commissionLoading: false,
      errorMsgshow: {
        commissionPrice: ""
      },
      assignType: "openAssign",
      orderList: []
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
      "editable",
      "empIncome"
    ]),
    settingText() {
      return this.editable ? "取消" : "管理";
    },
    checkRules() {
      return [
        {
          el: this.commissionPrice,
          alias: "commissionPrice",
          rules: [
            { rule: "isNoNull", msg: "提成金额不能为空" },
            {
              rule: "isPrice",
              msg: "提成金额只能为大于或等于0的数字且最多两位小数"
            }
          ]
        }
      ];
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
      "setToken",
      "setUserId",
      "setCobType",
      "setEmpIncome"
    ]),
    setting() {
      this.setCheckedOrders([]);
      this.setEditable(!this.editable);
    },
    onRefresh() {
      setTimeout(() => {
        this.count++;
        Toast.succes("刷新成功:" + this.count);
        this.isLoading = false;
      }, 500);
    },
    checkCommissionPrice() {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === "commissionPrice";
        })
      );
      this.errorMsgshow.commissionPrice = result ? result : "";
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
      this.orderList = []
      const params = {
        oStatus,
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
        console.log({r})
        this.orderList = r
      });
    },
    batchRefuse() {
      const ids = this.checkedOrders;
      const desc = `批量拒绝`;
      if (ids && ids.length > 0) {
        Dialog.confirm({
          title: "拒绝订单",
          message: `确定要拒绝当前选择的订单吗?`
        })
          .then(() => {
            const params = {
              entityIds: ids,
              oprStatus: "REJECT",
              userId: this.userId
            };
            this.oprSO(params);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("请先选择订单");
      }
    },
    batchAssign() {
      this.batchOption("openAssign", "请先选择要指派的订单");
    },
    closeAssgin() {
      this.openAssign = false;
    },
    showCommission(key) {
      const ids = this.checkedOrders;
      const desc = `批量送达`;
      console.log({ desc, ids });
      if (ids && ids.length > 0) {
        this.showCommissionModel = true;
        this.assignType = key;
      } else {
        Toast("请先选择订单");
      }
    },
    onCommissionConfirm() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        const commissionPrice = this.commissionPrice;
        if (this.assignType === "openReassignment") {
          this.batchReassignment();
        } else if (this.assignType === "openAssign2Finish") {
          this.openAssign2Finish = true;
        } else {
          this.batchAssign();
        }
        this.setEmpIncome(commissionPrice);
        this.showCommissionModel = false;
      }
    },
    batchService() {
      const ids = this.checkedOrders;
      if (ids && ids.length > 0) {
        this.showCommissionModel = true;
      } else {
        Toast("请先选择订单");
      }
    },
    batchReassignment() {
      this.batchOption("openReassignment", "请先选择要改派的订单");
    },
    closeReassignment() {
      this.openReassignment = false;
    },
    //不指派 直接送达
    closeAssign2Finish(type) {
      if (this.openAssign2Finish) {
        this.openAssign2Finish = false;
        setTimeout(() => {
          this.openFinish4Assign = true;
        }, 100);
      } else {
        this.openAssign2Finish = true;
      }
    },
    //送达
    batchFinish() {
      const ids = this.checkedOrders;
      const desc = `批量送达`;
      console.log({ desc, ids });
      if (ids && ids.length > 0) {
        this.openFinish = true;
      } else {
        Toast("请先选择订单");
      }
    },
    closeFinish() {
      this.openFinish = false;
    },
    closeFinish4Assign() {
      this.openFinish4Assign = false;
    },
    batchUnDelivery() {
      const ids = this.checkedOrders;
      const desc = `批量无法送达`;
      //console.log({ desc, ids });
      if (ids && ids.length > 0) {
        Dialog.confirm({
          title: "批量无法送达",
          message: `确定要将当前选择的订单的状态改为无法送达吗`
        })
          .then(() => {
            const params = {
              entityIds: ids,
              oprStatus: "UNDELIVER",
              userId: this.userId
            };
            this.oprSO(params);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("请先选择订单");
      }
    },
    batchOption(openFlag, msg) {
      const ids = this.checkedOrders;
      if (ids && ids.length > 0) {
        this[openFlag] = true;
      } else {
        Toast(msg);
      }
    },
    oprSO(params, curStatus) {
      if (params) {
        this.$api.order.oprSO(params).then(r => {
          this.getListByStatus(["PENDING"], "PENDING");
          this.getListByStatus(["PROCESSING"], "PROCESSING");
          Toast.success("操作成功");
        });
      }
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
.commission-popup {
  width: 80vw;
  padding: 1rem;
  box-sizing: border-box;
  h4 {
    text-align: center;
    padding: 0.5rem 0;
  }
  .van-button--default {
    margin-top: 0.5rem;
    background-color: #00a0e9;
    color: #fff;
  }
}
</style>

