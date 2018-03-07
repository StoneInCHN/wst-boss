<template>
	<div>
		<Header backUrl="/userManage"/>
		<div class="search_div">
			<Row>
				<Col span="5">
					<div class="search_title">总编号用户</div>
				</Col>
				<Col span="19">
					<Search v-model="keyWords" placeholder="输入用户编号搜索" 
							show-action background="#fff" @search="onSearch">
		  				<div slot="action" @click="onSearch" class="searchBtn">
		  					<Button type="primary" size="small">搜索</Button>
		  				</div>
					</Search>
				</Col>
			</Row>
		</div>
		<div v-for="memberInfo in memberInfoList">
				<MemberInfo1 :memberInfo="memberInfo"/>
		</div>								
		<p class="fixed">			
			<a @click="add" class="right">新建</a>
		</p>		
	</div>
</template>

<script>
import { Search, Row, Col, Button } from 'vant'
import Header from "../wechat/Header"
import MemberInfo1 from "./MemberInfo1"
export default{
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, MemberInfo1 },
	data () {
		return {
			memberInfoList:[{
				code:"100",
				address:"中铁西城19栋1658室",
				name:"习大大",
				tel:"1803026478,(028)662536,186458159",
				relation:false
			},{
				code:"101",
				address:"中德英伦联邦19栋1658室",
				name:"韩梅梅",
				tel:"1803026478,(028)662536,186458159",
				relation:true	
			}],
			keyWords:"",
			type:0,

		}
	},
	methods: {
	    onSearch () {
	    	        this.memberInfoList = [];
	    			let member1={};
	    			member1.tel="18030506785";
	    			member1.code="108";	    			
	    			member1.name="习大大";
	    			member1.address="中铁西城19栋1658室";
	    			member1.relation=true;
	    			this.memberInfoList.push(member1);
	    },
	    add() {
        	this.$router.push('/user/newCode');
	    }
    }
}
</script>

<style scoped>
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
