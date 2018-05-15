<template>
  <div class="order" :class="{ 'order-edit': editable }">    
      <Button v-if="currentState !== 'OTHER'" class="order-setting" size="small" @click="setting">{{settingText}}</Button>
      <ul class="order-setting-edit" >
          <li v-if="currentState === 'PENDING'"><a @click="batchRefuse">拒绝</a></li>
          <li v-if="currentState === 'PENDING'"><a @click="batchAssign">指派</a></li>
          <li v-if="currentState === 'PROCESSING'"><a @click="batchReassignment">改派</a></li>
          <li v-if="currentState === '_OTHER'"><a @click="batchService">送达</a></li>
          <li v-if="currentState === 'PROCESSING'"><a @click="batchUnDelivery">无法送达</a></li>
      </ul>
      
      <Tabs :actice="active"  class="order-tabs" @click="onTabsClick">
          <Tab title="待处理">
            <Item
              v-if="pendingList.length >0"
              v-for="item in pendingList" 
              :key="item.id"  
              :item="item" 
              state="PENDING" 
              :editable="editable"
            />
            <p v-else>
              暂无订单数据
            </p>
          </Tab>
          <Tab title="配送中">
              <Item
                v-if="processingList.length >0"
                v-for="item in processingList" 
                :key="item.id"  
                :item="item" 
                state="PROCESSING" 
                :editable="editable"
              />
              <p v-else>
              暂无订单数据
              </p>
          </Tab>
          <Tab title="已完成">
              <Item
                v-if="otherList.length >0"
                v-for="item in otherList" 
                :key="item.id"  
                :item="item" 
                state="OTHER" 
                :editable="editable"
              />
              <p v-else>
              暂无订单数据
            </p>
          </Tab>
      </Tabs>
      <Footer/>
      <AssignPicker v-if="openAssign" :isBatch="true" :close="closeAssgin" />
      <AssignPicker v-if="openReassignment" :isBatch="true" :close="closeReassignment" type="PROCESSING"/>
      <FinishPicker v-if="openFinish" :isBatch="true" :close="closeFinish"/>
  </div>
</template>
<script>
import Header from "@/pages/wechat/Header";
import Footer from "@/pages/wechat/Footer";
import OrderItem from "@/pages/order/OrderItem";
import AssignPicker from "@/components/AssignPicker";
import Item from "@/pages/order/Item";
import { Tab, Tabs, Icon, Button, Toast, Dialog } from "vant";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "order",
  components: {
    Tab,
    Tabs,
    Icon,
    OrderItem,
    Item,
    Button,
    Toast,
    Dialog,
    Header,
    Footer,
    AssignPicker
  },
  data() {
    return {
      active: -1,
      currentState: "PENDING",
      tabTitles: [
        ["PENDING"],
        ["PROCESSING"],
        ["FINISH", "UNDELIVER", "REJECT", "CANCEL"]
      ],
      openAssign: false,
      openReassignment: false,
      openFinish: false,
      isLoading: false,
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
      "editable"
    ]),
    settingText() {
      return this.editable ? "取消" : "管理";
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
      "setCobType"
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
      this.batchOption("openAssign" , "请先选择要指派的订单");
    },
    closeAssgin() {
      this.openAssign = false;
    },
    batchService() {
      const ids = this.checkedOrders;
      const desc = `批量送达`;
      //console.log({ desc, ids });
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          cobType: "OFFLINE_TICKET",
          oprStatus: "FINISH",
          userId: this.userId,
          empId: 2,
          empIncome: "8"
        };
        this.oprSO(params);
      }
    },
    batchReassignment() {
      this.batchOption("openReassignment" , "请先选择要改派的订单");
    },
    closeReassignment() {
      this.openReassignment = false;
    },
    batchFinish() {
      this.batchOption("openFinish", "请先选择订单");
    },
    closeFinish() {
      this.openFinish = false;
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
      debugger
      const ids = this.checkedOrders;
      if (ids && ids.length > 0) {
        this[openFlag] = true;
      } else {
        Toast(msg);
      }
    },
    oprSO(params) {
      if (params) {
        this.$api.order.oprSO(params).then(r => {
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

