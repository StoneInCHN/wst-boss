<template>
	<div>
		<Header/>
		<h3>{{msg}}</h3>
		<Footer/>
	</div>
</template>

<script>
import Header from "../wechat/Header";
import Footer from "../wechat/Footer";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: { Header, Footer },
  data() {
    return {
      active: 0,
      msg: "微信公众号首页(商家)"
    };
  },
  created() {
    this.$api.common
      .getKey()
      .then(r => {
        this.setToken(r.key)
      })
  },
  methods:{
    ...mapActions(["setToken"])
  }
};
</script>

<style scoped>
h3 {
  height: 100%;
  width: 50%;
  margin: 40% auto;
}
</style>
