<template>
		<Tabbar v-model="active">
		  <TabbarItem icon="records" to="/order" @click="setActive(0)">订单</TabbarItem>
		  <TabbarItem icon="contact" to="/userManage" @click="setActive(1)">用户</TabbarItem>
		  <TabbarItem icon="wap-home" to="/mine"  @click="setActive(2)">我的</TabbarItem>
		</Tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "Footer",
  components: { Tabbar, TabbarItem },
  data() {
    return {
      active: 0
    };
  },
  methods:{
      setActive(param){
        console.info(param);
         this.$store.state.active = param;
      }
  },
  mounted(){
    this.active = this.$store.state.active;
  }
};
</script>

<style scoped>

</style>
