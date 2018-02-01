<template>
	<div>
		<Header backUrl="/statistics"/>
		<div class="title">总资产：16000.00</div>
		<div class="order">
		<Row>
			<Col span="16" offset="4">
				<Button size="large" @click="withdraw">提现</Button>
			</Col>
		</Row>	
	</div>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col, Button } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "WithdrawView",
	components: { Header, Footer, Row, Col,Button},
	data () {
		return {

		}
	},
	methods: {
        withdraw () {
            this.$router.push('/statistics/withdrawInput');
        }
    }
}
</script>

<style scoped>
	.order{
		padding-top: 40px;
	}	
	.title{
		text-align: center;
		color: #6B8C43;
		font-size:18px;
		margin: 60px auto 20px;
	}
</style>
