<template>
	<div>
		<Header backUrl="/user/newCode"/>
			<div class="qr_container">
				<div class="qr_item" >
					<span>扫描二维码</span>
				</div>
			</div>
			<p class="label">请扫描二维码关联编号</p>
	</div>
</template>

<script>
import Header from "../wechat/Header"
export default{
	name: "ScanQr",
	components: { Header },
	data () {
		return {

		}
	},
	methods: {    
    }
}
</script>

<style scoped>
	.qr_container{
		display: flex;
		align-content: center;
		justify-content: space-around;
		color: #6B8C43;
		margin:100px 25%;
		width:50%;
	}
	.qr_item{
		flex: 1;
		height: 50px;
		border: 1px solid #bbb;
		margin:10px;
		position: relative;
		padding:50px;
		font-size:10px;
		vertical-align: middle;
	}
	.label{
		text-align: center;
		font-size: 14px;
	}
</style>
