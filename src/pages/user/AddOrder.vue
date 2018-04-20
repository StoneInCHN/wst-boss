<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加订单" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="seriUser.serialNo" disabled/>
				  <Field label="姓名" v-model="seriUser.realName" disabled/>
				  <Field label="用户地址" v-model="seriUser.addrInfo" disabled/>
				  <Field label="手机号" v-model="seriUser.contactPhone" disabled/>
				</CellGroup>
				<Panel>
					<div slot="header">
						<Cell title="商品信息" class="cell">
					    	<div class="addCoupon" @click="newGoods"><Icon name="add-o"/></div>
					  	</Cell>
					</div>	
					<GoodsRow v-for="(goods,index) in goodsList" :goods="goods" :list="goodsList" :key="index"/>
					<div slot="footer" class="footer">
						共<span>{{goodsList.length}}</span>件商品，合计：<span>{{formatPrice(totalAmount)}}</span>
					</div>
				</Panel>	
								
				<CellGroup>  
				  <Field label="支付方式" value="货到付款"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, Dialog } from 'vant'
import Header from "../wechat/Header"
import GoodsRow from "./GoodsRow"
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
        	var gIds = [];
    		for (var i = 0; i < this.goodsList.length; i++) {
    			gIds.push(this.goodsList[i].gId);
    		}

        	var req = {};
		    req.userId = this.$store.state.userId;
		    req.gIds = gIds;
		    req.qrCodeId = this.seriUser.qrCodeId;
		    req.entityId = this.seriUser.id;
		    //请求参数待定，接口文档有误???
	    	this.$api.user.addSO(req)
			.then(res => {
			    //if(res.code = "0000"){
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
			req.userId = this.$store.state.userId;
			req.entityId = this.seriUser.id;
			this.$api.user.lastSO(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.goodsList = [];
			    	this.goodsList.push(res);
			    	this.$store.state.goodsList = this.goodsList;
			    //}	        
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
	    }
       
    },
    computed:{
    	totalAmount: function(){
    		var totalAmount = 0;
    		for (var i = 0; i < this.goodsList.length; i++) {
    			totalAmount += this.goodsList[i].gCount * this.goodsList[i].gAmount;
    		}
    		return totalAmount;
    	}
    },   
    mounted(){
    	this.seriUser = this.$store.state.seriUser; 
    	if(this.$store.state.orderGoods.gId){
    		this.goodsList = this.$store.state.goodsList;
    		this.goodsList.push(this.$store.state.orderGoods);
			this.$store.state.orderGoods = {};
    	}else{
			this.lastSO();
    	}
    	
    }
}
</script>

<style scoped>
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
