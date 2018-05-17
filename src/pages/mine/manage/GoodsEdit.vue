<template>
	<div>
		<Header backUrl="/manage/goodsManage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="编辑" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="品牌" v-model="goods.brandName" placeholder="请选择"  @click="showAllBrand" @focus='hideKeyBoard'/>
				  <Field label="子产品" v-model="goods.gName" placeholder="请选择"  @click="showAllGoodsName" @focus='hideKeyBoard'/>
				  <Field label="规格" v-model="goods.specName" placeholder="请选择"  @click="showAllSize" @focus='hideKeyBoard'/>
				  <Field label="原价"  v-model="originPrice"  placeholder="请输入原价" @focus='numKeyboard("originPrice")'/>
				  <Field label="折扣价" v-model="distPrice" placeholder="请输入折扣价，可不用填写"  @focus='numKeyboard("distPrice")' :error-message="tips"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="brand" :actions="allBrand" cancel-text="取消"/>
		<Actionsheet  v-model="goodsName" :actions="allGoodsName" cancel-text="取消"/>
		<Actionsheet  v-model="size" :actions="allSize" cancel-text="取消"/>
		<NumInput :show="show" :input="keyWords" extraKey="."  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet,Toast } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import {mapGetters} from 'vuex'
import NumInput from "../../../components/NumInput"
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "AddAccount",
	components: { Header, Footer, Panel, CellGroup, Field, Button, Cell, Icon, Actionsheet, Toast,NumInput},
	data () {
		return {
			originPrice:null,
			distPrice:"",
			goods: {},
			//price:"",
			brand:false,
			goodsName:false,
			size:false,
			allBrand:[],
		    allGoodsName:[],
		    allSize:[],
		    show:false,
			keyWords:"",
			type:"",
			tips:null
		}
	},
	methods: {
		inputKey(value){
			//console.info("this.type:"+this.type);
			if(this.type== "originPrice"){
				this.originPrice=value;
			}else if(this.type== "distPrice"){
				this.distPrice=value+"";
			}
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(type){
			this.hideKeyBoard();
			//console.info("numKeyboard:"+type);
			this.type = type;
			if(type== "originPrice"){
				this.keyWords = this.originPrice;
			}else if(type== "distPrice"){
				this.keyWords = this.distPrice;
			}			
			this.show = true;
		},
		hideKeyBoard(){
			document.activeElement.blur();
		},
        save () {
        	if(this.distPrice>=this.originPrice){
        		this.tips="提示：折扣价应该小于原价!";
        		return;
        	}
        	if(this.goods.id ==null){
        		this.addWG();
        	}else{
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
	      	this.goods.gName = null;
	      	this.goods.specName = null;
	      	this.getAllGoodsName(item.id)
	      	this.brand = false;
	    },
	    setGoodsName(item) {
	      	this.goods.gName = item.name;
	      	this.goods.specName = null;
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
		    req.userId = this.userId;
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
		    req.userId = this.userId;
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
		    req.userId = this.userId;
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
		    req.userId = this.userId;
		    req.brandId = this.goods.brandId;
		    req.brandName = this.goods.brandName;
		    req.gName = this.goods.gName;
		    req.specId = this.goods.specId;
		    req.originPrice = this.originPrice;
		    req.distPrice = this.distPrice;
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
		    req.userId = this.userId;
		    req.entityId = this.goods.id;
		    req.originPrice = this.originPrice;
		    req.distPrice = this.distPrice;
			this.$api.mine.editWG(req)
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
    	//this.price = this.formatPrice(this.goods.originPrice);
    	this.goods = this.$store.state.goods;
    	this.getAllBrand(); 
        this.originPrice = this.goods.originPrice;
        this.distPrice = this.goods.distPrice;
    }
}
</script>

<style scoped>
	.header{
		margin:15px 15px 0 15px;
		padding:10px 0;
	}
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
