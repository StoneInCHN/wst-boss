<template>
	<div>
		<Header backUrl="/statistics"/>
		<p>本月提成支出（5000.00）<a @click="all" class="all">全部</a></p>
		<div class="order">
			<Row>
				<Col span="18">
					<div class="text">星雅俊苑19栋1901室</div>
					<div class="text">2018.1.18 22:52:23</div>
				</Col>
				<Col span="3">
					<br/>-5
				</Col>
				<Col span="3">
					<br/>王三
				</Col>				
			</Row>
			<p/>	
			<Row>
				<Col span="18">
					<div class="text">中德英伦联邦19栋1901室</div>
					<div class="text">2018.1.18 22:52:23</div>
				</Col>
				<Col span="3">
					<br/>-5
				</Col>
				<Col span="3">
					<br/>李四
				</Col>				
			</Row>			
		</div>
		<ActionSheet  v-model="show" :actions="workers" cancel-text="取消"/>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col, ActionSheet, Toast } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, Row, Col, ActionSheet, Toast },
	data () {
		return {
			show:false,
			workers:[
		        {
		          name: '张三',
		          callback: this.onClick
		        },
		        {
		          name: '李四',
		          callback: this.onClick
		        },
		        {
		          name: '小吴',
		          callback: this.onClick
		        }
		      ]
		}
	},
	methods: {
		all(){
			this.show = true;
		},
		onClick(item) {
	      Toast(item.name);
	    }
    }
}
</script>

<style scoped>
	.text{
		margin:2px 0;
	}
	p{
		font-size:14px;
		margin:10px 0 10px 15px;
	}
	.order{
		font-size:14px;
		margin:10px 0 10px 15px;
	}
	.all{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}


</style>
