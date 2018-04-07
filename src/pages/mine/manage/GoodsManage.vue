<template>
	<div  class="goods">
		<Header backUrl="/manage"/>
		<p class="cell-title">商品管理 
			<a @click="manage" class="right">
				<span v-if="editable">完成</span>
				<span v-else>管理</span>
			</a>
		</p>
		<Tabs :active="active">
			<Tab v-for="(brand, index) in gList" :title="brand.brandName" :key="index">
				<GoodsCrumb v-for="(goods, index) in brand.gInfo" :goods="goods" :editable="editable" :editIds="editIds" :key="index"/>
			</Tab>	
		</Tabs>
		<p class="fixed" v-if="editable==false">			
			<a @click="add" class="right">新建</a>
		</p>
		<p class="fixed" v-else>			
			<Tabbar v-model="menu">
				<TabbarItem @click="goodsDel">删除</TabbarItem>
				<TabbarItem @click="goodsUp">上架</TabbarItem>
				<TabbarItem @click="goodsDown">下架</TabbarItem>
			</Tabbar>
		</p>
	</div>
</template>

<script>
import { Tabbar, TabbarItem, Tab, Tabs, Toast } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import GoodsCrumb from "./GoodsCrumb"
export default{
	name: "Mine",
	components: { Header, Footer, GoodsCrumb, Tab, Tabs, Tabbar, TabbarItem, Toast},
	data () {
		return {
			editable: false,
			active: 0,
			menu: 1,
			gList:[],
			editIds:[]
		}
	},
	methods: {
	    add () {
	 		this.$router.push('/manage/goodsEdit');
	    },
	    manage(){
	    	this.editable = !this.editable;
	    },
	    goodsDel(){
	    	//删除商品	    	
	    	if(this.editIds.length > 0){
	    		this.goodsEdit(this.editIds, 'DELETE');
	    		this.editable = !this.editable;
	    	}else{
	    		Toast.fail('请选择编辑项');
	    	}
	    },
	    goodsUp(){
	    	//商品上架	    	
	    	if(this.editIds.length > 0){
	    		this.goodsEdit(this.editIds, 'ON');
	    		this.editable = !this.editable;
	    	}else{
	    		Toast.fail('请选择编辑项');
	    	}
	    },
	    goodsDown(){
	    	//商品下架	    	
			if(this.editIds.length > 0){
	    		this.goodsEdit(this.editIds, 'OFF');
	    		this.editable = !this.editable;
	    	}else{
	    		Toast.fail('请选择编辑项');
	    	}
	    },
	    goodsEdit(editIds,status){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.oprStatus = status;
		    req.entityIds = editIds;
			this.$api.mine.editGStatus(req)
			.then(res => {
			    if(res.code = "0000"){
			    	Toast.success("操作成功");
			    	this.getGList();
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },
	    getGList(){	    	
	    	var req = {};
		    req.userId = this.$store.state.userId;
			this.$api.mine.getGList(req)
			.then(res => {
			    if(res.code = "0000"){
			    	var all = {};
			    	all.brandName = '全部';
			    	all.brandId = 0;
			    	var gInfo=[];
			    	for (var i = 0; i < res.msg.gList.length; i++) {
			    		for (var j = 0; j < res.msg.gList[i].gInfo.length; j++) {
			    			gInfo.push(res.msg.gList[i].gInfo[j]);
			    		}			    		
			    	}
			    	all.gInfo = gInfo;
			    	this.gList = [];
			    	this.gList.push(all);
			    	for (var i = 0; i < res.msg.gList.length; i++) {
			    		this.gList.push(res.msg.gList[i]);    		
			    	}
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});
	    }

    },
    mounted(){
    	this.getGList();
    	
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
	  color: #46af44;
	}
	.cell-title{
		margin:10px 0 10px 15px;
		font-size:14px;
	}
	.right{
		float:right;
		margin-right:15px;
		color: #46af44;
		font-size:14px;
	}	
	.goods {
		.van-tab--active {
		    color: #46af44;
		}
		.van-tabs__nav-bar {
    		background-color: #46af44;
  		}
  		.order-item-checkbox {
		    position: absolute;
		    .van-checkbox__control:checked + .van-icon-success {
		      border-color: #46af44;
		      background-color: #46af44;
		    }
		  }
	}

</style>
