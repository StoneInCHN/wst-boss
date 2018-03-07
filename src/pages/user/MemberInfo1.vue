<template>
	<div>
		<div class="member_div">			
			<div>
				<Row>
					<Col span="6"><span>{{memberInfo.code}}</span></Col>
					<Col span="12">{{memberInfo.address}}</Col>					
					<Col span="6"><span class="right">{{memberInfo.name}}</span></Col>
				</Row>
			</div>
			<div>
				<Row>
					<Col span="20"><span>{{memberInfo.tel}}</span></Col>
					<Col span="4">
						<span class="green right" v-if="memberInfo.relation">已关联</span>
						<span class="red right" v-else>未关联</span>
					</Col>
				</Row>
			</div>
			<div class="operation">
				<Row>
					<Col span="4">
						<span @click="deleteItem">删除</span>
					</Col>
					<Col span="5">编辑</Col>
					<Col span="5">添加优惠</Col>
					<Col span="5">添加订单</Col>
					<Col span="5">
						<span class="right" v-if="memberInfo.relation">解除关联</span>
						<span class="right" v-else>扫码关联</span>
					</Col>
				</Row>
			</div>
	    </div>
	</div>
</template>

<script>
import { Row, Col, Dialog } from 'vant'
export default{
	name: "UserCard",
	components: { Row, Col, Dialog },
	props: {
        memberInfo: Object
    },
    data () {
		return {			

		}
	},
	methods: {
		deleteItem(){
			Dialog.confirm({
			  title: '提示',
			  message: '确认要删除编号用户吗？'
			}).then(() => {
			  // on confirm
			}).catch(() => {
			  // on cancel
			});
		}
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
