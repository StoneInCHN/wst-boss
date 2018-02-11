<template>
	<div>
		<Header backUrl="/manage/workerManage"/>
		<Panel>
			<div slot="header">
				<Cell title="员工新增" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="姓名" v-model="worker.name" placeholder="请输入姓名"/>
				  <Field label="微信" v-model="worker.tel" placeholder="请输入微信"/>
				  <Field label="手机号" v-model="worker.phone" placeholder="请输入11位手机号码" type="tel" error-message="手机号格式错误"/>
				</CellGroup>					
			</div>	
			<div slot="footer">
				<Cell title="向该名配送员指派订单时，发送短信" class="cell">
			    	<van-switch :value="worker.canSend"  @input="onInput" />
			  	</Cell>
			</div>
		</Panel>
		
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Switch, Dialog } from 'vant'
import Header from "../../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, vanSwitch:Switch, Dialog },
	data () {
		return {
			currentType:0,
			worker:{
				name:null,
				tel:null,
				phone:null,
				canSend:false
			}
		}
	},
	methods: {
        save () {
			this.$router.push('/manage/workerManage');
        },
	    onInput(checked){
	    	let warn = "";
	    	if(checked){
	    		warn = "向该名配送员指派订单时，发送短信？";
	    	}else{
	    		warn = "取消发送短信？";
	    	}
		    Dialog.confirm({
		        title: '提醒',
		        message: warn
		    }).then(() => {
		        this.worker.canSend = checked;
		    });
	    }
       
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
</style>
