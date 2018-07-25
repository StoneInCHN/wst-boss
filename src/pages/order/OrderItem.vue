<template>
<CellSwipe :right-width="swipeRightWidth" :on-close="onSwipeClose">
  <div class="order-item">
       <section class="order-item-section">
           <p>{{item.createDate | formatDate }}</p>
           <Tag type="primary" class="tag">{{item.seriUserNum}}</Tag>
       </section>
       <section class="order-item-section item-section-title">
         <h6>{{item.addrInfo.fullAddr}}</h6>
          <Tag plain type="primary" class="tag" v-if="!isOther">未打印</Tag>
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
       <section class="order-item-section">
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
               <li><a >送达</a></li>
               <li><a >指派</a></li>
           </ul>
           <ul v-if="isProcessing" :disabled="eventDisabled">
               <li class="refuse"><a >无法送到</a></li>
               <li><a >送达</a></li>
               <li><a >改派</a></li>
               <li><a @click="call">电话</a></li>
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
import { CobPayTypeEnum, OrderOtherStatus } from "@/shared/consts";
import { formatDateTime, toDecimal2 } from "@/utils";
import validate from "../../utils/validate";

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
      showCall: false,
      callActions: [],
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
    ...mapGetters(["checkedOrders"]),
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
            console.log({ val, id });
            return val !== id;
          });
          this.setCheckedOrders(lists);
        }
      }
    }
  },
  methods: {
    ...mapActions(["setCheckedOrders"]),
    onSwipeClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          if (isPending) {
            Dialog.confirm({
              message: "确定拒绝该订单吗？"
            }).then(() => {
              instance.close();
            });
          } else if (isProcessing) {
            Dialog.confirm({
              message: "确定将该订单标记为[无法送达]吗？"
            }).then(() => {
              instance.close();
            });
          }
          break;
      }
    },
    call() {
      console.log("call");
      this.callActions = [];
      this.callActions.push({
        name: this.item.addrInfo.contactPhone,
        callback: this.callSomeone
      });
    },
    callSomeone(item) {
      location.href = `tel:${item.name}`;
    },
    printOrder() {
      alert("printOrder");
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
<style lang="less">
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
    font-size: 14px;
    padding: 3px 0;
    font-weight: 200;
    h6 {
      font-weight: 500;
      font-size: 14px;
    }
    p {
      font-size: 14px;
      flex: 1;
      span {
        margin-left: 20px;
      }
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
    }
    .total-price span {
      color: red;
      margin-left: 0px;
    }
    .tag {
      padding: 4px 8px 2px;
      font-size: 14px;
    }
  }
  .item-section-title {
    padding-right: 20vw;
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
  padding: 0 15px;
}
</style>
