<template>
	<div>
		<Header backUrl="/manage/goodsManage"/>
		<Panel title="编辑" status="状态">
			<div slot="header">
				<Cell title="编辑" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="品牌" v-model="goods.goodsBrand" placeholder="请选择"  @click="showAllBrand"/>
				  <Field label="子产品" v-model="goods.goodsName" placeholder="请选择"  @click="showAllGoodsName"/>
				  <Field label="规格" v-model="goods.size" placeholder="请选择"  @click="showAllSize"/>
				  <Field label="原价"  v-model="price" disabled/>
				  <Field label="折扣价"  placeholder="请输入折扣价，可不用填写"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="brand" :actions="allBrand" cancel-text="取消"/>
		<Actionsheet  v-model="goodsName" :actions="allGoodsName" cancel-text="取消"/>
		<Actionsheet  v-model="size" :actions="allSize" cancel-text="取消"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet},
	data () {
		return {
			goods: {
				status:0,
				goodsBrand:"蓝剑",
				goodsName:"冰川时代",
				size:"17L",
				price:17.2,
				salePrice:16,
				goodsUrl:"../../../assets/images/water.png"
			},
			price:"",
			brand:false,
			goodsName:false,
			size:false,
			allBrand:[
		        { name: '农夫山泉', callback: this.setBrand },
		        { name: '蓝剑', callback: this.setBrand },
		        { name: '蓝光', callback: this.setBrand },
		        { name: '乐百氏', callback: this.setBrand }
		      ],
		    allGoodsName:[
		        { name: '冰川时代', callback: this.setGoodsName },
		        { name: '蓝剑矿泉水', callback: this.setGoodsName },
		        { name: '蓝剑纯净水', callback: this.setGoodsName }
		      ],
		    allSize:[
		        { name: '15L', callback: this.setSize },
		        { name: '18L', callback: this.setSize }
		      ],
		}
	},
	methods: {
        save () {
			this.$router.push('/manage/goodsManage');
        },
        formatPrice(num){
	    	return "￥"+num.toFixed(2);
	    },
	    showAllBrand(){
	    	this.brand = true;
	    },
	    showAllGoodsName(){
	    	this.goodsName = true;
	    },
	    showAllSize(){
	    	this.size = true;
	    },
	    setBrand(item) {
	      	this.goods.goodsBrand = item.name;
	    },
	    setGoodsName(item) {
	      	this.goods.goodsName = item.name;
	    },   
	    setSize(item) {
	      	this.goods.size = item.name;
	    }
    },
    mounted(){
    	this.price = this.formatPrice(this.goods.price);
            
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}
	p{
		font-size:14px;
		margin-left:15px;
	}
	.order{
		padding-top: 40px;
	}	
	.title{
		text-align: center;
		color: #6B8C43;
		font-size:18px;
		margin: 60px auto 20px;
	}
	.withdrawAll{
		color: #6B8C43;
		font-size:14px;
	}
	.van-field .van-cell__title {
		width:150px !important;
	}
	.van-field .van-cell__value {
	    padding-left: 150px !important;
	}
	.sub_title {
	    margin: 0;
	    font-weight: 400;
	    font-size: 14px;
	    color: rgba(69,90,100,.6);
	    padding: 40px 15px 10px;
	}
</style>
