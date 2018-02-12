<template>
	<div>
		<div class="card_border">
			<div class="code">{{userCard.code}}</div>
			<p>联系方式：<span v-for="item in userCard.tel">{{item}} </span></p>
			<p>地址：{{userCard.address}}</p>
			<p>姓名：{{userCard.name}}</p>
			<div class="card_footer">
				<span>添加优惠</span>
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
        userCard: Object
    },
    data () {
		return {			
			
		}
	},
	methods: {

    }
}
</script>

<style scoped>
	.card_border{
		color:#555;
		font-size:14px;
		margin:10px 5%;
		width:80%;
		height:140px;
		padding:5%;
		border:1px solid #aaa;
	}
	.code{
		font-size:20px;
		text-align: center;
		margin:5px;
	}
	.card_border p{
		text-align: center;
		margin:5px 0;
	}
	.card_footer{
		color:#4CC78D;		
		float:right;
		margin-top:20px;
	}
	.card_footer span{
		padding:0 5px;
	}
</style>
