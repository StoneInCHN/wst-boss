<template>
  <div class="order-item-temp">
      <p>2018.1.14 22.24</p>
      <p>星雅俊园 19栋1001室</p>
      <p>13100000000</p>
      <section class="order-item-goods-info">
        <p>蓝剑矿泉水（15L）X 1</p>
        <div class="pay-info-warp">
            <span class="price">￥12.00</span>
            <Tag type="primary">水票支付</Tag>
        </div>           
      </section>
      <section class="order-item-state-complete" v-if="isComplete">
        <p class="state-complete">已完成</p>
        <div class="complete-info-warp">
            <span >张三</span>
            <span >提成：5元</span>
        </div>           
      </section>
      <ul class="order-item-pending-btns" v-if="isPending">
          <li><Button size="small" @click="call">电话</Button></li>
          <li><Button size="small" @click="assign">指派</Button></li>
          <li><Button size="small" @click="service">送达</Button></li>
          <li><Button size="small" @click="refuse">拒绝</Button></li>
      </ul>
      <ul class="order-item-delivery-btns" v-if="isDelivery">
        <li><Button size="small" @click="call">电话</Button></li>
          <li><Button size="small" @click="assign">改派</Button></li>
          <li><Button size="small" @click="service">送达</Button></li>
          <li><Button size="small" @click="refuse">无法送达</Button></li>
          <li class="order-item-commission">
              <span>提成：5元</span>
          </li>
      </ul>

      <Actionsheet v-model="showAssign"  title="请指派人选" >
         <ul class="actions-warp">
             <li v-for="(item, index) in assignItems" @click.stop="onClickAssignItem(item)" :key="index">
                  <span class="van-actionsheet__name">{{ item.name }}</span>
             </li>
         </ul>
      </Actionsheet>
      <Actionsheet v-model="showPayMethod"  title="请选择支付方式" >
         <ul class="actions-warp">
             <li v-for="(item, index) in payMethodItems" @click.stop="onClickPayMethodItem(item)" :key="index">
                  <span>{{ item.name }}</span>
             </li>
         </ul>
      </Actionsheet>
  </div>
</template>
<script>
import { Tag, Button, Actionsheet, Dialog, Field, Toast } from "vant";

export default {
  name: "OrderItem",
  components: {
    Tag,
    Button,
    Actionsheet,
    vanDialog: Dialog,
    Field,
    Toast
  },
  props: {
    state: {
      require: true,
      type: String
    }
  },
  data() {
    return {
      showAssign: false,
      showPayMethod: false,
      commissionShow: false,
      dialogShow: false,
      commissionPrice: "",
      price: "",
      actions: [
        {
          name: "王二",
          callback: this.onClick
        },
        {
          name: "张三"
        },
        {
          name: "李四"
        }
      ],
      assignItems: [
        { id: 1, name: "张山" },
        { id: 2, name: "李四" },
        { id: 3, name: "王五" }
      ],
      payMethodItems: [
        { id: 1, name: "纸质水票支付" },
        { id: 2, name: "现金支付" },
        { id: 3, name: "微信支付" },
        { id: 4, name: "支付宝支付" }
      ],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  computed: {
    isComplete() {
      return "complete" === this.state;
    },
    isPending() {
      return "pending" === this.state;
    },
    isDelivery() {
      return "delivery" === this.state;
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
    onClickAssignItem(item) {
      console.log(item.name);
      this.showAssign = false;
    },
    onClickPayMethodItem(item) {
      console.log(item.name);
      this.showPayMethod = false;
    }
  }
};
</script>
<style>
.order-item-temp {
  padding: 15px;
}
.order-item-temp p {
  margin: 5px 0;
}
.order-item-goods-info {
  display: flex;
}
.order-item-goods-info p {
  flex: 1;
}
.pay-info-warp {
  padding: 5px 0;
}
.pay-info-warp > .price {
  color: red;
  margin-right: 5px;
}
.order-item-state-complete {
  border-bottom: 1px solid #b1b2b3;
  padding-bottom: 5px;
  display: flex;
}
.state-complete {
  color: aqua;
  flex: 1;
}
.complete-info-warp span {
  margin-right: 10px;
}
.order-item ul.order-item-pending-btns,
.order-item ul.order-item-delivery-btns {
  overflow: hidden;
  border-bottom: 1px solid #b1b2b3;
}
.order-item ul.order-item-pending-btns > li,
.order-item ul.order-item-delivery-btns > li {
  float: left;
  padding: 5px 0;
}
.order-item ul.order-item-pending-btns > li button,
.order-item ul.order-item-delivery-btns > li button {
  color: #008000;
  border: none;
  font-size: 14px;
}
.order-item-commission span {
  line-height: 30px;
  padding-left: 10px;
}
.actions-warp {
  padding: 0 5px;
}
.actions-warp li {
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #e5e5ee;
}
</style>

