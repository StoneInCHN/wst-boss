<template>
	<div>
		<Header backUrl="/manage"/>
		<p>商品管理 
			<a @click="manage" class="right">
				<span v-if="editable">取消</span>
				<span v-else>管理</span>
			</a>
		</p>
		<Tabs :active="active">
			<Tab v-for="(brand, index) in allBrands" :title="brand.brandName" :key="index">
				<GoodsCrumb v-for="(goods, index) in goodsList" :goods="goods" :editable="editable" :key="index"/>
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
import { Tabbar, TabbarItem, Tab, Tabs } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import GoodsCrumb from "./GoodsCrumb"
export default{
	name: "Mine",
	components: { Header, Footer, GoodsCrumb, Tab, Tabs, Tabbar, TabbarItem},
	data () {
		return {
			editable: false,
			active: 0,
			menu: 1,
			allBrands:[{
				id: 0,
				brandName: "全部"
			},{
				id: 1,
				brandName: "乐百氏"
			},{
				id: 2,
				brandName: "蓝剑"
			},{
				id: 3,
				brandName: "蓝关"
			},{
				id: 4,
				brandName: "农夫山泉"
			}],
			goodsList:[{
				status:0,
				goodsName:"冰川时代",
				deposit:20,
				price:17.2,
				salePrice:16,
				goodsUrl:"../../../assets/images/water.png"
			},{
				status:1,
				goodsName:"蓝剑矿泉水（15L）",
				deposit:20,
				price:18.5,
				salePrice:15,
				goodsUrl:"../../../assets/images/water1.png"
			}]
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
	    	this.editable = !this.editable;
	    },
	    goodsUp(){
	    	//商品上架
	    	this.editable = !this.editable;
	    },
	    goodsDown(){
	    	//商品下架
	    	this.editable = !this.editable;
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
	p{
		font-size:14px;
		margin-left:15px;
	}
	.right{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}
	.goods, .goods_thumb, .goods_row {
	    display: flex;
	}
	.goods_content {
	    width: 100%;
	}
	.goods {
	    color: #333;
	    height: 120px;
	    font-size: 16px;
	    background: #fafafa;
	    position: relative;
	    box-sizing: border-box;
	    padding: 15px 15px 5px 115px;
	}
	.goods_thumb {
	    top: 15px;
	    left: 15px;
	    width: 90px;
	    height: 90px;
	    position: absolute;
	}
	.goods--center, .goods_thumb {
	    align-items: center;
	    justify-content: center;
	}
	.goods_title {
	    max-height: 40px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.goods_edit {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 80px;
	    line-height: 20px;
	    text-align: right;
	}
	.goods_price {
	    color: #666;
	    font-size: 12px;
	    max-height: 20px;
	    margin-top:20px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.goods_price span{
		padding-left: 5px;
		text-decoration: line-through;
	}
</style>
