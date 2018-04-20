<template>
	<div>
		<div class="member_div">
			<p v-if="type==1&&currentCode!=null" class="tel_title">该手机号已加入编号 {{currentCode}}</p>
			<div>
				<Row>
					<Col span="10" :class="type==1?'red':''"><span>{{memberInfo.cellPhoneNum}}</span></Col>
					<Col span="8"><span v-if="currentCode!=null">{{memberInfo.serialNo}}</span></Col>
					<Col span="6"><span class="right">{{memberInfo.addr.contactName}}</span></Col>
				</Row>
			</div>
			<div>
				<Row>
					<Col span="12" :class="type==2?'red':''"><span>{{memberInfo.addr.fullAddr}}</span></Col>
					<Col span="12"><span class="right">{{formatDate(memberInfo.createDate)}}</span></Col>
				</Row>
			</div>
			<div v-if="type==2 && memberInfo.serialNo==null && currentCode!=null" class="card_footer">
				<span @click="addToUserCard">添加联系方式到{{currentCode}}</span>
			</div>
	    </div>
	</div>
</template>

<script>
import { Row, Col } from 'vant'
import * as utils from "../../utils"
export default{
	name: "UserCard",
	components: { Row, Col },
	props: {
        memberInfo: Object,
        type: Number,
        currentCode: String
    },
    data () {
		return {			

		}
	},
	methods: {
		addToUserCard(){
			this.memberInfo.code = this.currentCode;
		},
	    formatDate(dateTime) {
      		return utils.formatDateTime(dateTime, "yyyy-MM-dd hh:mm");
    	},
    }
}
</script>

<style scoped>
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
