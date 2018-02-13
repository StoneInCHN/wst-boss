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
				  <Field label="编号" v-model="userCard.code" disabled/>
				  <Field label="姓名" v-model="userCard.name" disabled/>
				  <Field label="用户地址" v-model="userCard.address" disabled/>
				  <Field label="优惠商品"  placeholder="请填选择商品" @click="addCouponGoods"/>
				  <Field label="优惠金额"  placeholder="请填写优惠金额"/>
				  <Field label="优惠原因"  placeholder="请填写优惠原因" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell } from 'vant'
import Header from "../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell},
	data () {
		return {
			userCard:{
				code:"108",
				name:"王三",
				address:"中德英伦联邦19栋1231室"
			}
		}
	},
	methods: {
        save () {
			this.$router.push('/userManage');
        },
        addCouponGoods(){
        	this.$router.push('/user/addCouponGoods');
        }
       
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
</style>
