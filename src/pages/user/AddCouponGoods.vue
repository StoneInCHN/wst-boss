<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="添加商品" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="优惠商品" v-model="goods.gNameSpec" placeholder="请选择优惠商品"  @click="showAllBrand" @focus="hideKeyboard"/>
				  <Field label="商品原价" v-model="goods.distPrice" disabled/>
				  <Field label="优惠价" v-model="distAmount" placeholder="请填写优惠价格" @focus='numKeyboard' :error-message="tips"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="dGoods" :actions="allDGoods" cancel-text="取消"/>
		<NumInput :show="show" :input="keyWords" extraKey="."  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet,Toast } from 'vant'
import Header from "../wechat/Header"
import {mapGetters} from 'vuex'
import NumInput from "../../components/NumInput"
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet,NumInput,Toast},
	data () {
		return {
			goods: {},
			distAmount:null,
			dGoods:false,
			allDGoods:[],
			tips:null,
			show:false,
			keyWords:"",
			type:"",
		}
	},
	methods: {
		inputKey(value){
			this.distAmount = value;
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(type){
			this.keyWords = this.distAmount;
			this.hideKeyboard();
			this.show = true;
		},
		hideKeyboard(){
			document.activeElement.blur();
		},
        save () {
        	if(!this.goods.gNameSpec){
        		Toast.fail("请选择优惠商品");
        		return;
        	}
        	if(this.goods.distAmount>=this.goods.distPrice){
        		this.tips = "优惠价必须小于原价";
        		return;
        	}
        	this.goods.distAmount=this.distAmount;     
        	this.$store.state.couponGoods = this.goods;
			this.$router.push('/user/addCoupon');
        },
        showAllBrand(){
	    	this.dGoods = true;
	    },
       	setGNameSpec(item) {
	      	this.goods.gNameSpec = item.name;
	      	this.goods.id = item.id;
	      	this.goods.picUrl = item.picUrl;
	      	this.goods.distPrice = item.distPrice;     
	      	this.distAmount  = item.distAmount;     	
	      	this.dGoods = false;
	    },
	    getGsDdList(){
	    	var req = {};
		    req.userId = this.userId;
		    req.entityIds = this.$store.state.couponIds;
	    	this.$api.user.getGsDdList(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allDGoods = [];
			    	for (var i = 0; i < res.length; i++) {
			    		var cGoods = {};
			    		cGoods.distPrice = res[i].distPrice;
			    		cGoods.picUrl = res[i].picUrl;
			    		cGoods.id = res[i].id;
			    		cGoods.name = res[i].gNameSpec;
			    		cGoods.callback = this.setGNameSpec;
			    		this.allDGoods.push(cGoods);
			    	}
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
	    	 
	    }
    },
    mounted(){
    	this.getGsDdList();
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
</style>
