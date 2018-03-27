<template>
	<div>
		<Header backUrl="/manage/workerManage"/>
			<Search
				v-model="keyWords"
				placeholder="员工微信号"
				show-action
				@search="onSearch">
				<div slot="action" @click="onSearch" class="serach-btn">
				搜索
				</div>
			</Search>
			<WorkerRow v-for="(worker,index) in worderList" :worker="worker"  :key="index"/>
	</div>
</template>

<script>
import { Search, Toast } from 'vant'
import Header from "../../wechat/Header"
import WorkerRow from "./WorkerRow"
export default{
	name: "WorkerSearch",
	components: { Header, Search, WorkerRow, Toast },
	data () {
		return {
			keyWords:null,
			worderList:[]
		}
	},
	methods: {
		onSearch(){
			if(this.keyWords){
				this.worderList = [];
				for(var i = 1; i < 4; i++){
					var worker = {};
					worker.id = i;
					worker.imageUrl = "";
					worker.wxAcct = this.keyWords + i;
					this.worderList.push(worker);
				}
			}else{
				Toast.fail('请输入微信号');
			}
			
		},

       
    }
}
</script>

<style scoped>
	.serach-btn{
		color: #0a0;
		font-size: 14px;
		margin:0 15px;
	}
</style>
