<template>
<CellSwipe :right-width="swipeRightWidth" :on-close="onSwipeClose">
  <div class="order-item">
       <section class="order-item-section">
           <p>{{item.createDate | formatDate }}</p>
           <p class="order-type">{{ orderedType }}</p>
           <Tag type="primary" plain class="tag">{{item.seriUserNum}}</Tag>
       </section>
       <section class="order-item-section item-section-title">
         <h6>{{item.addrInfo.fullAddr}}</h6>
       </section>
       <section class="order-item-section" v-if="isPending">
         <p>{{item.addrInfo.contactPhone}}</p>
       </section>
       <section v-for="orderItem in item.orderItems" :key="orderItem.gName" class="order-item-section">
          <p> 
            {{`${orderItem.gName} x ${orderItem.count}`}}
          </p>
           <span> ￥{{orderItem.amount | firmatPrice}}</span>
       </section>
       <section class="order-item-section section-flex">
         <span  class="tag-print" :style="printStyle" v-if="!isOther">{{printText}}</span>
         <p class="total-price">合计 : <span>￥{{item.amount | firmatPrice}}</span></p>
       </section>
       <section class="order-item-section" v-if="isProcessing">
           <p>配送员<span>{{item.empName}}</span> </p>
           <p>提成金额:<span>{{item.empAmout | firmatPrice}}元</span></p>
       </section>
       <div  class="order-item-footer" >
           <ul v-if="isPending"  :disabled="eventDisabled">
               <li><a @click="call">电话</a></li>
               <li><a @click="printOrder">打印</a></li>
               <li><a @click="toAssign">指派</a></li>
               <li><a @click="toFinish">送达</a></li>
           </ul>
           <ul v-if="isProcessing" :disabled="eventDisabled">
              <li><a @click="call">电话</a></li>
              <li><a @click="printOrder">打印</a></li>
              <li><a @click="toReassignment">改派</a></li>
              <li><a @click="toService">送达</a></li>
           </ul>
           <ul v-if="isOther" class="complete-status">
               <li class="state">
                 <Tag plain type="primary">{{otherStatusText}}</Tag>
               </li>
               <li>{{item.empName}}</li>
               <li>提成金额:</li>
               <li>{{ item.empAmout | firmatPrice }}元</li>
           </ul>
       </div>
       <Checkbox class="order-item-checkbox" v-model="checked" v-if="editable"/>
    </div>
    <span slot="right">{{swipeText}}</span>
  </CellSwipe>
