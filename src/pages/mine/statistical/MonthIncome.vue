<template>
	<div>
		<Header backUrl="/statistics"/>
		<p>本月收入（13000.00）</p>
		<div class="order">
			<Row>
				<Col span="16">
					2018.1.18 22:52:23
				</Col>
				<Col span="3">
					+15
				</Col>
				<Col span="5">
					余256.00
				</Col>				
			</Row>
			<p/>	
			<Row>
				<Col span="16">
					2018.1.18 22:52:23
				</Col>
				<Col span="3">
					+15
				</Col>
				<Col span="5">
					余256.00
				</Col>				
			</Row>				
		</div>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col} from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, Row, Col},
	data () {
		return {
		}
	},
	methods: {

    }
}
</script>

<style scoped>
	p{
		font-size:14px;
		margin:10px 0 10px 15px;
	}
	.order{
		font-size:14px;
		margin:10px 0 10px 15px;
	}


</style>
