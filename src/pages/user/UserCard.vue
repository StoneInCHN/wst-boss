<template>
	<div>
		<div class="card_border">
			<div class="code">{{currentCode}}</div>
			<p>联系方式：<span v-for="item in userCard.tel">{{item}} </span></p>
			<p>地址：{{userCard.address}}</p>
			<p>姓名：{{userCard.name}}</p>
			<div class="card_footer">
				<span @click="addCoupon">添加优惠</span>
				<span>添加订单</span>
			</div>
		</div>

	</div>
</template>

<script>
import {  } from 'vant'
export default{
	name: "UserCard",
	components: { },
	props: {
        userCard: Object,
        currentCode: String
    },
    data () {
		return {			
			
		}
	},
	methods: {
		addCoupon(){
			this.$router.push('/user/addCoupon');
		}
    }
}
</script>

<style scoped>
	.card_border{
		color:#555;
		font-size:12px;
		margin:10px 5%;
		width:90%;
		height:150px;
		border:1px solid #aaa;
	}
	.code{
		font-size:20px;
		text-align: center;
		margin:5px;
	}
	.card_border p{
		text-align: center;
		margin:10px 0;
	}
	.card_footer{
		color:#4CC78D;		
		float:right;
		margin-top:10px;
	}
	.card_footer span{
		padding:0 10px;
	}
</style>
