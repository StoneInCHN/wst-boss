<template>
	<div>
		<Header backUrl="/manage"/>
		<p>商品管理 <a @click="eidt" class="eidt">管理</a></p>
		<Tabs :active="active" type="card">
		  <Tab title="全部">
				<div>
					<img src="../../../assets/images/waterUp.png">
					<div>
						gjkjkh
					</div>
					<div>
						<span>￥12</span>
					</div>
				</div>
		  </Tab>
		  <Tab title="乐百氏">
		    内容
		  </Tab>
		  <Tab title="蓝剑">
		    内容
		  </Tab>
		  <Tab  title="蓝关">
		    内容
		  </Tab>
		  <Tab  title="农夫山泉">
		    内容
		  </Tab>
		</Tabs>
		<Footer/>
	</div>
</template>

<script>
import { Tab, Tabs, Stepper } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "Mine",
	components: { Header, Footer, Tab, Tabs, Stepper},
	data () {
		return {
			active: 0
		}
	},
	methods: {
	    eidt () {
	 		//
	    }

    }
}
</script>

<style scoped>
	p{
		font-size:14px;
		margin-left:15px;
	}
	.eidt{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}
	
</style>
