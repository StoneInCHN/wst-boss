<template>
	<div>
			<div class="workerDiv"  @click="selectedRow">
				<Row>
					<Col span="6">
					<img :src="worker.headImgUrl" width="60px" height="60px"/></Col>
					<Col span="18"><span class="wxAcct">{{worker.wxAcct}}</span></Col>				
				</Row>				
			</div>	
	</div>
</template>

<script>
import {  Row, Col, Icon } from 'vant'
export default{
	name: "WorkerRow",
	components: { Row, Col, Icon },
	props: {
        worker: Object
    },
	data () {
		return {

		}
	},
	methods: {
		selectedRow(){
			var emp = {};
			emp.cellPhoneNum = null;
			emp.userName = null;
			emp.headImgUrl = this.worker.headImgUrl;
			emp.wxAcct = this.worker.wxAcct;
			emp.wxOpenId = this.worker.wxOpenId;
			this.$store.state.worker = emp;
			//this.$store.dispatch('setWorker', emp);
			this.$router.push('/manage/workerAdd');
        }
    }
}
</script>

<style scoped>
	.workerDiv{
		font-size:14px;
		margin:10px;
		padding:5px 15px 0 15px;
		border-radius: 5px;
		border:1px solid #ddd;
		color:#0a0;
	}
	.workerDiv img{
		border:1px solid #ddd;
		border-radius:35px;
	}
	.wxAcct{
		line-height: 60px;
	}
</style>
