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
				<MemberInfo :memberInfo="memberInfo" :type="type" :currentCode="memberInfo.code"/>
			</div>								
				
	</div>
</template>

<script>
import { Search, Row, Col, Button } from 'vant'
import Header from "../wechat/Header"
import MemberInfo from "./MemberInfo"
export default{
	name: "UserManage",
	components: { Header, Search, Row, Col, Button, MemberInfo },
	data () {
		return {
			memberInfoList:[{
				tel:"18030506785",
				code:"108",
				name:"习大大",
				address:"中铁西城19栋1658室",
				createAt:"2018.01.18 21:45:36"
			},{
				tel:"18030506785",
				code:"108",
				name:"习大大",
				address:"中铁西城19栋1658室",
				createAt:"2018.01.18 21:45:36"				
			}],
			keyWords:"",
			type:0,

		}
	},
	methods: {
	    onSearch () {
	    			let member1={};
	    			member1.tel="18030506785";
	    			member1.code="108";	    			
	    			member1.name="习大大";
	    			member1.address="中铁西城19栋1658室";
	    			member1.createAt="2018.01.18 21:45:36";
	    			this.memberInfoList.push(member1);
	    }  
    }
}
</script>

<style scoped>
	.searchBtn{
		margin-left: 10px;
	}
	.search_div{
		margin: 0 15px;
		font-size: 14px;
	}
	.search_title{
		padding: 10px 0px;
	}
</style>
