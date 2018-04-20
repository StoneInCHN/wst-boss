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
				  <Field label="购买商品" v-model="goods.gName" placeholder="请选择购买商品"  @click="showAllGoods">
				  		<Stepper slot="icon" v-model="goods.gCount" :min="1" :max="100"  :default-value="1"/>				 	
				  </Field>			  
				</CellGroup>
				<img :src="goods.gPic" width="100" height="100"/>
			</div>	
		</Panel>
		<Actionsheet  v-model="showGoods" :actions="allGoods" cancel-text="取消"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet,Stepper  } from 'vant'
import Header from "../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet,Stepper },
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
       		this.goods.gAmount = item.distPrice;
	      	this.goods.gName = item.name;
	      	this.showGoods = false;
	    },
	    getOnGsList(){
	    	var req = {};
		    req.userId = this.$store.state.userId;
		    req.entityId = this.$store.state.seriUser.id;
	    	this.$api.user.getOnGsList(req)
			.then(res => {
			    //if(res.code = "0000"){
			    	this.allGoods = [];
			    	for (var i = 0; i < res.gList.length; i++) {
			    		var cGoods = {};
			    		cGoods.distPrice = res.gList[i].distPrice;
			    		cGoods.picUrl = res.gList[i].picUrl;
			    		cGoods.id = res.gList[i].id;
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
	.cell{
		padding: 0;
	}	
</style>
