<template>
	<div>
		<Header backUrl="/manage/goodsManage"/>
		<Panel>
			<div slot="header">
				<Cell title="编辑" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="品牌" v-model="goods.brandName" placeholder="请选择"  @click="showAllBrand"/>
				  <Field label="子产品" v-model="goods.gName" placeholder="请选择"  @click="showAllGoodsName"/>
				  <Field label="规格" v-model="goods.specName" placeholder="请选择"  @click="showAllSize"/>
				  <Field label="原价"  v-model="goods.originPrice" placeholder="请输入原价"/>
				  <Field label="折扣价" v-model="goods.distPrice" placeholder="请输入折扣价，可不用填写"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="brand" :actions="allBrand" cancel-text="取消"/>
		<Actionsheet  v-model="goodsName" :actions="allGoodsName" cancel-text="取消"/>
		<Actionsheet  v-model="size" :actions="allSize" cancel-text="取消"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet,Toast } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet, Toast},
	data () {
		return {
			goods: {},
			price:"",
			brand:false,
			goodsName:false,
			size:false,
			allBrand:[],
		    allGoodsName:[],
		    allSize:[]
		}
	},
	methods: {
        save () {
        	if(this.goods.id ==null){
        		console.info("addWG");
        		this.addWG();
        	}else{
        		console.info("editWG");
				this.editWG();
        	}			
        },
        formatPrice(num){
        	if(num){
        		return "￥"+num.toFixed(2);
        	}
	    	return null;
	    },
	    showAllBrand(){
	    	this.brand = true;
	    },
	    showAllGoodsName(){
	    	if(this.goods.brandName){
	    		this.goodsName = true;
	    	}else{
	    		Toast.fail("请先选择品牌");
	    	}	    	
	    },
	    showAllSize(){
	    	if(this.goods.gName){
	    		this.size = true;
	    	}else{
	    		Toast.fail("请先选择子产品");
	    	}
	    },
	    setBrand(item) {
	      	this.goods.brandName = item.name;
	      	this.goods.brandId = item.id;
	      	this.getAllGoodsName(item.id)
	      	this.brand = false;
	    },
	    setGoodsName(item) {
	      	this.goods.gName = item.name;
	      	this.getSpec(item.id);
	      	this.goodsName = false;
	    },   
	    setSize(item) {
	      	this.goods.specName = item.name;
	      	this.goods.specId = item.id;
	      	this.size = false;
	    },
	    getAllBrand(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
			this.$api.mine.getWBrand(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allBrand = [];
			    	for (var i = 0; i < res.brands.length; i++) {
			    		var b = {};	
			    		b.id = res.brands[i].id;		    		
			    		b.name = res.brands[i].name;
			    		b.callback= this.setBrand;
			    		this.allBrand.push(b);
			    	}
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },
	    getAllGoodsName(brandId){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = brandId;
			this.$api.mine.getWBrand(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allGoodsName = [];
			    	for (var i = 0; i < res.brands.length; i++) {
			    		var b = {};	
			    		b.id = res.brands[i].id;		    		
			    		b.name = res.brands[i].name;
			    		b.callback= this.setGoodsName;
			    		this.allGoodsName.push(b);
			    	}
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },
	    getSpec(goodsNameId){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = goodsNameId;
			this.$api.mine.getSpec(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allSize = [];
			    	for (var i = 0; i < res.specs.length; i++) {
			    		var b = {};	
			    		b.id= res.specs[i].id;		    		
			    		b.name = res.specs[i].specValue+res.specs[i].unit;
			    		b.callback= this.setSize;
			    		this.allSize.push(b);
			    	}
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },  
	    addWG(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.brandId = this.goods.brandId;
		    req.brandName = this.goods.brandName;
		    req.gName = this.goods.gName;
		    req.specId = this.goods.specId;
		    req.originPrice = this.goods.originPrice;
		    req.distPrice = this.goods.distPrice;
			this.$api.mine.addWG(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	Toast.success("新增成功");
			    	this.$router.push('/manage/goodsManage');
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    },
	    editWG(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.brandId = this.goods.brandId;
		    req.brandName = this.goods.brandName;
		    req.gName = this.goods.gName;
		    req.specId = this.goods.specId;
		    req.originPrice = this.goods.originPrice;
		    req.distPrice = this.goods.distPrice;
		    req.id= this.goods.id;
			this.$api.mine.addWG(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	Toast.success("更新成功");
			    	this.$router.push('/manage/goodsManage');
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
    },
    mounted(){
    	this.getAllBrand(); 
    	this.price = this.formatPrice(this.goods.originPrice);
    	this.goods = this.$store.state.goods;
          
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
