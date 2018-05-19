<template>
	<div>
		<Header/>
		
		<Footer/>
	</div>
</template>

<script>
import Header from "../wechat/Header";
import Footer from "../wechat/Footer";
import { Toast } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: { Header, Footer, Toast },
  data() {
    return {
      active: 0
    };
  },
  created() {
    //this.initTest(); 
    this.initData()
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    ...mapActions(["setToken", "setUserId", "setCobType"]),
    initData(){
      let paramsObj = {};
      const paramsArrays = location.search.substring(1).split("&");
      paramsArrays.forEach(item => {
        paramsObj[item.split("=")[0]] = item.split("=")[1];
      });
      if (paramsObj.code) {
        this.$api.common
          .wxAuthToken({
            authCode: paramsObj.code,
            pageId: paramsObj.state
          })
          .then(r => {
            this.setToken(r.token);
            this.setUserId(r.userId);
            return this.$api.common.getCobType();
          })
          .then(r => {
            console.log({ r });
            this.setCobType(r.cobPayType);
            this.$router.push("/order")
          });
      }
    },
    initTest(){
      let userId = 13;
      this.$api.common
        .auth({
          userId: userId
        })
        .then(r => {
          this.setToken(r.token);
          this.setUserId(userId);
          return this.$api.common.getCobType();
        })
        .then(r => {
          console.log({ r });
          this.setCobType(r.cobPayType);
          this.$router.push("/order")
        });
    }
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
