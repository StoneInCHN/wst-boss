<template>
<li>
   <div  class="order-item">
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
               <li class="refuse"><a @click="refuse">拒绝</a></li>
               <li><a @click="showCommission('pending2Finish')">送达</a></li>
               <li><a @click="showCommission('openAssign')">指派</a></li>
               <li><a @click="call">电话</a></li>
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
   <AssignPicker v-if="openAssign" :close="toggleAssign" :isBatch="false"  :item="item"/>
   <AssignPicker v-if="openReassignment" :close="toggleReassignment" :isBatch="false" :item="item" type="PROCESSING"/>
   <AssignPicker v-if="openAssign2Finish" :close="toggleAssign2Finish" :isBatch="false" :item="item" type="assign2Finish"/>
   <PayMethodPicker v-if="openFinish" :close="toggleFinish" :item="item"/>
   <PayMethodPicker v-if="openFinish4Assign"  :close="closeFinish4Assign" :item="item" type="assign2Finish"/>
   <ActionSheet v-model="showCall" :actions="callActions" cancel-text="取消" />
   <Popup
    v-model="showCommissionModel"
    class="commission-popup"
   >
    <h4>提成金额</h4>
      <Field
        v-model="commissionPrice"
        label="提成金额"
        required
        placeholder="请输入提成金额"
        @blur="checkCommissionPrice"
        :error-message="errorMsgshow.commissionPrice"
      />
      <Button size="large" :loading="commissionLoading" @click="onCommissionConfirm">确定</Button>
   </Popup>
  </li>
</template>
<script>
import {
  Tag,
  Checkbox,
  ActionSheet,
  Popup,
  Picker,
  Dialog,
  Toast,
  Field,
  Button
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
    ActionSheet,
    Popup,
    Picker,
    Dialog,
    Toast,
    AssignPicker,
    PayMethodPicker,
    Field,
    Button
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
  mounted(){
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
      assignType: "openAssign"
    };
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
    call() {
      console.log("call");
      this.callActions = [];
      this.callActions.push({
        name: this.item.addrInfo.contactPhone,
        callback: this.callSomeone
      });
      this.showCall = !this.showCall;
    },
    callSomeone(item) {
      location.href = `tel:${item.name}`;
    },
    showCommission(key) {
      this.showCommissionModel = true;
      this.assignType = key;
    },
    onCommissionConfirm() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        //this.commissionLoading = true;
        const commissionPrice = this.commissionPrice;
        console.log({ commissionPrice });
        this.setEmpIncome(commissionPrice);
        this.showCommissionModel = false;
        if (this.assignType === "openReassignment") {
          this.toggleReassignment();
        } else if (this.assignType === "pending2Finish") {
          this.toggleAssign2Finish();
        } else {
          this.toggleAssign();
        }
        
      }
    },
    checkCommissionPrice() {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === "commissionPrice";
        })
      );
      this.errorMsgshow.commissionPrice = result ? result : "";
    },
    toggleAssign() {
      this.$api.mine
        .listShopEmp({
          userId: this.userId
        })
        .then(r => {
          if (r && r.length > 0) {
            console.log(`this.openAssign == ${this.openAssign}`);
            this.openAssign = !this.openAssign;
          } else {
            Toast.fail("请添加配送员");
          }
        });
    },

    toggleReassignment() {
      this.openReassignment = !this.openReassignment;
    },
    //不指派 直接完成
    toggleAssign2Finish(type) {
      if (this.openAssign2Finish) {
        this.openAssign2Finish = false;
        if ("openFinish" === type) {
          setTimeout(() => {
            this.openFinish = true;
          }, 100);
        }else if("openFinish4Assign" === type){
          setTimeout(() => {
            this.openFinish4Assign = true;
          }, 100);
        }
      } else {
        this.openAssign2Finish = true;
      }
    },
    toggleFinish() {
      console.log("关闭 finish ");
      this.openFinish = !this.openFinish;
    },
    closeFinish4Assign(){
      this.openFinish4Assign = false;
    },
    refuse() {
      console.log("refuse");
      Dialog.confirm({
        title: "拒绝订单",
        message: `确定要拒绝[${this.item.addrInfo.contactPhone}]的订单吗?`
      })
        .then(() => {
          // on confirm
          const { id } = this.item;
          const params = {
            entityIds: [id],
            oprStatus: "REJECT",
            userId: this.userId
          };
          this.oprSO(params);
        })
        .catch(() => {
          // on cancel
        });
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
          userId: this.userId
        };
        this.oprSO(params);
      });
    },
    oprSO(params) {
      if (params) {
        this.$api.order.oprSO(params).then(r => {
          //Toast.success("操作成功");

          const ids = params.entityIds || [];
          if (this.oStatusType === "PENDING") {
            const lists = this.pendingList.filter(item => {
              return !ids.includes(item.id);
            });
            this.setPendingList(lists);
          } else {
            const lists = this.processingList.filter(item => {
              return !ids.includes(item.id);
            });
            this.setProcessingList(lists);
          }

          let actions = "";
          if (params.oprStatus == "REJECT") {
            actions = "已被拒绝";
          } else if (params.oprStatus == "UNDELIVER") {
            actions = "无法送达";
          }
          Dialog.alert({
            message:
              "订单" +
              actions +
              "，请尽快联系用户提醒他：" +
              this.item.addrInfo.contactPhone,
            confirmButtonText: "拨打电话"
          }).then(() => {
            location.href = `tel:${this.item.addrInfo.contactPhone}`;
          });
        });
      }
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDateTime(date, "yyyy-MM-dd hh:mm");
    },
    firmatPrice(price){
      price = price || 0
      return toDecimal2(price)
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
    .total-price span{
      color:red;
      margin-left:0px;
    }
    .tag{
      padding:4px 8px 2px;
      font-size:14px;
    }
  }
  .order-item-footer {
    border-top: 2px solid #e5e5e5;
    ul {
      overflow: hidden;
      li {
        float: right;
        padding: 5px 2px;
        a {
          color: #06bf04;
          padding: 0 10px;
        }
      }
      li:not(:last-child) {
        a {
          border-left: 2px solid #06bf04;
        }
      }
      li.refuse {
        float: left;
        a {
          border: none;
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
</style>
