<template>
	<div>
		<div v-if="userCard.id!=null" class="card_border">
			<div class="code">{{currentCode}}</div>
			<p class="qr">
				<span v-if="userCard.qrCodeId==null"  @click="addQr">未联二维码>></span>
				<span v-else @click="confirmClear">解除关联>></span>
			</p>
			<p>联系方式：
				<span v-if="userCard.contactPhone">{{userCard.contactPhone}}</span>
				<span v-if="userCard.contactPhone2">,{{userCard.contactPhone2}}</span>
				<span v-if="userCard.contactPhone3">,{{userCard.contactPhone3}}</span>
			</p>
			<p>地址：{{userCard.addrInfo}}</p>
			<p>姓名：{{userCard.realName}}</p>
			<div class="card_footer">
				<span @click="addCoupon">添加优惠</span>
				<span @click="addOrder">添加订单</span>
			</div>
		</div>
		<div v-else class="no_info">
			暂无该信息
		</div>
	</div>
</template>
    }

<script>
import { Dialog } from "vant";
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["userId"]) },
  name: "UserCard",
  components: { Dialog },
  props: {
    userCard: Object,
    currentCode: String
  },
  data() {
    return {
      config: {},
      urlPre: "http://test.yeager.vip"
    };
  },
  methods: {
    addCoupon() {
      this.$store.state.seriUser = this.userCard;
      this.$router.push("/user/addCoupon");
    },
    addOrder() {
      this.$store.state.seriUser = this.userCard;
      this.$router.push("/user/addOrder");
    },
    confirmClear() {
      Dialog.confirm({
        title: "提示",
        message: "确认要解除编号和二维码的关联吗？"
      })
        .then(() => {
          var req = {};
          req.userId = this.userId;
          req.entityId = this.userCard.id;
          this.$api.user
            .unbindQrCode(req)
            .then(res => {
              this.userCard.qrCodeId = null;
              this.$emit("refreshSeriUsers");
              Toast.success("操作成功");
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    addQr() {
      this.$wechat.scanQRCode({
        needResult: 1,
        scanType: ["qrCode"],
        desc: "scanQRCode desc",
        success: res => {
          let url = res.resultStr;
          let paramsObj = {};
          const paramsArrays = url.split("?")[1].split("&");
          paramsArrays.forEach(item => {
            paramsObj[item.split("=")[0]] = item.split("=")[1];
          });
          const qrCodePrex = location.host;
          if (url && url.indexOf(qrCodePrex) !== -1) {
            //从url中获取qrCodeId
            if (paramsObj.id) {
              Dialog.confirm({
                title: "提示",
                message: "确认要将编号关联此二维码？"
              })
                .then(() => {
                  // this.userCard.qrCodeId = paramsObj.id;
                  this.edit(paramsObj.id);
                })
                .catch(() => {
                  // on cancel
                });
            }
          } else {
            Toast.fail("请扫描正确的二维码");
          }
        },
        cancel: res => {
          console.inf(res);
          this.$wechat.closeWindow();
        }
      });
    },
    edit(qrCodeId) {
      var seriUser = {};
      seriUser.userId = this.userId;
      seriUser.entityId = this.userCard.id;
      seriUser.userNum = this.userCard.userNum;
      seriUser.realName = this.userCard.realName;
      seriUser.addrInfo = this.userCard.addrInfo;
      seriUser.doorNum = this.userCard.doorNum;
      seriUser.qrCodeId = qrCodeId;
      seriUser.remark = this.userCard.remark;

      seriUser.contactPhone = this.userCard.contactPhone;
      seriUser.contactPhone2 = this.userCard.contactPhone2;
      seriUser.contactPhone3 = this.userCard.contactPhone3;

      seriUser.fixPhone = this.userCard.fixPhone;
      seriUser.fixPhone2 = this.userCard.fixPhone2;
      seriUser.fixPhone3 = this.userCard.fixPhone3;

      this.$api.user
        .editSeriUser(seriUser)
        .then(res => {
          //刷新 编号用户列表 数据
          this.$emit("refreshSeriUsers");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getConfig() {
      let params = {
        userName: location.href.split("#")[0]
      };
      this.$api.common
        .jsApiConfig(params)
        .then(res => {
          if (res && res.code === "0000" && res.msg) {
            this.config.jsapi_ticket = res.msg.jsapi_ticket;
            this.config.signature = res.msg.signature;
            this.config.nonceStr = res.msg.nonceStr;
            this.config.timestamp = res.msg.timestamp;
            this.config.url = res.msg.url;
            this.config.appId = res.msg.appId;
          }

          if (this.config) {
            this.$wechat.config({
              debug: false,
              appId: this.config.appId,
              timestamp: this.config.timestamp,
              nonceStr: this.config.nonceStr,
              signature: this.config.signature,
              jsApiList: ["scanQRCode", "closeWindow"]
            });
            this.$wechat.error(res => {
              console.log("wx loading error");
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getConfig();
  }
};
</script>

<style scoped>
.qr {
  color: #4cc78d;
}
.card_border {
  color: #555;
  font-size: 12px;
  margin: 10px 5%;
  width: 90%;
  height: 180px;
  border: 1px solid #aaa;
}
.code {
  font-size: 20px;
  text-align: center;
  margin: 5px;
}
.card_border p {
  text-align: center;
  margin: 10px 0;
}
.card_footer {
  color: #4cc78d;
  float: right;
  margin-top: 10px;
}
.card_footer span {
  padding: 0 10px;
}
.no_info {
  text-align: center;
  font-size: 14px;
  color: #aaa;
  margin-top: 20px;
}
</style>
