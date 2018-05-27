<template>
	<div>
		<Header backUrl="/manage/workerManage"/>
			<NoticeBar mode="closeable" :scrollable="false">
  				温馨提示：添加员工前，员工必须先微信关注“云水站”。
			</NoticeBar >
			<Search
				v-model="keyWords"
				placeholder="员工微信名"
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
import { Search, Toast,NoticeBar } from 'vant'
import Header from "../../wechat/Header"
import WorkerRow from "./WorkerRow"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "WorkerSearch",
	components: { Header, Search, WorkerRow, Toast,NoticeBar },
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
				this.worderList = [];
				//Toast.fail('请输入微信名');
			}
			
		},
		getWxByNickName(){
			var req = {};
			req.userId = this.userId;
			req.userName = this.keyWords;
			this.$api.mine.getWxByNickName(req)
			.then(res => {
			      	this.worderList = [];
			      	var wokers = res;
			      	for (var i = 0; i < wokers.length; i++) {
			      		var worker = {};
						worker.headImgUrl = wokers[i].headImgUrl;
						worker.id = wokers[i].id;
						worker.wxOpenId = wokers[i].openId;
						worker.wxAcct = wokers[i].nickname;
						this.worderList.push(worker);
			      	}       
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
