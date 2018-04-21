<template>
	<div>
			<div class="goodsDiv">
				<Row>
					<Col span="4" class="row"><img :src="'/wst-boss/'+goods.gPic" width="45" height="45"/></Col>
					<Col span="12" class="green row"><span>{{goods.gName}}<span>【{{formatPrice(goods.gAmount)}}】</span></span></Col>
					<Col span="6" class="row"><input type="number" v-model="goods.gCount" class="num_input"/>桶</Col>
					<Col span="2" class="red row big"><Icon name="close" @click="deleteGoods"/></Col>					
				</Row>				
			</div>	
	</div>
</template>

<script>
import {  Row, Col, Icon } from 'vant'
export default{
	name: "GoodsRow",
	components: { Row, Col, Icon },
	props: {
        goods: Object,
        list:Array
    },
	data () {
		return {

		}
	},
	methods: {
		deleteGoods(){
			for (var i = 0; i < this.list.length; i++) {
				if (this.goods.gId == this.list[i].gId) {
					this.list.splice(i, 1);
					break;
				}
			}
        },
        formatPrice(num){
	    	if(num){
				return "￥" + parseFloat(num).toFixed(2);
	    	}else{
	    		return 0;
	    	}	    	
	    }
    }
}
</script>

<style scoped>
	.big{
		padding-top:3px;
		font-size:16px;
	}
	.row{
		line-height: 45px;
	}
	.cell{
		padding: 0;

	}	
	.close{
		right:20px;
		position: absolute;
		color:red
	}	
	.coupon{
		border:1px solid #ccc;
		margin:6px 0;
		border-radius: 2px;
	}
	.label{
		font-size:14px;
		margin:35px 0 auto 15px;
	}
	.red{
		color:red;		
	}
	.green{
		color:#0a0;
	}
	.goodsDiv{
		font-size:14px;
		padding:5px 2px 5px 15px;
	}
	.num_input {
		margin:0 5px;
	    width: 40px;
	    height: 25px;
	    border: 1px solid #ccc;
	    border-radius: 5px;
	    box-sizing: content-box;
	    color: #666;
	    font-size: 16px;
	    vertical-align: middle;
	    text-align: center;
	}
</style>
