<template>
	<div  class="goods">
		<Header backUrl="/manage"/>
		<p class="cell-title">商品管理 
			<a @click="manage" class="right">
				<span v-if="editable">完成</span>
				<span v-else>管理</span>
			</a>
		</p>
		<Tabs :active="active" style="padding-bottom:50px" v-if="gList.length > 0">
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
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "Mine",
	components: { Header, Footer, GoodsCrumb, Tab, Tabs, Tabbar, TabbarItem, Toast},
	data () {
		return {
			editable: false,
			active: 0,
			menu: 1,
			gList:[],
			editIds:[],
			all:{},
			allgInfo:[],
		}
	},
	methods: {
	    add () {
	    	this.$store.state.goods = {};
	 		this.$router.push('/manage/goodsEdit');
	    },
	    manage(){
	    	this.editable = !this.editable;
	    },
	    canDel(){
	    	let canDel = true;
	    	for (var i = 0; i < this.editIds.length; i++) {
			    for (var j = 0; j < this.allgInfo.length; j++) {
			    	if(this.editIds[i]==this.allgInfo[j].id && this.allgInfo[j].gStatus == 'ON'){
			    		Toast.fail('编辑项包含上架商品，不能删除');
						canDel=false;
						break;
			    	}	    		
				}   		
			}
			return canDel;
	    },
	    checkedLength(){
	    	if(this.editIds.length == 0){
				Toast.fail('请选择编辑项');
				return false;
	    	}
	    	return true;
	    },
	    goodsDel(){
	    	if(!this.checkedLength()){
	    		return;
	    	}
	    	if(this.canDel()){
		    	this.goodsEdit(this.editIds, 'DELETE');
		    	this.editable = !this.editable;
	    	}
	    },
	    goodsUp(){
	    	if(!this.checkedLength()){
	    		return;
	    	}
	    	//商品上架	    	
	    		this.goodsEdit(this.editIds, 'ON');
	    		this.editable = !this.editable;
	    },
	    goodsDown(){
	    	if(!this.checkedLength()){
	    		return;
	    	}
	    	//商品下架	    	
	    		this.goodsEdit(this.editIds, 'OFF');
	    		this.editable = !this.editable;
	    },
	    goodsEdit(editIds,status){
	    	var req = {};
		    req.userId = this.userId;
		    req.oprStatus = status;
		    req.entityIds = editIds;
			this.$api.mine.editGStatus(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	Toast.success("操作成功");
			    	this.getGList();
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },
	    getGList(){	
	    	var req = {};
		    req.userId = this.userId;
			this.$api.mine.getGList(req)
			.then(res => {
				if(res == null){
					this.gList = [];
					return;
				}
			    //if(res.code = "0000"){
			    	this.all = {};//全部商品
			    	this.allgInfo = [];
			    	this.all.brandName = '全部';
			    	this.all.brandId = 0;
			    	for (var i = 0; i < res.gList.length; i++) {
			    		for (var j = 0; j < res.gList[i].gInfo.length; j++) {
			    			res.gList[i].gInfo[j].brandName = res.gList[i].brandName;
			    			this.allgInfo.push(res.gList[i].gInfo[j]);
			    		}			    		
			    	}
			    	this.all.gInfo = this.allgInfo;
			    	this.gList = [];
			    	this.gList.push(this.all);
			    	for (var i = 0; i < res.gList.length; i++) {
			    		this.gList.push(res.gList[i]);    		
			    	}
			    //}	        
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
