<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加优惠" class="cell">
			    	<Button type="primary" size="small" @click="validate">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="用户编号" v-model="seriUser.serialNo" disabled/>
				  <Field label="姓名" v-model="seriUser.realName" disabled/>
				  <Field label="用户地址" v-model="seriUser.addrInfo" disabled/>
				</CellGroup>				
				<CouponGoods v-for="(coupon,index) in couponList" :coupon="coupon" :list="couponList" :num="index" :key="index" />
				<Row>
					<Col span="6">
						<div class="addLable">添加优惠</div>
					</Col>
					<Col span="18">
						<div class="addCoupon" @click="addCoupnGoods"><Icon name="add-o"/></div>	
					</Col>
				</Row>					
				<CellGroup>  
				  <Field label="优惠原因"  placeholder="请填写优惠原因" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>
1 2 3
2 4

<script>
import { Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, Toast } from 'vant'
import Header from "../wechat/Header"
import CouponGoods from "./CouponGoods"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, CouponGoods, Toast },
	data () {
		return {
			seriUser:{},
			couponList:[],
			existIds:[],
		}
	},
	methods: {
		validate(){
			if (this.couponList.length == 0) {
				Toast.fail("至少添加一件优惠商品");
			}else{
				this.save();
			}
		},
		initExistIds(){
			var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = this.seriUser.id;
	    	this.$api.user.distInfo(req)
			.then(res => {
			    if(res.code = "0000"){
			    	for (var i = 0; i < res.msg.length; i++) {
			    		this.existIds.push(res.msg[i].shopGoods.id);
			    	}
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});
		},
        save () {
        	var newCouponList = [];
        	var couponIds = [];
        	for (var i = 0; i < this.couponList.length; i++) {
        		if (!this.IsInArray(this.existIds, this.couponList[i].id)) {
        			newCouponList.push(this.couponList[i]);
        		}
        		couponIds.push(this.couponList[i].id);        		
        	}
        	var deleteIds = [];//需删除的优惠商品ID集合
        	for (var i = 0; i < this.existIds.length; i++) {
        		if (!this.IsInArray(couponIds, this.existIds[i])) {
        			deleteIds.push(this.existIds[i]);
        		}
        	}
        	var addDistMap = new Map();//需添加的优惠商品信息 (商品ID:优惠价格)
        	for (var i = 0; i < newCouponList.length; i++) {        		
        		addDistMap.set(newCouponList[i].id+"", newCouponList[i].distAmount);
        	}
			
			var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = this.seriUser.id;
		    req.addDistMap = addDistMap;
		    req.entityIds = deleteIds;
	    	this.$api.user.saveGsDist(req)
			.then(res => {
			    if(res.code = "0000"){
			    	Toast.success("操作成功");
			    	this.$router.push('/userManage');
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});   	        					
        },
		addCoupnGoods(){
			var entityIds = [];
			if(this.couponList.length>0){
				for (var i = 0; i < this.couponList.length; i++) {
					entityIds.push(this.couponList[i].id);
				}
			}
			this.$store.state.couponIds = entityIds;
			this.$store.state.couponGoodsList = this.couponList;
			this.$router.push('/user/addCouponGoods');
		},
		getDistInfo(){
			var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = this.seriUser.id;
	    	this.$api.user.distInfo(req)
			.then(res => {
			    if(res.code = "0000"){
			    	this.existIds = [];
			    	var allDGoods = [];
			    	for (var i = 0; i < res.msg.length; i++) {
			    		var cGoods = {};
			    		cGoods.distAmount = res.msg[i].distAmount;
			    		cGoods.distPrice = res.msg[i].shopGoods.distPrice;
			    		cGoods.picUrl = res.msg[i].shopGoods.picUrl;
			    		cGoods.id = res.msg[i].shopGoods.id;
			    		cGoods.gNameSpec = res.msg[i].shopGoods.gNameSpec;
			    		allDGoods.push(cGoods);
			    		this.existIds.push(res.msg[i].shopGoods.id);
			    	}
			    	this.$store.state.couponGoodsList = allDGoods;
			    	this.couponList = this.$store.state.couponGoodsList;
			    	this.existCouponList = allDGoods;
			    }	        
			})
			.catch(error => {
			        console.log(error);
			});
		},
		IsInArray(arr,val){
		　　var testStr=','+arr.join(",")+",";
		　　return testStr.indexOf(","+val+",")!=-1;
		}
       
    },
    mounted(){
    	this.seriUser = this.$store.state.seriUser; 
    	this.initExistIds();
    	if(this.$store.state.couponGoods.id){
    		this.couponList = this.$store.state.couponGoodsList;
    		this.couponList.push(this.$store.state.couponGoods);
    		this.$store.state.couponGoods = {};
    	}else{
    		this.getDistInfo(); 	    		
    	}
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;

	}	
	.addCoupon{
		font-size:18px;
		margin-top:15px;
		color:green
	}
	.addLable{
		font-size:14px;
		margin:15px 0 auto 15px;
	}
</style>
