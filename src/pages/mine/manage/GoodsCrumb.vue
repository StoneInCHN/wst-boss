<template>
	<div>
		  	<div class="goods">
		  		<div class="goods_checkbox" v-if="editable">
		  			<Checkbox class="order-item-checkbox" v-model="checked" @change="editGoods"/>
		  		</div>		  		
		  		<div class="goods_thumb">
		  			<img :src="'/wst-boss/'+goods.picUrl" width="65" height="65">
		  			<div class="goods_status">
		  				<span v-if="goods.gStatus == 'OFF'" class="invalid">下架</span>
		  				<span v-if="goods.gStatus == 'ON'" class="valid">上架</span>
		  			</div>
		  		</div> 
		  		<div class="goods_content">
		  			<div class="goods_row">
		  				
		  				<div class="goods_title">{{goods.gName}}</div> 
		  				<div class="goods_edit"><Icon name="edit" @click="edit"/></div>
		  			</div> 
		  			<div class="goods_row">
		  					<div class="goods_price">押金 {{formatPrice(goods.gDeposit)}}</div> 
		  			</div> 
		  			<div class="goods_row">
		  					<div class="goods_price">{{formatPrice(goods.distPrice)}}
		  						<span>{{formatPrice(goods.originPrice)}}</span>
		  					</div> 
		  			</div>
		  		</div>
		  	</div>

	</div>
</template>

<script>
import { Icon, Toast, Checkbox } from 'vant'
export default{
	name: "Mine",
	components: { Icon, Toast, Checkbox },
	props: {
        goods: Object,
        editable: Boolean,
        editIds: Array,
    },
    data () {
		return {			
			checked: false
		}
	},
	methods: {
	    edit () {
	 		if(this.goods.gStatus == 'ON'){
	 			Toast.fail('商品下架后才能被编辑');
	 		}else{
	 			var req={};
	 			req.brandId = this.goods.brandId;
			    req.brandName = this.goods.brandName;
			    req.gName = this.goods.gName;
			    req.specId = this.goods.specId;
			    req.originPrice = this.goods.originPrice;
			    req.distPrice = this.goods.distPrice;
			    req.id= this.goods.id;
		    	this.$store.state.goods = req;
	 			this.$router.push('/manage/goodsEdit');
	 		}
	    },
	    formatPrice(num){
	    	if(num){
	    		return "￥"+num.toFixed(2);
	    	}else{
	    		return "无";
	    	}
	    	
	    },
	    editGoods(item){
	    	if(item == true){
	    		this.editIds.push(this.goods.id);
	    	}else{
	    		this.editIds.pop(this.goods.id);
	    	}
	    	console.info(this.editIds);
	    }

    }
}
</script>

<style scoped>
	.goods, .goods_thumb, .goods_checkbox, .goods_row {
	    display: flex;
	}
	.goods_content {
	    width: 100%;
	}
	.goods {
	    color: #333;
	    height: 120px;
	    font-size: 16px;
	    background: #fafafa;
	    position: relative;
	    box-sizing: border-box;
	    padding: 15px 15px 5px 130px;
	}
	.goods_checkbox {
	    top: 40px;
	    left: 6px;
	    position: absolute;
	}
	.goods_thumb {
	    top: 15px;
	    left: 30px;
	    width: 90px;
	    height: 90px;
	    position: absolute;
	    border: 1px solid #eee;
	    border-radius: 5px;
	    align-items: center;
	    justify-content: center;
	}
	.goods_title {
	    max-height: 40px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.goods_edit {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	    min-width: 80px;
	    line-height: 20px;
	    text-align: right;
	}
	.goods_price {
	    color: #666;
	    font-size: 12px;
	    max-height: 20px;
	    margin-top:18px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.goods_price span{
		padding-left: 5px;
		text-decoration: line-through;
	}
	.goods_status span{
		left: 60%;
	    top: -10px;
	    position: absolute;
	    box-sizing: border-box;
	    padding:2px 6px;
	    border-radius: 2px;
	    font-size: 12px;
	    color: #fff;
	}
	.invalid {
	    background-color: #DD4F9B;
	}
	.valid {
	    background-color: #B6DF6E;
	}
</style>
