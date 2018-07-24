<template>
<CellSwipe :right-width="swipeRightWidth" :on-close="onSwipeClose">
<div class="order-item">
       <section class="order-item-section">
           <p>{{item.createDate | formatDate }}</p>
           <Tag type="primary" class="tag">{{item.seriUserNum}}</Tag>
       </section>
       <section class="order-item-section">
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
       <section class="order-item-section">
         <!-- <Tag v-if="!isOther" type="primary" plain class="pay-type">{{payType}}</Tag> -->
         <p class="total-price">合计 : <span>￥{{item.amount | firmatPrice}}</span></p>
       </section>
       <section class="order-item-section" v-if="isProcessing">
           <p>配送员<span>{{item.empName}}</span> </p>
           <p>提成金额:<span>{{item.empAmout | firmatPrice}}元</span></p>
       </section>
       <div class="order-item-footer" v-if="isPending">
           <ul :disabled="eventDisabled">
               <li><a @click="call110">电话</a></li>
               <li><a v-on:click="alert('1234')">打印</a></li>
               <li><a >送达</a></li>
               <li><a >指派</a></li>
           </ul>
       </div>
       <div class="order-item-footer" v-if="isProcessing">
           <ul :disabled="eventDisabled">
               <li class="refuse"><a @click="unDelivery">无法送到</a></li>
               <li><a @click="toggleFinish">送达</a></li>
               <li><a @click="showCommission('openReassignment')">改派</a></li>
               <li><a @click="call">电话</a></li>
           </ul>
       </div>
       <div v-if="isOther" class="order-item-footer">
             <ul class="complete-status">
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
import {
  Tag,
  Checkbox,
  Actionsheet,
  Popup,
  Picker,
  Dialog,
  Toast,
  Field,
  Button,
  CellSwipe
} from "vant";
import AssignPicker from "@/components/AssignPicker";
import PayMethodPicker from "@/components/PayMethodPicker";
import { mapActions, mapGetters } from "vuex";
import { CobPayTypeEnum } from "@/shared/consts";
import { formatDateTime, toDecimal2 } from "@/utils";
import validate from "../../utils/validate";

export default {
  name: "orderItem",
  components: {
    Tag,
    Checkbox,
    Actionsheet,
    Popup,
    Picker,
    Dialog,
    Toast,
    AssignPicker,
    PayMethodPicker,
    Field,
    Button,
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
  created() {
    this.checked = false;
  },
  data() {
    return {
      checked: false,
      openAssign: false,
      openReassignment: false,
      openAssign2Finish: false,
      openFinish: false,
      openFinish4Assign: false,
      showCall: false,
      callActions: [],
      otherStatus: {
        FINISH: "已完成",
        UNDELIVER: "无法送达",
        REJECT: "已拒绝",
        CANCEL: "已取消"
      },
      nextShowPayMethod: false,
      showCommissionModel: false,
      errorMsgshow: {
        commissionPrice: ""
      },
      commissionLoading: false,
      commissionPrice: "",
      assignType: "openAssign",
      swipeText: "",
      swipeRightWidth: 0
    };
  },
  mounted() {
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
    ...mapGetters(["checkedOrders", "pendingList", "processingList", "userId"]),
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
      const { editable } = this;
      console.log({ editable });
      return this.editable;
    },
    oStatusType() {
      return this.item.oStatus;
    },
    otherStatusText() {
      const { oStatus } = this.item;
      const { otherStatus } = this;
      return otherStatus[oStatus] || "";
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
    ...mapActions([
      "setCheckedOrders",
      "setPendingList",
      "setProcessingList",
      "setEmpIncome",
      "setEmpId"
    ]),
    onSwipeClose(clickPosition, instance) {
      switch (clickPosition) {
        case "left":
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            instance.close();
          });
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
      this.showCall = !this.showCall;
    },
    call110() {
      console.log("call 110");
    },
    callSomeone(item) {
      location.href = `tel:${item.name}`;
    },
    showCommission(key) {
      this.showCommissionModel = true;
      this.assignType = key;
    },
    onCommissionConfirm() {},
    checkCommissionPrice() {},
    toggleAssign() {},
    toggleReassignment() {
      this.openReassignment = !this.openReassignment;
    },
    //不指派 直接完成
    toggleAssign2Finish(type) {},
    toggleFinish() {
      this.openFinish = !this.openFinish;
    },
    closeFinish4Assign() {
      this.openFinish4Assign = false;
    },
    refuse() {},
    unDelivery() {}
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
  }
  .order-item-section-delivery {
    display: flex;
  }
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
.van-cell-swipe__right {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: #fff;
  padding: 0 15px;
}
</style>
