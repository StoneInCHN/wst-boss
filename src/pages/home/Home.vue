<template>
	<div>
		<Header/>
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
    this.initData();
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    ...mapActions(["setToken", "setUserId", "setCobType", "setOpenId"]),
    initData() {
      /** 
      if(this.userId){        
        return;
      }
      */
      let paramsObj = {};
      const paramsArrays = location.search.substring(1).split("&");
      paramsArrays.forEach(item => {
        paramsObj[item.split("=")[0]] = item.split("=")[1];
      });
      if (paramsObj.code && paramsObj.state === "0") {
        this.$api.common
          .wxAuthToken({
            authCode: paramsObj.code,
            pageId: paramsObj.state
          })
          .then(r => {
            this.setToken(r.token);
            this.setUserId(r.userId);
            //注册页面
            return this.$api.common.getCobType();
          })
          .then(r => {
            this.setCobType(r.cobPayType);
            this.$router.replace("/order");
          });
      } else if (paramsObj.state === "2") {
        const params = {
          authCode: paramsObj.code,
          pageId: paramsObj.state
        }
        this.$api.common
          .getOpenId(params)
          .then(r => {
            this.setOpenId(r.openId);
            this.$router.replace("/register");
          })
          .catch(e => {
            Toast(e.message)
          });
      }
    },
    initTest() {
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
          this.$router.replace("/order");
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
