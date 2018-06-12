<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="添加商品" class="cell">
			    	<Button class="green-btn" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<Row class="gRow" v-if="goods.gId">
				<Col span="3">
					<img :src="'/wst-boss/'+goods.gPic" width="35" height="35"/>
			     </Col>
				<Col span="12">
				  <Field label="" v-model="goods.gName" disabled/>
				  
				 </Col>
			     <Col span="9">
					<Stepper v-model="goods.gCount" :min="1" :max="100"  :default-value="1" class="step"/>
			     </Col>				
			</Row>
			<Row class="gRow">
				<Col span="24">
					<Button class="green-btn" bottom-action @click="showAllGoods">请选择需要购买的商品</Button>
				</Col>
			</Row>
		</Panel>
		<Actionsheet  v-model="showGoods" :actions="allGoods" cancel-text="取消"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet,Stepper,Row,Col  } from 'vant'
import Header from "../wechat/Header"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet,Stepper,Row,Col },
	data () {
		return {
			goods: {"gCount":1},
			showGoods:false,
			goodsName:false,
			size:false,
			allGoods:[]
		}
	},
	methods: {
		hideKeyboard(){
			document.activeElement.blur();
		},
        save () {
        	this.$store.state.orderGoods = this.goods;
			this.$router.push('/user/addOrder');
        },
        showAllGoods(){
	    	this.showGoods = true;
	    },
       	setGoods(item) {
       		this.goods.gId = item.id;
       		this.goods.gPic = item.picUrl;
       		this.goods.gAmount = item.gAmount;
       		this.goods.distPrice = item.distPrice;
	      	this.goods.gName = item.name;
	      	this.showGoods = false;
	    },
	    getOnGsList(){
	    	var req = {};
		    req.userId = this.userId;
		    req.entityId = this.$store.state.seriUser.id;
	    	this.$api.user.getOnGsList(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allGoods = [];
			    	for (var i = 0; i < res.gList.length; i++) {
			    		var cGoods = {};
			    		cGoods.id = res.gList[i].id;
			    		cGoods.gAmount = res.gList[i].distPrice;
			    		cGoods.distPrice = res.distList[cGoods.id];
			    		cGoods.picUrl = res.gList[i].picUrl;
			    		cGoods.name = res.gList[i].gNameSpec;
			    		cGoods.callback = this.setGoods;
			    		this.allGoods.push(cGoods);
			    	}
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    }
    },
    mounted(){
    	this.getOnGsList();
    }
}
</script>

<style scoped>
	.step{
		padding-top: 10px;
	}
	.gRow{
		margin:15px;
	}
	.header{
		margin:15px 15px 0 15px;
		padding:10px 0;
	}
	.cell{
		padding: 0;
	}	
	.green-btn{
		background-color:#0a0;
		border-radius: 5px;
		color:#fff;
	}
</style>
