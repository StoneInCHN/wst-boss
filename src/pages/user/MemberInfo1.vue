<template>
	<div>
		<div class="member_div">			
			<div>
				<Row>
					<Col span="6"><span>{{memberInfo.serialNo}}</span></Col>
					<Col span="12">{{ `${memberInfo.addrInfo} ${memberInfo.doorNum || ""}` }}</Col>					
					<Col span="6"><span class="right">{{memberInfo.realName}}</span></Col>
				</Row>
			</div>
			<div>
				<Row>
					<Col span="20">
						<span>{{memberInfo.contactPhone}}</span>
						<span v-if="memberInfo.contactPhone2">,</span>
						<span>{{memberInfo.contactPhone2}}</span>
						<span v-if="memberInfo.contactPhone3">,</span>
						<span>{{memberInfo.contactPhone3}}</span>

						<span v-if="memberInfo.fixPhone">,</span>
						<span>{{memberInfo.fixPhone}}</span>
						<span v-if="memberInfo.fixPhone2">,</span>
						<span>{{memberInfo.fixPhone2}}</span>
						<span v-if="memberInfo.fixPhone3">,</span>
						<span>{{memberInfo.fixPhone3}}</span>
						<!-- <span>{{memberInfo.createDate | formatDate }}</span> -->
					</Col>
					<Col span="4">
						<span class="green right" v-if="memberInfo.qrCodeId">已关联</span>
						<span class="red right" v-else>未关联</span>
					</Col>
				</Row>
			</div>
			<div class="operation">
				<Row>
<!-- 					<Col span="4">
						<span @click="deleteItem">删除</span>
					</Col> -->
					<Col span="6">
						<span  @click="editItem">编辑</span>
					</Col>
					<Col span="6">
						<span @click="addCoupon">添加优惠</span>
					</Col>
					<Col span="6">
						<span @click="addOrder">添加订单</span>
					</Col>
					<Col span="6">
						<span class="right" v-if="memberInfo.qrCodeId"  @click="confirmClear">解除关联</span>
						<span class="right" v-else @click="addQr">扫码关联</span>
					</Col>
				</Row>
			</div>
	    </div>
	</div>
</template>

<script>
import { Row, Col, Dialog, Toast } from "vant";
import { mapGetters, mapActions } from "vuex";
import { formatDateTime } from "@/utils";
export default {
  name: "UserCard",
  components: { Row, Col, Dialog, Toast },
  props: {
    memberInfo: Object,
    memberList: Array,
    keyWords: String
  },
  data() {
    return {
      config: {},
			urlPre: process.env.BASE_URL
    };
  },
  computed: { ...mapGetters(["userId", "seriUser"]) },
  methods: {
    ...mapActions(["setSeriUser", "setCouponGoodsList", "setExistCouponIds", "setUserOrderGoodsList"]),
    addCoupon() {
      this.setSeriUser(this.memberInfo);
      this.setCouponGoodsList([])
      this.setExistCouponIds([])
      this.$router.push("/user/addCoupon");
    },
    addOrder() {
      this.setSeriUser(this.memberInfo);
      this.setUserOrderGoodsList([]);
      this.$router.push("/user/addOrder");
    },
    deleteItem() {
      Dialog.confirm({
        title: "提示",
        message: "确认要删除编号用户吗？"
      })
        .then(() => {
          var req = {};
          req.userId = this.userId;
          req.entityId = this.memberInfo.id;
          this.$api.user
            .deleteSeriUser(req)
            .then(res => {
              //if(res.code = "0000"){
              //刷新 编号用户列表 数据
              this.$emit("refreshSeriUsers");
              Toast.success("操作成功");
              //}
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    editItem() {
      console.info(this.memberInfo);
      this.setSeriUser(this.memberInfo);
      this.$router.push("/user/editCodeUser");
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
          const qrCodePrex = this.urlPre.split("/wst-boss")[0]
          if (url && url.indexOf(qrCodePrex) !== -1) {
            //从url中获取qrCodeId
            if (paramsObj.id) {
    						Dialog.confirm({
                  title: '提示',
                  message: '确认要将编号关联此二维码？'
                }).then(() => {
                    // this.tempQrCode = paramsObj.id
                    this.edit(paramsObj.id);
                }).catch(() => {
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
      seriUser.entityId = this.memberInfo.id;
      seriUser.userNum = this.memberInfo.userNum;
      seriUser.realName = this.memberInfo.realName;
      seriUser.addrInfo = this.memberInfo.addrInfo;
      seriUser.doorNum = this.memberInfo.doorNum;
      // seriUser.qrCodeId = this.tempQrCode;
      seriUser.qrCodeId = qrCodeId;
      seriUser.remark = this.memberInfo.remark;

      seriUser.contactPhone = this.memberInfo.contactPhone;
      seriUser.contactPhone2 = this.memberInfo.contactPhone2;
      seriUser.contactPhone3 = this.memberInfo.contactPhone3;

      seriUser.fixPhone = this.memberInfo.fixPhone;
      seriUser.fixPhone2 = this.memberInfo.fixPhone2;
      seriUser.fixPhone3 = this.memberInfo.fixPhone3;
      this.$api.user
        .editSeriUser(seriUser)
        .then(res => {
					//刷新 编号用户列表 数据
					this.memberInfo.qrCodeId = qrCodeId;
					// this.tempQrCode = ""
          this.$emit("refreshSeriUsers");
        })
    },
    confirmClear() {
      Dialog.confirm({
        title: "提示",
        message: "确认要解除编号和二维码的关联吗？"
      })
        .then(() => {
          var req = {};
          req.userId = this.userId;
          req.entityId = this.memberInfo.id;
          this.$api.user
            .unbindQrCode(req)
            .then(res => {
              this.memberInfo.qrCodeId = null;
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
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDateTime(date, "yyyy-MM-dd hh:mm");
    }
  },
  mounted() {
    //this.getConfig();

  }
};
</script>

<style scoped>
.operation {
  color: green;
}
.right {
  float: right;
}
.member_div {
  font-size: 12px;
  margin: 18px;
  text-align: left;
  border-bottom: 1px solid #999;
}
.member_div div {
  margin: 5px 0;
}
.tel_title {
  color: #999;
}
.green {
  color: #fff;
  background-color: green;
  border-radius: 3px;
  padding: 5px;
}
.red {
  color: #fff;
  background-color: #eb5573;
  border-radius: 3px;
  padding: 5px;
}
.card_footer {
  color: #4cc78d;
  text-align: right;
}
.card_footer span {
  padding: 0 5px;
}
</style>
