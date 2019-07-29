<template>
    <div class="index">
        <h4>{{shopName}}</h4>
        <div class="flex-warp income-warp">
            <div class="flex-warp-item" @click="goStatistics">
                <div>今日收入</div>
                <p>{{data.dayIncome}}</p>
            </div>
            <div class="divide"></div>
             <div class="flex-warp-item" @click="goStatistics">
                <div>本月收入</div>
                <p>{{data.monIncome}}</p>
            </div>
        </div>
        <p class="total">累计收入:<span>{{data.totalIncome}}</span></p>
        <h4>今日订单</h4>
        <div class="flex-warp">
            <div class="flex-warp-item total-order-item" @click="showOrder('PENDING')">
                <div class="wait">待处理</div>
                <p>{{orderNumber.pendCntOrders || 0}}</p>
            </div>
            <div class="flex-warp-item total-order-item" @click="showOrder('PROCESSING')">
                <div class="process">配送中</div>
                <p>{{orderNumber.processCntOrders || 0}}</p>
            </div>
            <div class="flex-warp-item total-order-item" @click="showOrder('OTHER')">
                <div class="complete">已完成</div>
                <p>{{orderNumber.finishCntOrders || 0}}</p>
            </div>
        </div>
        <h4>销售商品排行</h4>
        <div class="sort">
            <span :class="{ current: rackType === 'currentMonth' }" @click="getRackList('month')">本月</span>
            <span :class="{ current: rackType === 'all' }" @click="getRackList('all')">全部</span>
        </div>
        <SortItem v-if="rackData && rackData.length" v-for="(item, index) in rackData" :index="index" :key="item.id" :item="item"/>
        <Empty v-else class="index-empty"/>
        <p class="show-all" @click="handleShowAll" v-if="showAllBtn">
            <a >显示全部</a>
        </p>
        <Footer/>
    </div>
</template>

<script>
import Footer from "@/pages/wechat/Footer";
import SortItem from "./SortItem";
import Empty from "@/components/Empty";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "index",
  components: {
    Footer,
    SortItem,
    Empty
  },
  data() {
    return {
      data: {
        dayEmpExp: "--",
        dayIncome: "--",
        monEmpExp: "--",
        monIncome: "--",
        totalEmpExp: "--",
        totalIncome: "--"
      },
      orderNumber: {
        processCntOrders: 0,
        finishCntOrders: 0,
        pendCntOrders: 0
      },
      showAll: false,
      allRackData: [],
      rackData: [],
      rackType: "currentMonth",
      shopName: "我的水站"
    };
  },
  mounted() {
    this.finReport();
    this.getCntOrders();
    this.getRackList();
    this.getStoreInfo();
  },
  computed: {
    ...mapGetters(["userId"]),
    showAllBtn() {
      return this.allRackData && this.allRackData.length > 5;
    }
  },
  methods: {
    showOrder(type) {
      this.$router.push({ path: "/order", query: { type } });
    },
    getStoreInfo() {
      const params = {
        userId : this.userId
      };
      this.$api.mine.getInfo(params).then(res => {
        //this.userName = res.userName ? "账号: " + res.userName : "",
        this.shopName = res.shopName  || "我的水站"
      });
    },
    handleShowAll() {
      const { showAll, allRackData } = this;
      if (allRackData && allRackData.length > 5) {
        this.rackData = allRackData.slice(0, 5);
      } else {
        this.rackData = this.allRackData;
      }
      this.showAll = !showAll;
    },
    finReport() {
      const { userId } = this;
      this.$api.mine.finReport({ userId }).then(res => {
        Object.assign(this.data, res);
      });
    },
    goStatistics(){
      this.$router.push({ path: "/statistics/monthIncome"});
    },
    getCntOrders() {
      const { userId } = this;
      this.$api.home.getCntOrder({ userId }).then(r => {
        Object.assign(this.orderNumber, r);
      });
    },
    getRackList(type) {
      let entityId = 0;
      if ("all" !== type) {
        entityId = new Date().getMonth() + 1;
        this.rackType = "currentMonth";
      } else {
        this.rackType = "all";
      }
      this.getRank(entityId);
    },
    getRank(entityId) {
      const params = {
        userId: this.userId,
        entityId
      };
      this.$api.home.getRank(params).then(r => {
        if (r && r.length) {
          this.allRackData = r;
          if (r.length > 5) {
            this.rackData = r.slice(0, 5);
          } else {
            this.rackData = r;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scpoed>
.index {
  padding: 20px 20px 100px 20px;
  h4 {
    height: 48px;
    line-height: 48px;
  }
  .flex-warp {
    display: flex;

    align-items: center;
    border-radius: 5px;
    &-item {
      flex: 1;
      text-align: center;
      padding: 20px 10px;
    }
    .divide {
      width: 1px;
      background: #e5e5e5;
      height: 64px;
    }
  }
  .income-warp {
    box-shadow: 0 0 2px #e5e5e5;
  }
  .total-order-item {
    border: 1px solid #e5e5e5;
    margin: 0 5px;
    padding: 5px;
    border-radius: 5px;
    div {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: red;
        display: inline-block;
      }
    }
    .wait {
      &::before {
        background: red;
      }
    }
    .process {
      &::before {
        background: #ffdf55;
      }
    }
    .complete {
      &::before {
        background: green;
      }
    }
  }
  .total {
    padding: 15px 0;
    font-size: 14px;
    span {
      margin-left: 10px;
    }
  }
  .sort {
    text-align: right;
    margin-bottom: 10px;
    span {
      margin: 0 10px;
      padding: 2px;
      cursor: pointer;
    }
    .current {
      color: #38f;
    }
  }
  .show-all {
    margin-top: 10px;
    text-align: center;
  }
  .index-empty {
    .empty-content {
      padding-top: 10px;
    }
  }
}
</style>
