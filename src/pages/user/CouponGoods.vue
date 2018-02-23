<template>
	<div>
				<Row>
					<Col span="6">
						<div class="label">优惠券{{num+1}}</div>
					</Col>
					<Col span="16" class="coupon">
						<CellGroup>  
				  			<Field label="优惠商品" v-model="coupon.name" placeholder="请填选择商品" @click="addCouponGoods"/>
				  			<Field label="优惠金额" v-model="coupon.price" placeholder="请填写优惠金额"/>
						</CellGroup>
					</Col>
					<Col span="2">
						<div class="close"><Icon name="close" @click="deleteCoupon"/></div>
					</Col>
				</Row> 
	</div>
</template>

<script>
import {  CellGroup, Field, Row, Col, Icon } from 'vant'
export default{
	name: "CouponGoods",
	components: { CellGroup, Field, Row, Col, Icon },
	props: {
        coupon: Object,
        num:Number,
        list:Array
    },
	data () {
		return {

		}
	},
	methods: {
        addCouponGoods(){
        	this.$router.push('/user/addCouponGoods');
        },
		deleteCoupon(){
        	this.list.pop(this.coupon);
        }
    }
}
</script>

<style scoped>
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
</style>
