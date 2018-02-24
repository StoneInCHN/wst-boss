<template>
	<div>
		<div class="member_div">
			<p v-if="type==1&&currentCode!=null" class="tel_title">该手机号已加入编号 {{currentCode}}</p>
			<div>
				<Row>
					<Col span="8" :class="type==1?'red':''"><span>{{memberInfo.tel}}</span></Col>
					<Col span="8"><span v-if="currentCode!=null">{{memberInfo.code}}</span></Col>
					<Col span="8"><span>{{memberInfo.name}}</span></Col>
				</Row>
			</div>
			<div>
				<Row>
					<Col span="12" :class="type==2?'red':''">{{memberInfo.address}}</Col>
					<Col span="12">{{memberInfo.createAt}}</Col>
				</Row>
			</div>
			<div v-if="type==2 && memberInfo.code==null && currentCode!=null" class="card_footer">
				<span @click="addToUserCard">添加联系方式到{{currentCode}}</span>
			</div>
	    </div>
	</div>
</template>

<script>
import { Row, Col } from 'vant'
export default{
	name: "UserCard",
	components: { Row, Col },
	props: {
        memberInfo: Object,
        type: String,
        currentCode: String
    },
    data () {
		return {			

		}
	},
	methods: {
		addToUserCard(){
			this.memberInfo.code = this.currentCode;
		}
    }
}
</script>

<style scoped>
	.member_div{
		font-size: 12px;
		margin:15px;
		text-align: left;
		border-bottom:1px solid #999
	}
	.member_div div{
		margin:5px 0;
	}
	.tel_title{
		color:#999;
	}
	.red{
		color:#EB5573
	}
	.card_footer{
		color:#4CC78D;		
		text-align: right;
	}
	.card_footer span{
		padding:0 5px;
	}
</style>
