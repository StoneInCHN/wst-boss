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
  // created() {
  //   if(this.userId){
  //     return;
  //   }
  //   let url = location.href+"";
  //   //alert(url);
  //   let authCode = null;
  //   if (url && url.indexOf('?') !== -1) {
  //       let params =  url.split('?')[1].split('&');
  //       for (var i = 0; i < params.length; i++) {
  //         if(params[i] && params[i].indexOf('=') !== -1){
  //             let key = params[i].split('=')[0];
  //             let value = params[i].split('=')[1];
  //             if(key && value && key =='code'){
  //                authCode = value;
  //                break;
  //             }
  //         }
  //       }
  //   }
  //   //alert(authCode);

  //   const params = {};
  //   params.authCode = authCode;
  //   params.pageId = 0;
  //   this.$api.common.wxAuthToken(params)
  //     .then(r => {
  //       this.setToken(r.token);
  //       this.setUserId(r.userId);
  //       return this.$api.common.getCobType();
  //     })
  //     .then(r => {
  //       console.log({r})
  //       this.setCobType(r.cobPayType)
  //     });
  // },
  created() { 
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
  computed: {
    ...mapGetters(["userId"])
  },
  methods: {
    ...mapActions(["setToken", "setUserId", "setCobType"])
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
