<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header">
				<Cell title="新建编号" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="userCard.code" placeholder="请输入用户编号"/>
				  <Field label="手机号" v-model="userCard.phone" placeholder="可输入多个手机号，用逗号分隔" required/>
				  <Field label="座机" v-model="userCard.tel" placeholder="例（028）6573158，多个用逗号分隔"/>
				  <Field label="姓名" v-model="userCard.name" placeholder="请填写用户姓名" required/>
				  <Field label="用户地址" v-model="userCard.address" placeholder="请填写用户地址" required/>
				  <Field label="关联二维码" v-model="userCard.qrCode" placeholder="未关联">
				  	<Icon name="add" slot="icon" v-if="userCard.qrCode==null" class="addQr" @click="addQr"/>
				  	<Icon name="clear" slot="icon" v-else class="clearQr" @click="confirmClear"/>
				  </Field>
				  <Field label="备注" v-model="userCard.remark" placeholder="请填写备注" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Icon, Dialog } from 'vant'
import Header from "../wechat/Header"
export default{
	name: "NewCode",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Icon, Dialog },
	data () {
		return {
			userCard: {
				code:null,
				phone:null,
				tel:null,
				name:null,
				address:null,
				qrCode:"已关联",
				remark:null
			}
		}
	},
	methods: {
        save () {
			this.$router.push('/userManage');
        },
        confirmClear(){
			Dialog.confirm({
			  title: '提示',
			  message: '确认要解除编号和二维码的关联吗？'
			}).then(() => {
			  this.userCard.qrCode = null;
			}).catch(() => {
			  // on cancel
			});
        },
        addQr(){
        	this.$router.push('/user/scanQr');
        }
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
	.addQr{
		color:#0a0;
	}
	.clearQr{
		color:red;
	}
</style>
