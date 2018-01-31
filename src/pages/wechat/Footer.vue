<template>
	<div>
		<Tabbar v-model="active">
		  <TabbarItem icon="records">订单</TabbarItem>
		  <TabbarItem icon="contact" dot>用户</TabbarItem>
		  <TabbarItem icon="wap-home" info="5" to="/boss">我的</TabbarItem>
		</Tabbar>
	</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default{
	name: "Footer",
	components: { Tabbar, TabbarItem },
	data () {
		return {
			active: 0,
		}
	}
}
</script>

<style scoped>

</style>
