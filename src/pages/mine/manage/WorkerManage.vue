<template>
	<div>
		<Header backUrl="/manage"/>
			<p class="cell-title">员工管理 
				<a @click="manage" class="right">
					<span v-if="editable">取消</span>
					<span v-else>编辑</span>
				</a>
			</p>
			<Row v-for="(worker,index) in workers" :key="index" class="row">
				<Col span="2" v-if="editable"><Checkbox/></Col>
				<Col span="2" v-else><Icon name="contact"/></Col>
			  	<Col span="5">{{worker.name}}</Col>
				<Col span="10">{{worker.phone}}</Col>
				<Col span="5">{{worker.wechat}}</Col>
				<Col span="2"><Icon name="edit"  @click="editWorker(worker)"/></Col>
			</Row>
			<p class="fixed">			
				<a v-if="editable==false" @click="addWork" class="add"><Icon name="add-o"/> 添加</a>
				<a v-else @click="deleteWork" class="delete"><Icon name="delete"/> 删除</a>
			</p>
			<Actionsheet v-model="showAction" :actions="actions" cancel-text="取消"/>
	</div>
</template>

<script>
import { Row, Col, Icon, Checkbox, Actionsheet } from 'vant'
import Header from "../../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Row, Col, Icon, Checkbox, Actionsheet },
	data () {
		return {
			workers:[{
				id:1,
				name:"李四",
				wechat:"mousi",
				phone:"15082247578"
			},{
				id:2,
				name:"王三",
				wechat:"shansi",
				phone:"15272247578"
			}],
			editable:false,
			checked:true,
			showAction:false,
			actions:[
		        { name: '删除', callback: this.deleteSelected }
		    ],
		}
	},
	methods: {
        editWorker (id) {
			this.$router.push('/manage/workerAdd');
        },
        manage(){
        	this.editable = !this.editable;        	
        },
        addWork(){
			this.$router.push('/manage/workerAdd');
        },
        deleteWork(){
			this.showAction = !this.showAction;
        }
       
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
	.row{
		font-size:14px;
		margin:10px 15px 0 15px;
	}
</style>
