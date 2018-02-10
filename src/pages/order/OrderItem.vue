<template>
  <div class="order-item">
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
      <ul class="order-item-btns">
          <li><Button size="small" @click="call">电话</Button></li>
          <li><Button size="small" @click="assign">指派</Button></li>
          <li><Button size="small" @click="service">送达</Button></li>
          <li><Button size="small" @click="refuse">拒绝</Button></li>
      </ul>
      <Actionsheet v-model="show" :actions="actions" title="请指派人选" >
          <p>一些内容</p>
      </Actionsheet>
  </div>
</template>
<script>
import { Tag, Button, Actionsheet } from "vant";

export default {
  name: "OrderItem",
  components: {
    Tag,
    Button,
    Actionsheet
  },
  data() {
    return {
      show: false,
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
      ]
    };
  },
  methods: {
    call() {
      console.log("call");
    },
    assign() {
      console.log("assign");
      this.show = !this.show
    },
    service() {
      console.log("service");
    },
    refuse() {
      console.log("refuse");
    }
  }
};
</script>
<style>
.order-item {
  padding: 15px;
}
.order-item p {
  margin: 5px 0;
}
.order-item-goods-info {
  display: flex;
}
.order-item-goods-info p {
  flex: 2;
}
.pay-info-warp {
  padding: 5px 0;
}
.pay-info-warp > .price {
  color: red;
  margin-right: 5px;
}
.order-item ul.order-item-btns {
  overflow: hidden;
  border-bottom: 1px solid #b1b2b3;
}
.order-item ul.order-item-btns > li {
  float: left;
  padding: 5px 5px 5px 0;
}
.order-item ul.order-item-btns > li button {
  color: #008000;
  border: none;
}
</style>

