<template>
	<div>
			<Row  gutter="10">
				<Col class="col" span="3">
					<span v-if="editable">
			  			<Checkbox v-model="checked" @change="selecteWorker"/>
			  		</span>
			  		<span v-else>
			  			<Checkbox v-model="checked" @change="selecteWorker" disabled/>
			  		</span>
				</Col>
				<Col class="col" span="4">
					<span v-if="worker.realName">{{worker.realName}}</span>
					<span v-else>-</span>
				</Col>
				<Col class="col" span="7">
					<span v-if="worker.cellPhoneNum">{{worker.cellPhoneNum}}</span>
					<span v-else>-</span>
			    </Col>
				<Col class="col" span="7">
					<span v-if="worker.wechatAcct">{{worker.wechatAcct}}</span>
					<span v-else>-</span>
				</Col>
				<Col class="col" span="3"><Icon name="edit"  @click="editWorker"/></Col>
			</Row>	
	</div>
</template>

<script>
import { Icon, Toast, Checkbox, Row, Col } from 'vant'
export default{
	name: "Mine",
	components: { Icon, Toast, Checkbox, Row, Col },
	props: {
        worker: Object,
        editable: Boolean,
        editIds: Array,
    },
    data () {
		return {			
			checked: false
		}
	},
	methods: {
	    editWorker () {
        	var emp = {};
			emp.cellPhoneNum = this.worker.cellPhoneNum;
			emp.userName = this.worker.realName;
			emp.wxAcct = this.worker.wechatAcct;
			emp.entityId = this.worker.id;
			this.$store.state.worker = emp;
			this.$router.push('/manage/workerAdd');
        },
	    selecteWorker(item){
	    	if(item == true){
	    		this.editIds.push(this.worker.id);
	    	}else{
	    		this.editIds.pop(this.worker.id);
	    	}
	    	console.info(this.editIds);
	    }

    }
}
</script>
<style scoped>
	.col {
	    line-height: 35px;
	    text-align: center;
	}
</style>
