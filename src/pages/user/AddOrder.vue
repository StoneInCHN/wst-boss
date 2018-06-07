<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel class="panel">
			<div slot="header" class="header">
				<Cell title="添加订单" class="cell"></Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="seriUser.serialNo" disabled/>
				  <Field label="小区/大厦/学校" v-model="seriUser.addrInfo" disabled/>
				  <Field label="楼号-门牌号" v-model="seriUser.doorNum" disabled/>
				  <Field label="姓名" v-model="seriUser.realName" disabled/>
				  <Field label="手机号" v-model="seriUser.contactPhone" disabled/>
				</CellGroup>
				<Panel>
					<div slot="header" class="header">
						<Cell title="商品信息" class="cell">
					    	<div class="addCoupon" @click="newGoods"><Icon name="add-o"/></div>
					  	</Cell>
					</div>	
					<GoodsRow v-for="(goods,index) in goodsList" :goods="goods" :list="goodsList" :key="index"/>
					<div slot="footer" class="footer">
						共<span>{{totalSize}}</span>件商品，合计：<span>{{formatPrice(totalAmount)}}</span>
					</div>
				</Panel>	
								
				<CellGroup>  
				  <Field label="支付方式" value="货到付款" disabled/>
				</CellGroup>
			</div>	
		</Panel>
		<div class="fixed">
			<Button bottom-action style="background-color:#fff;color:#000;border:1px solid #eee" @click="cancel"> 取 消 </Button>
			<br>
			<Button bottom-action style="background-color:#0a0" @click="save">提交订单</Button>
		</div>	
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, Dialog } from 'vant'
import Header from "../wechat/Header"
import GoodsRow from "./GoodsRow"
import {mapGetters} from 'vuex'
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, GoodsRow,Dialog },
	data () {
		return {
			sn:null,
			payType:null,
			seriUser:{},
			goodsList:[]
		}
	},
	methods: {
        save () {
        	var gIds = {};
    		for (var i = 0; i < this.goodsList.length; i++) {
    			var key = this.goodsList[i].gId;
    			gIds[key] = this.goodsList[i].gCount;
    		}

        	var req = {};
        	req.userId = this.userId;
        	req.entityId = this.seriUser.id;
        	req.addr = this.seriUser.addrInfo;
        	req.doorNum = this.seriUser.doorNum;
        	req.realName = this.seriUser.realName;	
		    req.contactPhone = this.seriUser.contactPhone;	
 		    req.gIds = gIds;
	    	this.$api.user.addSO(req)
			.then(res => {
				if(res == null){	
					res = {};	
				}
			    this.$store.state.goodsList = [];
			    	var tip = "订单号："+res.sn+";  支付方式："+this.getPayType(res.payType);
			    	if(res.cobAmount){
			    		tip += ";   仍需货到付款金额:" + this.formatPrice(res.cobAmount);
			    	}
			    	Dialog.alert({
					  title: '操作成功',
					  message: tip
					}).then(() => {
					  this.$router.push('/userManage');
					});			    	
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
        },
		newGoods(){
			this.$router.push('/user/addGoods');
		},
		lastSO(){
			var req = {};
			req.userId = this.userId;
			req.entityId = this.seriUser.id;
			console.info("lastSO",req);
			this.$api.user.lastSO(req)
			.then(res => {
			    	this.goodsList = [];
			    	if(res){
			    		res.gCount = 1;
			    		res.gAmount = res.gDistPrice
			    		this.goodsList.push(res);
			    		this.$store.state.goodsList = this.goodsList;
			    	}     
			})
			.catch(error => {
			        console.log(error);
			});
		},
        formatPrice(num){
	    	if(num){
				return "￥" + parseFloat(num).toFixed(2);
	    	}else{
	    		return 0;
	    	}	    	
	    },
	    getPayType(type){
	    	//返回的支付方式(水票-WATER_TICKET;货到付款-COB;水票部分抵扣混合-TICKET_COB)
	    	if(type == "WATER_TICKET"){
	    		return "水票";
	    	}
	    	if(type == "COB"){
	    		return "货到付款";
	    	}
	    	if(type == "TICKET_COB"){
	    		return "水票部分抵扣混合";
	    	}
	    },
	    cancel(){
	    	this.$router.push("/user/totalCodeUsers");
	    }
       
    },
    computed:{
    	totalAmount: function(){
    		console.info("this.goodsList",this.goodsList);
    		var totalAmount = 0;
    		for (var i = 0; i < this.goodsList.length; i++) {
    			var price = this.goodsList[i].gAmount;
    			if (this.goodsList[i].distPrice) {
    				price = this.goodsList[i].distPrice;
    			}
    			totalAmount += this.goodsList[i].gCount * price;
    		}
    		return totalAmount;
    	},
    	totalSize: function(){
    		var totalSize = 0;
    		for (var i = 0; i < this.goodsList.length; i++) {
    			totalSize += this.goodsList[i].gCount;
    		}
    		return totalSize;
    	},
    	...mapGetters([ "userId"])
    },   
    mounted(){
    	this.seriUser = this.$store.state.seriUser; 
    	var newGoods = this.$store.state.orderGoods;
    	if(newGoods.gId){
    		this.goodsList = this.$store.state.goodsList;
    		var exist = false;
    		this.goodsList.forEach(item => {
		        if(item.gId == newGoods.gId){
		        	item.gCount += newGoods.gCount;
		        	exist = true;
		        	return;
		        }
		    });
		    if (!exist) {
		    	this.goodsList.push(newGoods);
		    }
			this.$store.state.orderGoods = {};
    	}else{
			this.lastSO();
    	}
    	console.info(this.userId);
    	
    }
}
</script>

<style scoped>
	.panel{
		padding-bottom: 150px;
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
	.header{
		margin:15px 15px 0 15px;
		padding:10px 0;
	}
	.footer{
		text-align: right;
		font-size: 14px;		
	}
	.footer span{
		color:red;
		padding:0 3px;
	}
	.cell{
		padding: 0;
		font-weight: bold;
	}	
	.addCoupon{
		font-size:18px;
		margin-top:8px;
		color:green
	}
	.addLable{
		font-size:14px;
		margin:15px 0 auto 15px;
	}
</style>
