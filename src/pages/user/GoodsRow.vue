<template>
	<div>
			<div class="goodsDiv">
				<Row>
					<Col span="4" class="row"><img :src="imgUrl" width="45" height="45"/></Col>
					<Col span="15" class="green row">
						<span>{{goods.gName}}
							(<span :class="goods.distPrice?'line':''">{{formatPrice(goods.gAmount)}}</span>
							<span v-if="goods.distPrice">{{formatPrice(goods.distPrice)}}</span>)
						</span>
					</Col>
					<Col span="3" class="row">
				    {{goods.gCount}} 桶</Col>
					<Col span="2" class="red row big"><Icon name="close" @click="deleteGoods"/></Col>					
				</Row>				
			</div>	
	</div>
</template>

<script>
import {  Row, Col, Icon } from 'vant'
import { getAbsoluteUrl } from '@/utils'
import { mapGetters, mapActions } from "vuex";
export default{
	name: "GoodsRow",
	components: { Row, Col, Icon },
	props: {
        goods: Object
    },
	computed:{
		...mapGetters(["userOrderGoodsList"]),
		imgUrl () {
			return getAbsoluteUrl(this.goods.gPic)
		}
	},
	methods: {
		...mapActions(["setUserOrderGoodsList"]),
		deleteGoods(){
			const { gId } = this.goods
			const list = this.userOrderGoodsList.filter(item=>{
				return item.gId !== gId
			})
			this.setUserOrderGoodsList(list)
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
	.line{
		text-decoration: line-through;
		color:gray;
	}
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
