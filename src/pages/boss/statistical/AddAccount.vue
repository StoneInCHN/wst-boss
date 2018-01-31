<template>
	<div>
		<Header backUrl="/statistics/withdrawInput"/>
		<CellGroup>
		  <Field
		    label="持卡人姓名"
		    placeholder="请输入姓名"
		    required
		  />
		  <Field
		    label="账号"
		    placeholder="请输入账号"
		    required
		  />
		</CellGroup>

		<div class="order">
			<Row>
				<Col span="8" offset="2">
					<Button size="large">取消</Button>
				</Col>
				<Col span="8" offset="2">
					<Button size="large" @click="save">保存</Button>
				</Col>
			</Row>	
		</div>
		<Footer/>
	</div>
</template>

<script>
import { CellGroup, Field, Row, Col, Button } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, CellGroup, Field, Row, Col,Button},
	data () {
		return {
			totalAmount: 16000.00,
			withdrawAmount: 0.00
		}
	},
	methods: {
        save () {
			this.$router.push('/statistics/withdrawInput');
        }
    }
}
</script>

<style scoped>
	p{
		font-size:14px;
		margin-left:15px;
	}
	.order{
		padding-top: 40px;
	}	
	.title{
		text-align: center;
		color: #6B8C43;
		font-size:18px;
		margin: 60px auto 20px;
	}
	.withdrawAll{
		color: #6B8C43;
		font-size:14px;
	}
	.van-field .van-cell__title {
		width:150px !important;
	}
	.van-field .van-cell__value {
	    padding-left: 150px !important;
	}
</style>
