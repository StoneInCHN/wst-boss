<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加订单" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="userCard.code" disabled/>
				  <Field label="姓名" v-model="userCard.name" disabled/>
				  <Field label="用户地址" v-model="userCard.address" disabled/>
				  <Field label="手机号" v-model="userCard.tel" disabled/>
				</CellGroup>
				<Panel>
					<div slot="header">
						<Cell title="商品信息" class="cell">
					    	<div class="addCoupon" @click="newGoods"><Icon name="add-o"/></div>
					  	</Cell>
					</div>	
				</Panel>	
				<GoodsRow v-for="(goods,index) in goodsList" :goods="goods" :list="goodsList" :key="index"/>				
				<CellGroup>  
				  <Field label="支付方式" value="货到付款"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Row, Col, Icon } from 'vant'
import Header from "../wechat/Header"
import GoodsRow from "./GoodsRow"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Row, Col, Icon, GoodsRow },
	data () {
		return {
			userCard:{
				code:"108",
				name:"王三",
				address:"中德英伦联邦19栋1231室",
				tel:"18254788784"
			},
			goodsList:[{
				id:1,
				name:"农夫山泉15L",
				count:1,
				url:"#"
			}]
		}
	},
	methods: {
        save () {
			this.$router.push('/userManage');
        },
		newGoods(){
			this.$router.push('/user/addGoods');
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
		margin-top:8px;
		color:green
	}
	.addLable{
		font-size:14px;
		margin:15px 0 auto 15px;
	}
</style>
