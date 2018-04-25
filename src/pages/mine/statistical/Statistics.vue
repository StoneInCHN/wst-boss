<template>
	<div>
		<Header backUrl="/mine"/>	
		<p></p>
		<p>
			<Button type="primary" size="small" @click="monthIncome"><span style="padding:0 15px">收支明细</span></Button>
		</p>
		<div class="container">
			<div class="item1">
				<div>本月收入</div>
				<div>{{report.monIncome}}</div>
			</div>
			<div class="item2" >
				<div>今日收入</div>
				<div>{{report.dayIncome}}</div>
			</div>
		</div>
		<p>累计收入：{{report.totalIncome}}</p>
		<div class="container">
			<div class="item1">
				<div>本月提成支出</div>
				<div>{{report.monEmpExp}}</div>
			</div>
			<div class="item2">
				<div>今日提成支出</div>
				<div>{{report.dayEmpExp}}</div>
			</div>
		</div>
		<p>累计提成支出：{{report.totalEmpExp}}</p>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col, Button } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "Statistics",
	components: { Header, Footer, Row, Col, Button},
	data () {
		return {
			report: {}
		}
	},
	methods: {
        monthIncome () {
 			this.$router.push('/statistics/monthIncome');
        },
        finReport(){
		    var req = {};
		    	req.userId = this.userId;
		    	console.info(req);
		    	this.$api.mine.finReport(req)
		    	.then(res =>{
		    		//if(res.code = '0000'){
		    			this.report = res;
		    		//}
		    	}).catch(error => {
		    		console.error(error);
		    	})
		}
    },
    mounted(){
		this.finReport();
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
		margin:5px auto 15px 15px;
	}
	.container{
		display: flex;
		align-content: center;
		justify-content: space-around;
		color: #6B8C43;
		text-align: center;
	}
	.item1{
		flex: 1;
		height: 40px;
		border: 1px solid #bbb;
		margin:5px 5px 5px 15px;
		position: relative;
		padding:10px;
		font-size:14px;
		vertical-align: middle;
	}
	.item2{
		flex: 1;
		height: 40px;
		border: 1px solid #bbb;
		margin:5px 15px 5px 5px;
		position: relative;
		padding:10px;
		font-size:14px;
		vertical-align: middle;
	}
</style>
