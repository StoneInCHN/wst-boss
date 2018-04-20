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
				this.getWxByNickName();
			}else{
				Toast.fail('请输入微信号');
			}
			
		},
		getWxByNickName(){
			var req = {};
			req.userId = this.$store.state.userId;
			req.userName = this.keyWords;
			this.$api.mine.getWxByNickName(req)
			.then(res => {
			    //if(res.code = "0000"){
			      	//console.info(res);
			      	var wokers = res;
			      	for (var i = 0; i < wokers.length; i++) {
			      		var worker = {};
						worker.headImgUrl = wokers[i].headImgUrl;
						worker.wxOpenId = wokers[i].id;
						worker.wxAcct = wokers[i].nickname;
						this.worderList.push(worker);
			      	}
			      	
			    //}	        
			})
			.catch(error => {
			    console.log(error);
			});
		}
       
    },
    mounted(){

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
