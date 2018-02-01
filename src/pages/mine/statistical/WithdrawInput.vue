<template>
	<div>
		<Header backUrl="/statistics/withdrawView"/>
		<CellGroup>
		  <Field
		    label="到账账号"
		    placeholder="请输入卡号"
		    value="465153743120078"
		    icon="add"
		    disabled
		    @click-icon="addAccount"
		  />
		 </CellGroup>
		 <p>提现金额</p>
		 <CellGroup>
		   <Field style="right:0"
		    label="￥"
		    v-model="withdrawAmount"
		    icon="clear"
		  />
		</CellGroup>
		<p>可提现资产￥{{totalAmount}}，<span class="withdrawAll" @click="withdrawAll">全部提现</span></p>

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
import { CellGroup, Field, Row, Col, Button } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "WithdrawInput",
	components: { Header, Footer, CellGroup, Field, Row, Col,Button},
	data () {
		return {
			totalAmount: 16000.00,
			withdrawAmount: 0.00
		}
	},
	methods: {
        withdraw () {
            this.$router.push("");
        },
        withdrawAll () {
            this.withdrawAmount = 16000.00;
        },
        addAccount () {
			this.$router.push('/statistics/addAccount');
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
</style>
