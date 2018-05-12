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
							show-action background="#fff" @search="onSearch" @focus='numKeyboard'>
		  				<div slot="action" @click="onSearch" class="searchBtn">
		  					<Button type="primary" size="small">搜索</Button>
		  				</div>
					</Search>
				</Col>
			</Row>
		</div>
		<div v-if="this.userCards.length == 0">
			<div class="container">
				<div class="item item-left" @click="totalCodeUsers" >
					<div>总编号用户</div>
					<div>{{summar.tSeriUserCount}}</div>
				</div>
				<div class="item item-right">
					<div>本月新增编号用户</div>
					<div>{{summar.mSeriUserCount}}</div>
				</div>
			</div>
			<div class="container">
				<div class="item item-left" @click="totalOrderUsers">
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
				<UserCard v-for="userCard in userCards" :key="userCard.id" :userCard="userCard" :currentCode="userCard.serialNo"  @refreshSeriUsers="searchUser"/>
			</div>		
		</div>
		<NumberKeyboard
		  :show="show"
		  extra-key="."
		  close-button-text="完成"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
		/>
		<Footer/>
	</div>
</template>

<script>
import { Search, Row, Col, Button, NumberKeyboard  } from 'vant'
import Header from "../wechat/Header"
import Footer from "../wechat/Footer"
import UserCard from "./UserCard"
import MemberInfo from "./MemberInfo"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "UserManage",
	components: { Header, Footer, Search, Row, Col, Button, UserCard, MemberInfo, NumberKeyboard  },
	data () {
		return {
			summar:{},
			userCards:[],
			//keyWords:"",
			keyWordObj:[],
			type:0,
			searchTips:"请输入二维码编号",
			show:false

		}
	},
	computed:{
            keyWords: {
			    get: function () {
			      return this.keyWordObj.join('');
			    },
			    set: function () {
			    }
			}
    },
	methods: {
		onInput(value){
			this.keyWordObj.push(value);
		},
		onDelete(){
			this.keyWordObj.pop();
		},
		numKeyboard(){
			document.activeElement.blur();
			this.show = true;
		},
	    onSearch () {
	    	if(this.keyWords){
	    		if(this.keyWords == 'null'){//只供显示用test
	    			this.userCards = [];
	    		}else{	    			
	 				this.searchUser();
	    		}
	    	}else{
	    		this.userCards=[];
	    	}
	    },
	    searchUser(){
			    	var req = {};
				    req.userId = this.userId;
				    req.pageNumber = 1;
				    req.pageSize = 10;
				    if(this.type==0){
				    	req.userNum=this.keyWords;
				    }else if(this.type==1){
						req.cellPhoneNum=this.keyWords;
				    }
					this.$api.user.pageSeriUsers(req)
					.then(res => {
					    //if(res.code = "0000"){
					    	this.userCards = res;
					    //}	        
					})
					.catch(error => {
					    console.log(error);
					});	
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
		    req.userId = this.userId;
		    //alert("userId:"+this.userId);
			this.$api.user.summary(req)
			.then(res => {
				this.summar = res;        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
	    	    
    },
    mounted(){
    	this.getSummar();
    	this.$store.state.couponGoods = {};
    	this.$store.state.couponGoodsList = [];
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
		position: relative;
		padding:20px;
		font-size:14px;
		vertical-align: middle;
		text-align: center;
		border-radius: 3px;
	}
	.item-left{
		margin:10px 5px 10px 10px;
	}
	.item-right{
		margin:10px 10px 10px 5px;
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
