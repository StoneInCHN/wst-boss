<template>
	<div>
			<div class="goodsDiv">
				<Row>
					<Col span="6"><img src="goods.url"/></Col>
					<Col span="8"><span>{{goods.name}}</span></Col>
					<Col span="8"><input type="number" v-model="goods.count" class="num_input"/>桶</Col>
					<Col span="2" class="red"><div @click="deleteGoods">删除</div></Col>					
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
        	this.list.pop(this.goods);
        }
    }
}
</script>

<style scoped>
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
	.goodsDiv{
		font-size:14px;
		padding:15px;
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
