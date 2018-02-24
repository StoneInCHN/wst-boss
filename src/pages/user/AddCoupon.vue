<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加优惠" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="用户编号" v-model="userCard.code" disabled/>
				  <Field label="姓名" v-model="userCard.name" disabled/>
				  <Field label="用户地址" v-model="userCard.address" disabled/>
				</CellGroup>				
				<CouponGoods v-for="(coupon,index) in couponList" :coupon="coupon" :list="couponList" :num="index" :key="index"/>
				<Row>
					<Col span="6">
						<div class="addLable">添加优惠</div>
					</Col>
					<Col span="18">
						<div class="addCoupon" @click="newCoupn"><Icon name="add-o"/></div>	
					</Col>
				</Row>					
				<CellGroup>  
				  <Field label="优惠原因"  placeholder="请填写优惠原因" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Row, Col, Icon } from 'vant'
import Header from "../wechat/Header"
import CouponGoods from "./CouponGoods"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, CouponGoods },
	data () {
		return {
			userCard:{
				code:"108",
				name:"王三",
				address:"中德英伦联邦19栋1231室"
			},
			couponList:[{
				id:1,
				name:"农夫山泉15L",
				price:15
			}]
		}
	},
	methods: {
        save () {
			this.$router.push('/userManage');
        },
		newCoupn(){
			this.couponList.push({});
		}
       
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;

	}	
	.addCoupon{
		font-size:18px;
		margin-top:15px;
		color:green
	}
	.addLable{
		font-size:14px;
		margin:15px 0 auto 15px;
	}
</style>
