<template>
	<div>
		<Header backUrl="/manage"/>
			<p class="cell-title">员工管理 
				<a @click="manage" class="right">
					<span v-if="editable">完成</span>
					<span v-else>编辑</span>
				</a>
			</p>
			<WorkerCrumb v-for="(worker,index) in workers" :worker="worker" :editable="editable" :editIds="selecteWorkerIds" :key="index"/>
			<p class="fixed">			
				<a v-if="editable==false" @click="searchWorker" class="add">添加</a>
				<a v-else @click="deleteWork" class="delete"><Icon name="delete"/> 删除</a>
			</p>
			<Actionsheet v-model="showAction" :actions="actions" cancel-text="取消"/>
	</div>
</template>

<script>
import { Row, Col, Icon, Checkbox, Actionsheet, Toast, Dialog  } from 'vant'
import Header from "../../wechat/Header"
import WorkerCrumb from "./WorkerCrumb"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "StoreManage",
	components: { Header, Row, Col, Icon, Checkbox, Actionsheet, Toast, Dialog, WorkerCrumb  },
	data () {
		return {
			editable: false,
			workers:[],
			showAction:false,
			actions:[
		        { name: '删除', callback: this.deleteSelected }
		    ],
		    selecteWorkerIds:[],
		}
	},
	methods: {
        editWorker (worker) {
        	var emp = {};
			emp.cellPhoneNum = worker.cellPhoneNum;
			emp.userName = worker.realName;
			emp.wxAcct = worker.wechatAcct;
			emp.entityId = worker.id;
			this.$store.state.worker = emp;
			this.$router.push('/manage/workerAdd');
        },
        manage(){
        	this.editable = !this.editable;        	
        },
        searchWorker(){
			this.$router.push('/manage/workerSearch');
        },
        deleteWork(){
        	if(this.selecteWorkerIds.length == 0){
        		Toast.fail('请选择删除项');
        	}else{
        		this.showAction = !this.showAction;
        	}			
        },
        selecteWorker(id){
        	if(this.selecteWorkerIds.indexOf(id) == -1){
        		this.selecteWorkerIds.push(id);
        	}else{
        		this.selecteWorkerIds.pop(id);
        	}
        },
        deleteSelected(){
        	if(this.selecteWorkerIds.length > 0){
        		Dialog.confirm({
				  title: '提示',
				  message: '确认删除选择员工？'
				}).then(() => {
					this.deleteEmp();
					this.showAction = false;
				}).catch(() => {
				    this.showAction = false;
				});
        	}        	
        },
        listShopEmp(){
        	var req = {};
		    req.userId = this.userId;

			this.$api.mine.listShopEmp(req)
			.then(res => {
			      	this.workers = res;
			      	if(this.workers){
						for(var i = 0; i < this.workers.length; i++){
								this.workers[i].checked = false;
				      	}
			      	}   
			      	//console.info(this.workers);     
			})
			.catch(error => {
			        console.log(error);
			});
        },
        deleteEmp(){
        	var req = {};
		    req.userId = this.userId;
		    req.entityIds = this.selecteWorkerIds;

			this.$api.mine.deleteEmp(req)
			.then(res => {
				//if(res.code = "0000"){
					Toast.success("操作成功");
					this.listShopEmp();
				//}	        
			})
			.catch(error => {
				console.log(error);
			});        	
        }
       
    },
    mounted() {
		this.listShopEmp();

    }
}
</script>

<style scoped>
	.fixed {
	  position: fixed;
	  width:100%;
	  bottom: 0;
	  right: 0;
	  background-color: #fcfcfc;
	  padding: 10px 0;
	  margin: 0;
	  
	}
	.fixed .add{
		font-size:14px;
		float:right;
		margin-right:15px;
		color: #6B8C43;
	}
	.fixed .delete{
		font-size:14px;
		float:right;
		margin-right:15px;
		color: #CC0E18;
	}
	.cell-title{
		margin:10px 0 10px 15px;
		font-size:14px;
	}
	.right{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}
	.list-table{
		width:90%;
		margin:0 5%;
		font-size:14px;	
		text-align: center;		
	}
	.list-table td{
		padding:5px 0;
		overflow: hidden;
	}
</style>
