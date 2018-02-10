<template>
	<div>
		<Header backUrl="/"/>
		<h2 class="sub_title">管理</h2>
		<div class="container">
			<div class="item" @click="goodsManage">
				<span>商品管理</span>
			</div>
			<div class="item" @click="ticketManage">
				<span>水票管理</span>
			</div>
			<div class="item">
				<span>员工管理</span>
			</div>
		</div>
		<div class="container">
			<div class="item">
				<span>店铺管理</span>
			</div>
			<div class="item">
				<span>用户管理</span>
			</div>
			<div class="item">
				<span>二维码管理</span>
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "Manage",
	components: { Header, Footer },
	data () {
		return {


		}
	},
	methods: {
	    goodsManage () {
	 		this.$router.push('/manage/goodsManage');
	    },
	   ticketManage () {
	 		this.$router.push('/manage/ticketManage');
	    }

    }
}
</script>

<style scoped>
	.sub_title {
	    margin: 0;
	    font-weight: 400;
	    font-size: 14px;
	    color: rgba(69,90,100,.6);
	    padding: 40px 15px 10px;
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
