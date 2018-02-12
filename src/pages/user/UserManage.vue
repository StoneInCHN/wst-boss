<template>
	<div>
		<Header backUrl="/"/>
		<h2 class="sub_title">用户管理</h2>
		<div class="search_div">
			<Row>
				<Col span="5">
					<select class="selectText" v-model="type" @change="searchType">
						<option value="0">用户编号</option>
						<option value="1">用户手机</option>
						<option value="2">用户地址</option>
					</select>
				</Col>
				<Col span="19">
					<Search v-model="keyWords" :placeholder="searchTips" 
							show-action background="#fff" @search="onSearch">
		  				<div slot="action" @click="onSearch" class="searchBtn">
		  					<Button type="primary" size="small">搜索</Button>
		  				</div>
					</Search>
				</Col>
			</Row>
		</div>
		<div v-if="userCard.id == null">
			<div class="container">
				<div class="item" >
					<span>店铺总用户 3653</span>
				</div>
				<div class="item">
					<span>本月新增用户 368</span>
				</div>
			</div>
			<div class="container">
				<div class="item">
					<span>本月活跃用户 1859</span>
				</div>
				<div class="item">
					<span>两月未订水用户 20</span>
				</div>
			</div>
			<div class="container">
				<div class="item">
					<span>编号用户 256</span>
				</div>
				<div class="empty">
					<span></span>
				</div>
			</div>			
		</div>
		<div v-else>
			<UserCard :userCard="userCard"/>
		</div>

		<Footer/>
	</div>
</template>

<script>
import { Search, Row, Col, Button } from 'vant'
import Header from "../wechat/Header"
import Footer from "../wechat/Footer"
import UserCard from "./UserCard"
export default{
	name: "UserManage",
	components: { Header, Footer, Search, Row, Col, Button, UserCard },
	data () {
		return {
			userCard:{
				id:null,
				code:null,
				tel:null,
				address:null,
				name:null
			},
			keyWords:"",
			type:0,
			searchTips:"请输入用户编号"

		}
	},
	methods: {
	    onSearch () {
	    	if(this.keyWords){
		    	this.userCard.id=1;
		 		this.userCard.code=this.keyWords;
		 		this.userCard.tel=["18030506785","13542589685"];
		 		this.userCard.address="中德英伦联邦19栋1345室";
		 		this.userCard.name="王麻子";
	    	}else{
	    		this.userCard.id=null;
		 		this.userCard.code=null;
		 		this.userCard.tel=null;
		 		this.userCard.address=null;
		 		this.userCard.name=null;
	    	}

	    },
	    searchType(){
	    	if(this.type == 0){
	    		this.searchTips = "请输入用户编号";
	    	}else if(this.type == 1){
				this.searchTips = "请输入用户手机号";
	    	}else if(this.type == 2){
				this.searchTips = "请输入用户地址";
	    	}
	    }
	    

    }
}
</script>

<style scoped>
	.selectText{
		text-align: right;
	    font-size: 14px;
	    color: #aaa;
	    margin-top: 8px;
	    margin-left: 10px;
	}
	.searchBtn{
		margin-left: 10px;
	}
	.search_div{
		margin: 0 15px;
	}
	.sub_title {
	    margin: 0;
	    font-weight: 400;
	    font-size: 14px;
	    color: #4CC78D;;
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
	.empty{
		flex: 1;
		height: 60px;
		border-width: 0px;
		margin:10px;
		position: relative;
		padding:10px;
		vertical-align: middle;
	}
</style>
