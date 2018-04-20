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
				  <Field label="优惠商品" v-model="goods.gNameSpec" placeholder="请选择优惠商品"  @click="showAllBrand"/>
				  <Field label="商品原价" v-model="goods.distPrice" disabled/>
				  <Field label="优惠价" v-model="goods.distAmount" placeholder="请填写优惠价格"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet  v-model="dGoods" :actions="allDGoods" cancel-text="取消"/>
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
			goods: {},
			dGoods:false,
			allDGoods:[]
		}
	},
	methods: {
        save () {
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
	      	this.dGoods = false;
	    },
	    getGsDdList(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
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
	.cell{
		padding: 0;
	}	
</style>
