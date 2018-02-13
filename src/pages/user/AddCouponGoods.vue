<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加商品" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="品牌" v-model="goods.goodsBrand" placeholder="请填选择品牌"  @click="showAllBrand"/>
				  <Field label="子产品" v-model="goods.goodsName" placeholder="请填选择子产品" @click="showAllGoodsName"/>
				  <Field label="规格" v-model="goods.size" placeholder="请填选择规格" @click="showAllSize"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="brand" :actions="allBrand" cancel-text="取消"/>
		<Actionsheet  v-model="goodsName" :actions="allGoodsName" cancel-text="取消"/>
		<Actionsheet  v-model="size" :actions="allSize" cancel-text="取消"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet } from 'vant'
import Header from "../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet},
	data () {
		return {
			goods: {
				goodsBrand:null,
				goodsName:null,
				size:null,
			},
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
		    ]
		}
	},
	methods: {
        save () {
			this.$router.push('/user/addCoupon');
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
	      	this.brand = false;
	      	console.info(this.brand);
	    },
	    setGoodsName(item) {
	      	this.goods.goodsName = item.name;
	      	this.goodsName = false;
	    },   
	    setSize(item) {
	      	this.goods.size = item.name;
	      	this.size = false;
	    }
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
</style>
