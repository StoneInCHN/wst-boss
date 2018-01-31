<template>
	<div>
		<Header backUrl="/boss"/>
		<div class="title" @click="withdrawView">总资产：16000.00</div>
		<div class="container">
			<div class="item" @click="monthIncome">
				<span>本月流水 15000.00</span>
			</div>
			<div class="item" @click="monthIncome">
				<span>今日流水 2000.00</span>
			</div>
		</div>
		<p>累计流水：250000.00</p>
		<div class="container">
			<div class="item" @click="monthIncome">
				<span>本月收入 1300.00</span>
			</div>
			<div class="item" @click="monthIncome">
				<span>今日收入 1800.00</span>
			</div>
		</div>
		<p>累计收入：230000.00</p>
		<div class="container">
			<div class="item" @click="">
				<span>本月提成支出 5000.00</span>
			</div>
			<div class="item" @click="">
				<span>今日提成支出 200.00</span>
			</div>
		</div>
		<p>累计提成支出：63000.00</p>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "Statistics",
	components: { Header, Footer, Row, Col},
	data () {
		return {

		}
	},
	methods: {
        withdrawView () {
            this.$router.push('/statistics/withdrawView');
        },
        monthIncome () {
 			this.$router.push('/statistics/monthIncome');
        }
    }
}
</script>

<style scoped>
	.title{
		text-align: center;
		color: #6B8C43;
		font-size:18px;
		margin: 20px auto;
	}
	p{
		color: #6B8C43;
		font-size:14px;
		margin-left:10px;
	}
	.container{
		display: flex;
		align-content: center;
		justify-content: space-around;
		color: #6B8C43;
	}
	.item{
		flex: 1;
		height: 60px;
		border: 1px solid #bbb;
		margin:10px;
		position: relative;
		padding:10px;
		font-size:14px;
		vertical-align: middle;
	}
</style>
