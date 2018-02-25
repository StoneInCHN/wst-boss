<template>
   <div class="order-item">
       <section class="order-item-section">
           <p>2018-02-11 12:23:10</p>
           <Tag type="primary">水票支付</Tag>
       </section>
       <section class="order-item-section">
         <h6>成都市高新区软件园E区</h6>
       </section>
       <section class="order-item-section" v-if="isPending">
         <p>13568952709</p>
       </section>
       <section class="order-item-section">
           <p>冰川时代矿泉水 (15L) X 1 </p>
           <span>￥18.00</span>
       </section>
       <section class="order-item-section">
         <p class="total-price">合计:￥18.00</p>
       </section>
       <section class="order-item-section" v-if="isDelivery">
           <p>配送员<span>李丽</span> </p>
           <p>提成金额:<span>￥18.00</span></p>
       </section>
       <div class="order-item-footer" v-if="isPending">
           <ul>
               <li class="refuse"><a @click="refuse">拒绝</a></li>
               <li><a @click="assign">指派</a></li>
               <li><a @click="service">送达</a></li>
               <li><a @click="call">电话</a></li>
           </ul>
       </div>
       <div class="order-item-footer" v-if="isDelivery">
           <ul>
               <li class="refuse"><a @click="unDelivery">无法送到</a></li>
               <li><a @click="reassignment">改派</a></li>
               <li><a @click="service">送达</a></li>
               <li><a @click="call">电话</a></li>
           </ul>
       </div>
       <div v-if="isCompleted" class="order-item-footer">
             <ul class="complete-status">
               <li class="state">
                 <Tag plain type="primary">已完成</Tag>
               </li>
               <li>李丽丽</li>
               <li>提成金额:</li>
               <li>5元</li>
           </ul>
       </div>
       <Checkbox class="order-item-checkbox" v-model="checked" v-if="editable"/>
   </div>
</template>
<script>
import { Tag, Checkbox } from "vant";
export default {
  name: "orderItem",
  components: {
    Tag,
    Checkbox
  },
  props:{
    state:{
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
      checked: true
    };
  },
  computed:{
    isPending(){
      return this.state === "pending"
    },
    isDelivery(){
      return this.state === "delivery"
    },
    isCompleted(){
      return this.state === "complete"
    }
  },
  methods: {
    call() {
      console.log("call");
    },
    assign() {
      console.log("assign");
      this.showAssign = !this.showAssign;
    },
    service() {
      console.log("service");
      this.showPayMethod = !this.showPayMethod;
    },
    refuse() {
      console.log("refuse");
    },
    unDelivery(){
      console.log("unDelivery")
    },
    reassignment(){
      console.log("reassignment")
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
      span{
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
        }
      }
      li:not(:last-child) {
        a {
          border-left: 2px solid #06bf04;
          padding: 0 10px;
        }
      }
      li.refuse {
        float: left;
        a {
          border: none;
        }
      }
    }
    .complete-status{
      font-size: 14px;
      display: flex;
      li{
        clear: both;
        flex: 1;
      }
      li.state{
         flex: 1;
      }
      li:last-child{
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
  .order-item-section-delivery{
    display: flex;
  }
}
</style>