</template>
<script>
import { Tag, Checkbox, Popup, Dialog, Toast, CellSwipe } from "vant";
import { mapActions, mapGetters } from "vuex";
import {
  CobPayTypeEnum,
  OrderOtherStatus,
  CommonActionTypeEnum
} from "@/shared/consts";
import { formatDateTime, toDecimal2 } from "@/utils";
import validate from "../../utils/validate";
const OrderTypeText = {
  QR_CODE: "二维码订单",
  PHONE: "电话订单"
};
export default {
  name: "OrderItem",
  components: {
    Tag,
    Checkbox,
    Popup,
    Dialog,
    Toast,
    CellSwipe
  },
  props: {
    item: {
      require: true,
      type: Object
    },
    state: {
      require: true,
      type: String
    },
    editable: {
      require: true,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false,
      swipeText: "",
      swipeRightWidth: 0
    };
  },
  mounted() {
    this.checked = false;
    const { state } = this;
    switch (state) {
      case "PENDING":
        this.swipeText = "拒绝";
        this.swipeRightWidth = 65;
        break;
      case "PROCESSING":
        this.swipeText = "无法送达";
        this.swipeRightWidth = 65;
        break;
      case "OTHER":
        this.swipeText = "";
        this.swipeRightWidth = 0;
        break;
    }
  },
  computed: {
    ...mapGetters(["checkedOrders", "userId", "orderList"]),
    isPending() {
      return this.state === "PENDING";
    },
    isProcessing() {
      return this.state === "PROCESSING";
    },
    isOther() {
      return this.state === "OTHER";
    },
    payType() {
      const type = this.item.payType;
      return CobPayTypeEnum[type];
    },
    eventDisabled() {
      return this.editable;
    },
    oStatusType() {
      return this.item.oStatus;
    },
    otherStatusText() {
      const { oStatus } = this.item;
      return OrderOtherStatus[oStatus] || "";
    },
    printText() {
      const { printStatus } = this.item;
      return printStatus === "COMPLETE" ? "已打印" : "未打印";
    },
    printStyle() {
      const { printStatus } = this.item;
      return printStatus !== "COMPLETE" ? { color: "red" } : {};
    },
    orderedType() {
      const { orderedType } = this.item;
      if ("PHONE" === orderedType) {
        return "电话订单";
      } else if ("QR_CODE" === orderedType) {
        return "二维码订单";
      }
      return "";
    }
  },
  watch: {
    checked(newVal, oldVal) {
      const { id } = this.item;
      const desc = `的checked 监听:`;
      if (this.editable && id) {
        const checkedOrders = this.checkedOrders || [];
        if (newVal) {
          checkedOrders.push(id);
          this.setCheckedOrders(checkedOrders);
        } else {
          const lists = checkedOrders.filter(val => {
            return val !== id;
          });
          this.setCheckedOrders(lists);
        }
      }
    },
    editable(val) {
      if (!val) {
        this.checked = false;
      }
    }
  },
  methods: {
    ...mapActions([
      "setCheckedOrders",
      "callSomeone",
      "setCallActions",
      "assignAction",
      "reserveOrderList"
    ]),
    onSwipeClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          if (this.isPending) {
            this.refuse();
          } else if (this.isProcessing) {
            this.unDelivery();
          }
          break;
      }
    },
    call() {
      const callActions = [
        {
          name: this.item.addrInfo.contactPhone
        }
      ];
      this.setCallActions(callActions);
    },
    printOrder() {
      const { id } = this.item;
      this.$eventBus.$emit("order:print", { entityIds: [id] });
    },
    toAssign() {
      //指派
      const { id } = this.item;
      const action = {
        ids: [id],
        actionType: CommonActionTypeEnum.ASSIGN
      };
      this.assignAction(action);
    },
    toReassignment() {
      //改派
      const { id } = this.item;
      const action = {
        ids: [id],
        actionType: CommonActionTypeEnum.REASSIGNMENT
      };
      this.assignAction(action);
    },
    toFinish() {
      //指派时直接完成
      const { id } = this.item;
      const action = {
        ids: [id],
        actionType: CommonActionTypeEnum.FINISH
      };
      this.assignAction(action);
    },
    toService() {
      //对配送中的订单 执行送达
      const { id } = this.item;
      const action = {
        ids: [id],
        actionType: CommonActionTypeEnum.SERVICE
      };
      this.assignAction(action);
    },
    unDelivery() {
      Dialog.confirm({
        title: "无法送达",
        message: `确定要将[${
          this.item.addrInfo.contactPhone
        }]的订单状态修改为[无法送达]吗?`
      }).then(() => {
        // on confirm
        const { id } = this.item;
        const params = {
          entityIds: [id],
          oprStatus: "UNDELIVER",
          userId: Number(this.userId)
        };
        this.oprSO(params, () => {
          const { orderList } = this;
          const tempList = orderList.filter(orderItem => {
            return id !== orderItem.id;
          });
          this.reserveOrderList(tempList);
        });
      });
    },
    refuse() {
      Dialog.confirm({
        title: "拒绝订单",
        message: `确定要拒绝[${this.item.addrInfo.contactPhone}]的订单吗?`
      })
        .then(() => {
          const { id } = this.item;
          const params = {
            entityIds: [id],
            oprStatus: "REJECT",
            userId: Number(this.userId)
          };
          this.oprSO(params, () => {
            const { orderList } = this;
            const tempList = orderList.filter(orderItem => {
              return id !== orderItem.id;
            });
            this.reserveOrderList(tempList);
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    oprSO(params, callback) {
      if (params) {
        this.$api.order.oprSO(params).then(r => {
          Toast.success("操作成功");
          if (callback) {
            callback();
          }
        });
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDateTime(date, "yyyy-MM-dd hh:mm");
    },
    firmatPrice(price) {
      price = price || 0;
      return toDecimal2(price);
    }
  }
};
</script>
<style lang="less" scpoed>
.order-item {
  position: relative;
  box-sizing: border-box;
  margin: 5px 10px;
  background-color: #fff;
  padding: 10px 10px 10px 30px;
  box-shadow: 0 0 5px #a9a9a9;
  border-radius: 3px;
  .order-item-section {
    display: flex;
    position: relative;
    font-size: 12px;
    padding: 3px 0;
    font-weight: 200;
    h6 {
      font-weight: 500;
      font-size: 14px;
    }
    p {
      font-size: 12px;
      flex: 1;
      span {
        margin-left: 20px;
      }
    }
    .order-type {
      color: #38f;
    }
    > span {
      position: absolute;
      right: 10px;
      top: 0;
    }
    .pay-type {
      position: relative;
      margin-left: 10px;
    }
    .total-price {
      font-size: 14px;
      font-weight: 500;
      text-align: right;
      padding-right: 10px;
      flex: 1 1 auto;
    }
    .total-price span {
      color: red;
      margin-left: 0px;
    }
    .tag-print {
      position: relative;
      flex: 0 0 auto;
      right: 0;
      color: #06bf04;
    }
  }
  .section-flex {
    display: flex;
    align-items: center;
  }
  .order-item-footer {
    position: relative;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
      li {
        flex: 1 1 auto;
        text-align: center;
        a {
          color: #4db1e5;
          padding: 5px 10px;
          height: 8vw;
          line-height: 8vw;
          position: relative;
          z-index: 2;
          &::after {
            content: "";
            position: absolute;
            width: 200%;
            height: 200%;
            top: 0;
            left: 0;
            border: 1px solid #38f;
            border-radius: 5px;
            transform: scale(0.5);
            transform-origin: 0 0;
            opacity: 0.5;
            z-index: 1;
          }
        }
      }
    }
    ul[disabled="disabled"] {
      a {
        pointer-events: none;
        color: #ddd;
        border-color: #ddd !important;
      }
    }
    .complete-status {
      font-size: 14px;
      display: flex;
      li {
        clear: both;
        flex: 1;
      }
      li.state {
        flex: 1;
      }
      li:last-child {
        text-align: right;
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 200%;
      height: 200%;
      top: 0;
      left: 0;
      border-top: 1px solid #e5e5e5;
      transform: scale(0.5);
      transform-origin: 0 0;
    }
  }
  .order-item-checkbox {
    position: absolute;
    left: 5px;
    top: 60px;
    .van-checkbox__control:checked + .van-icon-success {
      border-color: #4db1e5;
      background-color: #4db1e5;
    }
    & .van-checkbox--checked {
      border-color: #4db1e5;
      background-color: #4db1e5;
    }
  }
  .order-item-section-delivery {
    display: flex;
  }
}
.van-cell-swipe__right {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: #fff;
  width: 65px;
}
</style>
