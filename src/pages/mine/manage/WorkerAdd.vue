<template>
	<div>
		<Header :backUrl="backUrl"/>
		<Panel>
			<div slot="header">
				<Cell title="员工新增" class="cell">
					<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
					<Field label="微信" v-model="worker.wxAcct" placeholder="请输入微信" disabled/>
				    <Field label="姓名" v-model="worker.userName" placeholder="请输入姓名"/>
				    <Field label="手机号" v-model="worker.cellPhoneNum" placeholder="请输入11位手机号码" type="tel" error-message="手机号格式错误"/>
				</CellGroup>					
			</div>	
			<NoticeBar mode="closeable" :scrollable="false">
  				温馨提示：添加员工前，员工必须先微信关注“云水站”。
			</NoticeBar >
		</Panel>
		
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Dialog, NoticeBar, Toast } from 'vant'
import Header from "../../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Dialog, NoticeBar, Toast },
	data () {
		return {
			backUrl:'/manage/workerSearch',
			closeable:true,
			currentType:0,
			worker:{}
		}
	},
	methods: {
        save () {
			this.worker.userId = this.$store.state.userId;
			this.$api.mine.updateEmp(this.worker)
			.then(res => {
			    if(res.code = "0000"){
			      	Toast.success('操作成功');
			      	this.$store.state.worker = {};
			      	this.$router.push('/manage/workerManage');
			    }	        
			})
			.catch(error => {
			    console.log(error);
			});			
        }       
    },
    mounted() {
		this.worker = this.$store.state.worker;
		if(this.worker.userName){
			this.backUrl='/manage/workerManage';
		}
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
</style>
