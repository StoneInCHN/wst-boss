<template>
	<div>
		<div class="member_div">			
			<div>
				<Row>
					<Col span="6"><span>{{memberInfo.serialNo}}</span></Col>
					<Col span="12">{{memberInfo.addrInfo}}</Col>					
					<Col span="6"><span class="right">{{memberInfo.realName}}</span></Col>
				</Row>
			</div>
			<div>
				<Row>
					<Col span="20">
						<span>{{memberInfo.contactPhone}}</span>
						<span v-if="memberInfo.contactPhone2">,</span>
						<span>{{memberInfo.contactPhone2}}</span>
						<span v-if="memberInfo.contactPhone3">,</span>
						<span>{{memberInfo.contactPhone3}}</span>

						<span v-if="memberInfo.fixPhone">,</span>
						<span>{{memberInfo.fixPhone}}</span>
						<span v-if="memberInfo.fixPhone2">,</span>
						<span>{{memberInfo.fixPhone2}}</span>
						<span v-if="memberInfo.fixPhone3">,</span>
						<span>{{memberInfo.fixPhone3}}</span>
					</Col>
					<Col span="4">
						<span class="green right" v-if="memberInfo.qrCodeId">已关联</span>
						<span class="red right" v-else>未关联</span>
					</Col>
				</Row>
			</div>
			<div class="operation">
				<Row>
					<Col span="4">
						<span @click="deleteItem">删除</span>
					</Col>
					<Col span="5">
						<span  @click="editItem">编辑</span>
					</Col>
					<Col span="5">
						<span @click="addCoupon">添加优惠</span>
					</Col>
					<Col span="5">
						<span @click="addOrder">添加订单</span>
					</Col>
					<Col span="5">
						<span class="right" v-if="memberInfo.qrCodeId"  @click="confirmClear">解除关联</span>
						<span class="right" v-else @click="scanQr">扫码关联</span>
					</Col>
				</Row>
			</div>
	    </div>
	</div>
</template>

<script>
import { Row, Col, Dialog, Toast } from 'vant'
export default{
	name: "UserCard",
	components: { Row, Col, Dialog, Toast },
	props: {
        memberInfo: Object,
        memberList: Array,
        keyWords: String
    },
    data () {
		return {			

		}
	},
	methods: {
		addCoupon(){
			this.$store.state.seriUser = this.memberInfo;
			this.$router.push('/user/addCoupon');
		},
		addOrder(){
			this.$store.state.seriUser = this.memberInfo;
			this.$router.push('/user/addOrder');
		},
		deleteItem(){
			Dialog.confirm({
			  title: '提示',
			  message: '确认要删除编号用户吗？'
			}).then(() => {
				var req = {};
			    req.userId = this.$store.state.userId;
			    req.entityId=this.memberInfo.id;
				this.$api.user.deleteSeriUser(req)
				.then(res => {
				    //if(res.code = "0000"){
				    	//刷新 编号用户列表 数据
				    	this.$emit('refreshSeriUsers');
				    	Toast.success("操作成功");
				    //}	        
				})
				.catch(error => {
				        console.log(error);
				});
			  
			  
			}).catch(() => {
			  // on cancel
			});
		},
		editItem(){
			console.info(this.memberInfo);
			this.$store.state.seriUser = this.memberInfo;
			this.$router.push('/user/editCodeUser');
		},
		scanQr(){
			this.$router.push('/user/scanQr1');
		},
		confirmClear(){
			Dialog.confirm({
			  title: '提示',
			  message: '确认要解除编号和二维码的关联吗？'
			}).then(() => {
			    var seriUser = {};
			    seriUser.userId = this.$store.state.userId;
			    seriUser.entityId = this.memberInfo.id;
			    seriUser.userNum = this.memberInfo.userNum;
			    seriUser.realName = this.memberInfo.realName;
			    seriUser.addrInfo = this.memberInfo.addrInfo;
			    seriUser.doorNum = this.memberInfo.doorNum;
			    seriUser.qrCodeId = -1;
			    seriUser.remark = this.memberInfo.remark;

			    seriUser.contactPhone = this.memberInfo.contactPhone;
			    seriUser.contactPhone2 = this.memberInfo.contactPhone2;
			    seriUser.contactPhone3 = this.memberInfo.contactPhone3;

			    seriUser.fixPhone = this.memberInfo.fixPhone;
			    seriUser.fixPhone2 = this.memberInfo.fixPhone2;
			    seriUser.fixPhone3 = this.memberInfo.fixPhone3;
				this.$api.user.editSeriUser(seriUser)
				.then(res => {
				    if(res.code = "0000"){
				    	//刷新 编号用户列表 数据
				    	this.$emit('refreshSeriUsers');
				    	Toast.success("操作成功");
				    }	        
				})
				.catch(error => {
				        console.log(error);
				});				
			 
			}).catch(() => {
			  // on cancel
			});
        },
    }
}
</script>

<style scoped>
	.operation{
		color:green;
	}
	.right{
		float:right
	}
	.member_div{
		font-size: 12px;
		margin:18px;
		text-align: left;
		border-bottom:1px solid #999
	}
	.member_div div{
		margin:5px 0;
	}
	.tel_title{
		color:#999;
	}
	.green{
		color:#fff;
		background-color: green;
		border-radius: 3px;
		padding:5px;
	}
	.red{
		color:#fff;
		background-color: #EB5573;
		border-radius: 3px;
		padding:5px;
	}
	.card_footer{
		color:#4CC78D;		
		text-align: right;
	}
	.card_footer span{
		padding:0 5px;
	}
</style>
