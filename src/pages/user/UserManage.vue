<template>
	<div>
		<Header backUrl="/"/>
		<h2 class="sub_title">用户管理</h2>
		<div class="search_div">
			<Row>
				<Col span="5">
					<select class="selectText" v-model="type" @change="searchType">
						<option value=0>用户编号</option>
						<option value=1>用户手机</option>
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
		<div v-if="this.userCards.length == 0">
			<div class="container">
				<div class="item" @click="totalCodeUsers" >
					<div>总编号用户</div>
					<div>{{summar.tSeriUserCount}}</div>
				</div>
				<div class="item">
					<div>本月新增编号用户</div>
					<div>{{summar.mSeriUserCount}}</div>
				</div>
			</div>
			<div class="container">
				<div class="item" @click="totalOrderUsers">
					<div>总订单用户</div>
					<div>{{summar.tOrderUserCount}}</div>
				</div>
				<div class="empty">
					<div></div>
					<div></div>
				</div>
			</div>			
		</div>
		<div v-else>
			<div>		
				<UserCard v-for="userCard in userCards" :userCard="userCard" :currentCode="userCard.serialNo"/>	
			</div>		
		</div>
		<!-- <div class="new_code" v-if="userCard!=null&&userCard.id==null" @click="newCode">新建编号</div> -->
	</div>
</template>

<script>
import { Search, Row, Col, Button } from 'vant'
import Header from "../wechat/Header"
import UserCard from "./UserCard"
import MemberInfo from "./MemberInfo"
export default{
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, UserCard, MemberInfo },
	data () {
		return {
			summar:{},
			userCards:[],
			keyWords:"",
			type:0,
			searchTips:"请输入二维码编号"

		}
	},
	methods: {
	    onSearch () {
	    	if(this.keyWords){
	    		if(this.keyWords == 'null'){//只供显示用test
	    			this.userCards = [];
	    		}else{	    			
			    	var req = {};
				    req.userId = this.$store.state.userId;
				    req.pageNumber = 1;
				    req.pageSize = 10;
				    if(this.type==0){
				    	req.userNum=this.keyWords;
				    }else if(this.type==1){
						req.cellPhoneNum=this.keyWords;
				    }
					this.$api.user.pageSeriUsers(req)
					.then(res => {
					    if(res.code = "0000"){
					    	this.userCards = res.msg;
					    }	        
					})
					.catch(error => {
					    console.log(error);
					});		 		
	    		}

	    	}else{
	    		this.userCards=[];
	    	}

	    },
	    searchType(){
	    	if(this.type == 0){
	    		this.searchTips = "请输入编号";
	    		this.keyWords = "";
	    		this.userCards=[];
	    	}else if(this.type == 1){
				this.searchTips = "请输入手机号";
				this.keyWords = "";
				this.userCards=[];
	    	}
	    },
	    newCode(){
	    	this.$router.push('/user/newCode');
	    },
	    totalOrderUsers(){
	    	this.$router.push('/user/totalOrderUsers');
	    },
	    totalCodeUsers(){
	    	this.$router.push('/user/totalCodeUsers');
	    },
	    getSummar(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
			this.$api.user.summar(req)
			.then(res => {
			    if(res.code = "0000"){
			    	this.summar = res.msg;
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
	    	    
    },
    mounted(){
    	this.getSummar();
    }
}
</script>

<style scoped>
	.selectText{
		text-align: right;
	    font-size: 14px;
	    color: green;
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
	    color: green;
	    padding: 15px 15px 10px;
	}
	.container{
		display: flex;
		align-content: center;
		justify-content: space-around;
		color: #6B8C43;
	}
	.item{
		flex: 1;
		height: 40px;
		border: 1px solid #bbb;
		margin:10px;
		position: relative;
		padding:20px;
		font-size:14px;
		vertical-align: middle;
		text-align: center;
	}
	.empty{
		flex: 1;
		height: 40px;
		margin:10px;
		position: relative;
		padding:20px;
		font-size:14px;
		vertical-align: middle;
		text-align: center;
	}
	.tel_title{
		font-size:14px;
		color:#aaa;
		margin-left:15px;
	}
	.new_code{
		text-align: right;		
		font-size: 14px;
		color:#4CC78D;
		margin:10px 15px 0 0;

	}
</style>
