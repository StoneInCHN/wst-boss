<template>
	<div>
				<Row>
					<Col span="6">
						<div style="margin:10px 15px">
							<img :src="'/wst-boss/'+coupon.picUrl" width="50" height="50"/>
						</div>
					</Col>
					<Col span="16" class="coupon">	
						<div class="couponCard">
				  			<div>
				  			<label>商品名称：</label> {{coupon.gNameSpec}}
				  			</div>
				  			<div>
				  				<span slot="icon" class="line">
				  				<label>原价：</label>{{formatPrice(coupon.distPrice)}}
				  				</span>
				  				<span>
				  				<label>优惠价：</label>{{formatPrice(coupon.distAmount)}}
				  				</span>
				  			</div>
				  		</div>
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
		deleteCoupon(){
			for (var i = 0; i < this.list.length; i++) {
				if (this.coupon.id == this.list[i].id) {
					this.list.splice(i, 1);
					break;
				}
			}
        },
        formatPrice(num){
	    	if(num){
				return "￥" + parseFloat(num).toFixed(2);
	    	}else{
	    		return "";
	    	}	    	
	    }
    }
}
</script>

<style scoped>
	.couponCard{
		font-size: 14px;
	}
	.couponCard div{
		margin:15px;
	}
	.line{
		text-decoration: line-through;
		margin-right:15px;
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
</style>
