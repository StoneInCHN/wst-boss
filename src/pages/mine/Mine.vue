<template>
	<div class="mine">
		<div class="statistical">
			<h2 class="title">收支统计</h2>
			<div class="statistical-item">
				<div class="statistical-sub-item">
					<div>
						<p class="sub-title">本月收入</p>
						<p>15077.00</p>
					</div>
					<div>
						<p class="sub-title">今日收入</p>
						<p>1022.00</p>
					</div>
				</div>
				<p class="total">累计收入：140532.00</p>
			</div>
			<div class="statistical-item">
				<div class="statistical-sub-item">
					<div>
						<p class="sub-title ">本月支出</p>
						<p>3377.00</p>
					</div>
					<div>
						<p class="sub-title">进入支出</p>
						<p>122.00</p>
					</div>
				</div>
				<p class="total">累计支出：20490.00</p>
			</div>
		</div>
		<CellGroup>
			<Cell title="店铺管理" icon="shop" is-link to="/manage/storeManage" />
			<Cell title="员工管理" icon="shop" is-link to="/manage/workerManage" />
			<Cell title="二维码管理" icon="shop" is-link to="/manage/qrManage" />
		</CellGroup>
		<Footer/>
	</div>
</template>

<script>
import { Cell, CellGroup, Icon } from "vant";
import Header from "../wechat/Header";
import Footer from "../wechat/Footer";
export default {
  name: "Mine",
  components: { Header, Footer, Cell, CellGroup, Icon },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.mine {
  .statistical {
    .title {
			text-align: center;
			height: 45px;
			line-height: 45px;
			color: #333;
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
      &  p {
				text-align: center;
				color: #999;
				font-size: 12px;
			}
			.sub-title{
					color: #999;
					font-size: 12px;
			}
			.total{
				padding: 4vw 3vw;
				font-size: 14px;
				color: #666;
			}
    }
  }
}
</style>
