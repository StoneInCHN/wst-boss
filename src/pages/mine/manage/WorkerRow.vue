<template>
	<div>
			<div class="workerDiv"  @click="selectedRow">
				<Row>
					<Col span="6">
					<img src="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg" width="60px" height="60px"/></Col>
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
			emp.wxAcct = this.worker.wxAcct;
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
