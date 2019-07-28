<template>
		<Tabbar v-model="activeIndex">
		  <TabbarItem icon="records" to="/index" @click="setActiveIndex(0)">首页</TabbarItem>
      <!--
      <TabbarItem icon="records" to="/order" @click="setActiveIndex(0)">订单</TabbarItem>
      -->
      <TabbarItem icon="gold-coin" to="/manage/goodsManage"  @click="setActiveIndex(1)">商品</TabbarItem>
		  <TabbarItem icon="contact" to="/userManage" @click="setActiveIndex(2)">用户</TabbarItem>
      <TabbarItem icon="wap-home" to="/mine"  @click="setActiveIndex(3)">我的</TabbarItem>
		</Tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Footer",
  components: { Tabbar, TabbarItem },
  data() {
    return {
      activeIndex: 0
    };
  },
  mounted(){
    this.activeIndex = this.active
  },
  computed: {
    ...mapGetters(["active"])
  },
  methods: {
    ...mapActions(["setActive"]),
    setActiveIndex(index){
      this.activeIndex = index
      this.setActive(index)
    }
  }
};
</script>

<style scoped>
</style>
