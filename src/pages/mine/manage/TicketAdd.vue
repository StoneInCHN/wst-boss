<template>
	<div>
		<Header backUrl="/manage/ticketManage"/>
		<Panel>
			<div slot="header">
				<Cell title="添加水票" class="cell-text">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div class="center">
				<span>买 
					<input type="number" v-model="buyCount" class="num_input"/>					
					送 
					<input type="number" v-model="sendCount" class="num_input"/>			
					张
				</span>
			</div>
			<div>
				<CellGroup>
				  <Field label="售价:" type="number" v-model="price" placeholder="请输入售卖价格"/>
				</CellGroup>
			</div>	
		</Panel>		
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Stepper } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "AddAccount",
	components: { Header, Footer, Panel, CellGroup, Field, Button, Cell, Stepper },
	data () {
		return {
			price:null,
			buyCount: 10,
			sendCount: 0			
		}
	},
	methods: {
        save () {
			this.$router.push('/manage/ticketManage');
        }
    },
    mounted(){
    	
            
    }
}
</script>

<style scoped>
	.cell-text{
		padding: 0;
	}
	.center{
		margin: 10px;
		font-size:14px;
		margin-left:15px;
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
