<template>
	<div>
		<Header backUrl="/userManage"/>
		<div class="totalCode">
			<div class="search_div">
				<Row>
					<Col span="5">
						<div class="search_title">总编号用户</div>
					</Col>
					<Col span="19">
						<Search v-model="keyWords" placeholder="输入用户编号" 
								show-action background="#fff" @search="onSearch">
			  				<div slot="action" @click="onSearch" class="searchBtn">
			  					<Button type="primary" size="small">搜索</Button>
			  				</div>
						</Search>
					</Col>
				</Row>
			</div>
			<div v-for="memberInfo in memberInfoList">
					<MemberInfo1 :memberInfo="memberInfo" @refreshSeriUsers="pageSeriUsers"/>
			</div>
		</div>								
		<p class="fixed">			
			<a @click="add" class="right">新建</a>
		</p>
		<NumInput :show="show" :input="keyWords" extraKey="" @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import { Search, Row, Col, Button, Toast} from 'vant'
import Header from "../wechat/Header"
import MemberInfo1 from "./MemberInfo1"
import {mapGetters} from 'vuex'
import NumInput from "../../components/NumInput"
export default{
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, MemberInfo1, Toast , NumInput},
	data () {
		return {
			memberInfoList:[],
			keyWordObj:[],
			type:0,
			show:false,
			keyWords:"",

		}
	},
	computed:{
		    ...mapGetters([ "userId"]),
    },
	methods: {
		inputKey(value){
			this.keyWords = value;
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(){
			document.activeElement.blur();
			this.show = true;
		},
	    onSearch () {
	    	this.pageSeriUsers();   	
	    },
	    add() {
        	this.$router.push('/user/newCodeUser');
	    },
	    pageSeriUsers(){
	    	var req = {};
		    req.userId = this.userId;
		    req.pageNumber = 1; 
		    req.pageSize = 100
		    if(this.keyWords != ""){
		    	req.userNum=this.keyWords;
		    }
			this.$api.user.pageSeriUsers(req)
			.then(res => {
			        this.memberInfoList = res;
				    Toast.success("操作成功");        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
    },
    mounted(){
    	this.pageSeriUsers();
    }
}
</script>

<style scoped>
	.totalCode{
		padding-bottom: 80px;
	}
	.fixed {
	  position: fixed;
	  width:100%;
	  bottom: 0;
	  right: 0;
	  background-color: #fafafa;
	  padding: 10px 0;
	  margin: 0;
	}
	.right{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}	
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
