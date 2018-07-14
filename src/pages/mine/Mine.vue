<template>
	<div>
		<Header backUrl="/"/>
		<h2 class="sub_title">我的</h2>
		<CellGroup>
			<Cell title="店铺管理" icon="shop" is-link to="/manage/storeManage" />
			<Cell title="员工管理" icon="shop" is-link to="/manage/workerManage" />
			<Cell title="二维码管理" icon="shop" is-link to="/manage/qrManage" />
		</CellGroup>
		<Footer/>
	</div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant'
import Header from "../wechat/Header"
import Footer from "../wechat/Footer"
export default{
	name: "Mine",
	components: { Header, Footer, Cell, CellGroup, Icon },
	data () {
		return {

		}
	}
}
</script>

<style scoped>
	.right_icon{
		float:right;
	}
	.sub_title {
	    margin: 0;
	    font-weight: 400;
	    font-size: 14px;
	    color: rgba(69,90,100,.6);
	    padding: 20px 15px 10px;
	}
</style>
