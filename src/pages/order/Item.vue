<template>
<div>
   <div  v-if="item" class="order-item">
       <section class="order-item-section">
           <p>{{item.createDate | formatDate }}</p>
           <Tag v-if="!isOther" type="primary">{{payType}}</Tag>
           <Tag v-if="isOther" type="primary">{{item.seriUserNum}}</Tag>
       </section>
       <section class="order-item-section">
         <h6>{{item.addrInfo.fullAddr}}</h6>
       </section>
       <section class="order-item-section" v-if="isPending">
         <p>{{item.addrInfo.contactPhone}}</p>
       </section>
       <section v-for="orderItem in item.orderItems" :key="orderItem.gName" class="order-item-section">
          <p> 
            {{`${orderItem.gName} X ${orderItem.count}`}}
          </p>
           <span>{{`￥${orderItem.amount}`}}</span>
       </section>
       <section class="order-item-section">
         <p class="total-price">{{`合计:￥${item.amount}`}}</p>
       </section>
       <section class="order-item-section" v-if="isProcessing">
           <p>配送员<span>{{item.empName}}</span> </p>
           <p>提成金额:<span>{{`${item.empAmout|| 0 } 元`}}</span></p>
       </section>
       <div class="order-item-footer" v-if="isPending">
           <ul :disabled="eventDisabled">
               <li class="refuse"><a @click="refuse">拒绝</a></li>
               <li><a @click="toggleFinish">送达</a></li>
               <li><a @click="toggleAssign">指派</a></li>
               <li><a @click="call">电话</a></li>
           </ul>
       </div>
       <div class="order-item-footer" v-if="isProcessing">
           <ul :disabled="eventDisabled">
               <li class="refuse"><a @click="unDelivery">无法送到</a></li>
               <li><a @click="toggleFinish">送达</a></li>
               <li><a @click="toggleReassignment">改派</a></li>
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
               <li>{{`${item.empAmout|| 0 } 元`}}</li>
           </ul>
       </div>
       <Checkbox class="order-item-checkbox" v-model="checked" v-if="editable"/>
   </div>
   <p v-else>
     暂无订单信息
   </p>
   <AssignPicker v-if="openAssign" :close="toggleAssign" :isBatch="false"  :id="item.id"/>
   <AssignPicker v-if="openReassignment" :close="toggleReassignment" :id="item.id"/>
   <PayMethodPicker v-if="openFinish" :isBatch="false" :close="toggleFinish" :id="item.id"/>
  </div>
</template>
<script>
import { Tag, Checkbox, Actionsheet, Popup, Picker, Dialog, Toast } from "vant";
import AssignPicker from "@/components/AssignPicker";
import PayMethodPicker from "@/components/PayMethodPicker";
import { mapActions, mapGetters } from "vuex";
import { CobPayTypeEnum } from "@/shared/consts";
import { formatDateTime } from "@/utils"
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
    PayMethodPicker
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
      openAssign: false,
      openReassignment: false,
      openFinish: false,
      showCall: false,
      callActions: [],
      otherStatus: {
        FINISH: "已完成",
        UNDELIVER: "无法送达",
        REJECT: "已拒绝",
        CANCEL: "已取消"
      }
    };
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
      console.log({type})
      console.log(CobPayTypeEnum[type])
      return CobPayTypeEnum[type];
    },
    eventDisabled() {
      return this.editable;
    },
    otherStatusText() {
      const { oStatus } = this.item;
      const { otherStatus } = this;
      return otherStatus[oStatus] || "";
    }
  },
  watch: {
    checked(newVal, oldVal) {
      const { id } = this.item;
      const desc = `的checked 监听:`;
      console.log({ id, desc, newVal, oldVal });
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
      console.log("打电话", item.name);
    },
    toggleAssign() {
      this.openAssign = !this.openAssign;
    },
    toggleReassignment() {
      this.openReassignment = !this.openReassignment;
    },
    toggleFinish() {
      console.log("关闭 finish ")
      this.openFinish = !this.openFinish;
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
            userId: 1
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
        message: `确定要酱[ ${
          this.item.addrInfo.contactPhone
        } ]的订单状态修改为[ 无法送达 ]吗?`
      })
        .then(() => {
          // on confirm
          const { id } = this.item;
          const params = {
            entityIds: [id],
            oprStatus: "UNDELIVER",
            userId: 1
          };
          this.oprSO(params);
        })
    },
    oprSO(params) {
      if (params) {
        this.$api.order
          .oprSO(params)
          .then(r => {
            Toast.success("操作成功");
          })
      }
    }
  },
  filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDateTime(date, "yyyy-MM-dd hh:mm");
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
    font-size: 12px;
    padding: 2px 0;
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
    > span {
      position: absolute;
      right: 10px;
      top: 0;
    }
    .total-price {
      font-size: 14px;
      font-weight: 500;
      text-align: right;
      padding-right: 10px;
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
</style>
