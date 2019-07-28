<template>
	<div class="mine">
    <!--
		<div class="statistical">
			<div class="statistical-title">
				<h2 class="title">收支统计</h2>
				<a @click="viewStatisticalDetails"> 查看明细</a>
			</div>
			<div class="statistical-item">
				<div class="statistical-sub-item">
					<div>
						<p class="sub-title">本月收入</p>
						<p>{{data.monIncome}}</p>
					</div>
					<div>
						<p class="sub-title">今日收入</p>
						<p>{{data.dayIncome}}</p>
					</div>
				</div>
				<p class="total">累计收入：{{data.totalIncome}}</p>
			</div>
			<div class="statistical-item">
				<div class="statistical-sub-item">
					<div>
						<p class="sub-title ">本月支出</p>
						<p>{{data.monEmpExp}}</p>
					</div>
					<div>
						<p class="sub-title">今日支出</p>
						<p>{{data.dayEmpExp}}</p>
					</div>
				</div>
				<p class="total">累计支出：{{data.totalEmpExp}}</p>
			</div>
		</div>
    -->
		<CellGroup class="shopName">
			<Cell :title="shopName" icon="shop" :label="userName" is-link to="/manage/storeManage" />
		</CellGroup>
    <CellGroup>
    	<Cell title="员工管理" icon="contact" is-link to="/manage/workerManage" />
			<Cell title="二维码管理" icon="qr" is-link to="/manage/qrManage" />
      <Cell title="通知消息" icon="chat" is-link to="/manage/notify" />
      <Cell title="关于我们" icon="location" is-link to="/manage/about" />
		</CellGroup>
		<Footer/>
	</div>
</template>

<script>
import { Cell, CellGroup, Icon } from "vant";
import Header from "../wechat/Header";
import Footer from "../wechat/Footer";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Mine",
  components: { Header, Footer, Cell, CellGroup, Icon },
  data() {
    return {
      data: {
        dayEmpExp: "--",
        dayIncome: "--",
        monEmpExp: "--",
        monIncome: "--",
        totalEmpExp: "--",
        totalIncome: "--",
      },
      userName:"",
      shopName:"我的水站"
    };
  },
  mounted() {
    this.init();
    this.getStoreInfo()
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    init() {
      const { userId } = this;
      this.$api.mine.finReport({ userId }).then(res => {
        Object.assign(this.data, res);
      });
    },
    getStoreInfo() {
      const params = {
        userId : this.userId
      };
      this.$api.mine.getInfo(params).then(res => {
        this.userName = res.userName ? "账号: " + res.userName : "",
        this.shopName = res.shopName  || "我的水站"
      });
    },
    viewStatisticalDetails() {
      this.$router.push("/statistics/monthIncome");
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  .shopName{
    padding-top: 20px;
  }
  .statistical {
    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px 0 50px;
      .title {
        height: 45px;
        line-height: 45px;
        color: #333;
        flex: 1 1 auto;
      }
      a {
        flex: 0 0 auto;
        padding: 5px 10px;
        font-size: 12px;
      }
    }
    &-item {
      .statistical-sub-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 3vw;
        & > div {
          flex: 1 1 auto;
          padding: 2vw;
        }
        & > div:last-child {
          border-left: 1px dashed #f1f1f1;
        }
      }
      & p {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
      .sub-title {
        color: #999;
        font-size: 12px;
      }
      .total {
        padding: 4vw 3vw;
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>
