<template>
		<Tabbar v-model="active">
		  <TabbarItem icon="records" to="/">订单</TabbarItem>
		  <TabbarItem icon="contact" to="/userManage">用户</TabbarItem>
		  <TabbarItem icon="wap-home" to="/mine">我的</TabbarItem>
		</Tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "Footer",
  components: { Tabbar, TabbarItem },
  data() {
    return {
      active: -1
    };
  }
};
</script>

<style scoped>

</style>
