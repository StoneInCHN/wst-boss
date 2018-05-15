<template>
	<div>
		<Header backUrl="/"/>
		<br>
		<div class="container">
			<div class="item item-left" @click="goodsManage">
				<span>商品管理</span>
			</div>
<!-- 			<div class="item item-middle" @click="ticketManage">
				<span>水票管理</span>
			</div> -->
			<div class="item item-middle" @click="userManage">
				<span>用户管理</span>
			</div>
			<div class="item item-right" @click="workerManage">
				<span>员工管理</span>
			</div>
		</div>
		<div class="container">
			<div class="item item-left" @click="storeManage">
				<span>店铺管理</span>
			</div>
			<div class="item item-right" @click="qrManage">
				<span>二维码管理</span>
			</div>
			<div class="item_empty item-right">
				<span></span>
			</div>
		</div>
		<Footer/>
	</div>
</template>

<script>
import {} from 'vant';
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
		userManage(){
			this.$router.push("/userManage")
		},
	    goodsManage () {
	 		this.$router.push('/manage/goodsManage');
	    },
	    ticketManage () {
	 		this.$router.push('/manage/ticketManage');
	    },
	    storeManage () {
	 		this.$router.push('/manage/storeManage');
	    },
	    workerManage () {
	 		this.$router.push('/manage/workerManage');
	    },
	    qrManage () {
	 		this.$router.push('/manage/qrManage');
	    }
	    

    }
}
</script>

<style scoped>
	.container{
		display: flex;
		align-content: center;
		justify-content: space-around;
		color: #6B8C43;
	}
	.item_empty{
		text-align: center;
		flex: 1;
		height: 60px;
		line-height: 35px;
		
		position: relative;
		padding:10px;
		font-size:14px;
		vertical-align: middle;
		position: relative;
    	box-sizing: border-box;
    	background-color: #fff;
    	
	}
	.item{
		text-align: center;
		flex: 1;
		height: 60px;
		line-height: 35px;
		border: 1px solid #ccc;
		position: relative;
		padding:10px;
		font-size:14px;
		vertical-align: middle;
		position: relative;
    	box-sizing: border-box;
    	background-color: #fff;
    	box-shadow: 0 0 4px #aaa;
    	border-radius: 3px;
	}
	.item-left{
		margin:10px 5px 10px 10px;
	}
	.item-middle{
		margin:10px 5px;
	}
	.item-right{
		margin:10px 10px 10px 5px;
	}
</style>
