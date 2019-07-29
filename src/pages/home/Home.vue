<template>
	<div class="home-page">
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
      config: {},
      urlPre: process.env.BASE_URL
    };
  },
  created() {
    this.getWXConfig();
    if (process.env.NODE_ENV == "production") {
      this.initData();
    } else {
      //this.initTest();
      this.initData();
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    ...mapActions(["setToken", "setUserId", "setCobType", "setOpenId"]),
    initData() {
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
            //this.$router.replace("/order");
            this.$router.replace("/index")
          });
      } else if (paramsObj.state === "2") {
        const params = {
          authCode: paramsObj.code,
          pageId: paramsObj.state
        };
        this.$api.common
          .getOpenId(params)
          .then(r => {
            this.setOpenId(r.openId);
            this.$router.replace("/register");
          })
          .catch(e => {
            Toast(e.message);
          });
      }
    },
    getWXConfig() {
      let params = {
        userName: location.href.split("#")[0]
      };
      this.$api.common
        .jsApiConfig(params)
        .then(res => {
          if (res && res.code === "0000" && res.msg) {
            const { appId, timestamp, nonceStr, signature } = res.msg;
            this.$wechat.config({
              debug: false,
              appId,
              timestamp,
              nonceStr,
              signature,
              jsApiList: ["scanQRCode", "closeWindow"]
            });
          }else{
            this.$wechat.error(res => {
              console.log("wx loading error");
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initTest() {
      let userId = 12;
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
          //console.log({ r });
          this.setCobType(r.cobPayType);
          //this.$router.replace("/order");
          this.$router.replace("/index")
        });
    }
  }
};
</script>

<style lang="less">
.home-page {
  height: 100%;
  background: #fff url("../../assets/images/order.png");
  background-size: 100% 32vw;
  h3 {
    height: 100%;
    width: 50%;
    margin: 40% auto;
  }
}
</style>
