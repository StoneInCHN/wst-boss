<template>
	<div>
		<Header backUrl="/userManage"/>
		<div class="search_div">
			<Row>
				<Col span="5">
					<div class="search_title">总订单用户</div>
				</Col>
				<Col span="19">
					<Search v-model="keyWords" placeholder="输入手机号搜索" 
							show-action background="#fff" @search="onSearch">
		  				<div slot="action" @click="onSearch" class="searchBtn">
		  					<Button type="primary" size="small">搜索</Button>
		  				</div>
					</Search>
				</Col>
			</Row>
		</div>
			<div v-for="memberInfo in memberInfoList">
				<MemberInfo :memberInfo="memberInfo" :type="type" :currentCode="memberInfo.serialNo"/>
			</div>								
				
	</div>
</template>

<script>
import { Search, Row, Col, Button } from 'vant'
import Header from "../wechat/Header"
import MemberInfo from "./MemberInfo"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, MemberInfo },
	data () {
		return {
			memberInfoList:[],
			keyWords:"",
			type:0,

		}
	},
	methods: {
	    onSearch () {
	    	this.pageShopUsers();
	    },
	    pageShopUsers(){
	    	var req = {};
		    req.userId = this.userId;
		    req.pageNumber = 1; 
		    req.pageSize = 5
		    if(this.keyWords != ""){
		    	req.cellPhoneNum=this.keyWords;
		    }
			this.$api.user.pageShopUsers(req)
			.then(res => {
				console.info(res);
			    //if(res.code = "0000"){
			    	this.memberInfoList = res;
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
    },
    mounted(){
    	this.pageShopUsers();
    }
}
</script>

<style scoped>
	.searchBtn{
		margin-left: 10px;
	}
	.search_div{
		margin: 15px;
		font-size: 14px;
	}
	.search_title{
		padding: 10px 0px;
	}
</style>
