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
						<Search v-model="keyWords" placeholder="输入用户编号搜索" 
								show-action background="#fff" @search="onSearch"  @focus='numKeyboard'>
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
		<NumberKeyboard
		  :show="show"
		  extra-key="."
		  close-button-text="完成"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
		/>		
	</div>
</template>

<script>
import { Search, Row, Col, Button, Toast , NumberKeyboard} from 'vant'
import Header from "../wechat/Header"
import MemberInfo1 from "./MemberInfo1"
import {mapGetters} from 'vuex'
export default{
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, MemberInfo1, Toast , NumberKeyboard},
	data () {
		return {
			memberInfoList:[],
			//keyWords:"",
			keyWordObj:[],
			type:0,
			show:false

		}
	},
	computed:{
		    ...mapGetters([ "userId"]),
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
	    	this.pageSeriUsers();   	
	    },
	    add() {
        	this.$router.push('/user/newCodeUser');
	    },
	    pageSeriUsers(){
	    	var req = {};
		    req.userId = this.userId;
		    req.pageNumber = 1; 
		    req.pageSize = 10
		    if(this.keyWords != ""){
		    	req.userNum=this.keyWords;
		    }
			this.$api.user.pageSeriUsers(req)
			.then(res => {
			    // if(res.code = "0000"){
			          this.memberInfoList = res;
			    // }	        
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
		margin-bottom: 50px;
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
