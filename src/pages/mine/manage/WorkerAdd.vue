<template>
	<div>
		<Header :backUrl="backUrl"/>
		<Panel>
			<div slot="header" class="header">
				<Cell :title="title" class="cell">
					<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>

			<div>
				<CellGroup>
					<Field label="微信" v-model="worker.wxAcct" placeholder="请输入微信" disabled/>
				    <Field label="姓名" v-model="worker.userName" placeholder="请输入姓名"/>
				    <Field label="手机号" v-model="cellPhoneNum" placeholder="请输入11位手机号码" type="tel" :error-message="tips"  @focus='numKeyboard'/>
				</CellGroup>					
			</div>	

		</Panel>
		<NumInput :show="show" :input="keyWords" extraKey="" @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Dialog, Toast } from 'vant'
import Header from "../../wechat/Header"
import {mapGetters} from 'vuex'
import NumInput from "../../../components/NumInput"
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Dialog, Toast, NumInput },
	data () {
		return {
			cellPhoneNum:null,
			title:'员工新增',
			backUrl:'/manage/workerSearch',
			closeable:true,
			currentType:0,
			worker:{},
			tips:null,
			type:0,
			show:false,
			keyWords:"",
		}
	},
	methods: {
		inputKey(value){
			this.cellPhoneNum = value;
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(){
			this.keyWords = this.cellPhoneNum;
			document.activeElement.blur();
			this.show = true;
		},
        save () {
			this.worker.userId = this.userId;
			this.worker.cellPhoneNum = this.cellPhoneNum;
			this.$api.mine.updateEmp(this.worker)
			.then(res => {
			    //if(res.code = "0000"){
			      	Toast.success('操作成功');
			      	this.$store.state.worker = {};
			      	this.$router.push('/manage/workerManage');
			    //}	        
			})
			.catch(error => {
			    console.log(error);
			});			
        }       
    },
    mounted() {
		this.worker = this.$store.state.worker;
		if(this.worker){
			if(this.worker.entityId){
				this.title = "员工编辑";
			}
			if(this.worker.cellPhoneNum){
				this.cellPhoneNum = this.worker.cellPhoneNum;
			}
		}
		
		if(this.worker.userName){
			this.backUrl='/manage/workerManage';
		}
    }
}
</script>

<style scoped>
	.header{
		margin:15px 15px 0 15px;
		padding:10px 0;
	}
	.cell{
		padding: 0;
	}	
</style>
