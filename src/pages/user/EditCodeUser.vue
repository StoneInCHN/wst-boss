<template>
	<div>
		<Header backUrl="/user/totalCodeUsers"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="编辑" class="cell">
			    	<Button type="primary" size="small" @click="validateInput">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="userCard.userNum" placeholder="请输入用户编号"/>
				  <Field label="手机号" v-model="phoneList" placeholder="可输入多个手机号，用逗号分隔"  @focus='numKeyboard("phoneList")'/>
				  <Field label="座机" v-model="telList" placeholder="例 028-6573158，多个用逗号分隔"  @focus='numKeyboard("telList")'/>
				  <Field label="姓名" v-model="userCard.realName" placeholder="请填写用户姓名" required/>
				  <Field label="地址" v-model="userCard.addrInfo" placeholder="请填写用户地址" required/>
				  <Field label="楼号-门牌号" v-model="userCard.doorNum" placeholder="请填写楼号-门牌号" required/>
				  <Field label="关联二维码" v-model="userCard.qrCodeId" v-if="userCard.qrCodeId==null" placeholder="未关联" @click-icon="addQr" disabled>
				  	<Icon name="add" slot="icon"  class="addQr" @click="addQr"/>
				  </Field>
				  <Field label="关联二维码" v-model="userCard.qrCodeId" v-else @click-icon="confirmClear" disabled>
				  	<Icon name="clear" slot="icon" @click="confirmClear" class="clearQr"/>
				  </Field>
				  <Field label="备注" v-model="userCard.remark" placeholder="请填写备注" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
		<NumInput :show="show" :input="keyWords" extraKey=","  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  Icon,
  Dialog,
  Toast
} from "vant";
import Header from "../wechat/Header";
import { mapGetters } from "vuex";
import NumInput from "../../components/NumInput";
export default {
  name: "NewCode",
  components: {
    Header,
    Panel,
    CellGroup,
    Field,
    Button,
    Cell,
    Icon,
    Dialog,
    Toast,
    NumInput
  },
  data() {
    return {
      phoneList: null,
      telList: null,
      userCard: {},
      config: {},
      urlPre: process.env.BASE_URL,
      show: false,
      keyWords: "",
      type: ""
    };
  },
  computed: { ...mapGetters(["userId", "seriUser"]) },
  methods: {
    inputKey(value) {
      //console.info("inputKey:"+this.type);
      if (this.type == "phoneList") {
        this.phoneList = value;
      } else if (this.type == "telList") {
        this.telList = value;
      }
    },
    hideNumInput() {
      this.show = false;
    },
    numKeyboard(type) {
      //console.info("numKeyboard:"+this.type);
      this.type = type;
      if (type == "phoneList") {
        this.keyWords = this.phoneList;
      } else if (type == "telList") {
        this.keyWords = this.telList;
      }
      document.activeElement.blur();
      this.show = true;
    },
    validateInput() {
      if (
        this.userCard.realName &&
        this.userCard.addrInfo &&
        this.userCard.doorNum
      ) {
        this.eidtSeriUser();
      } else {
        Toast.fail("请输入必填信息");
      }
    },
    eidtSeriUser() {
      var seriUser = {};
      seriUser.userId = this.userId;
      seriUser.entityId = this.userCard.id;
      seriUser.userNum = this.userCard.userNum;
      seriUser.realName = this.userCard.realName;
      seriUser.addrInfo = this.userCard.addrInfo;
      seriUser.doorNum = this.userCard.doorNum;
      seriUser.qrCodeId = this.userCard.qrCodeId;
      seriUser.remark = this.userCard.remark;
      if(this.phoneList){
        var contactPhoneList = this.phoneList.split(",");
        seriUser.contactPhone = contactPhoneList[0];
        if (contactPhoneList.length > 1) {
          seriUser.contactPhone2 = contactPhoneList[1];
        }
        if (contactPhoneList.length > 2) {
          seriUser.contactPhone3 = contactPhoneList[2];
        }
      }
      
      if (this.telList) {
        var fixPhoneList = this.telList.split(",");
        seriUser.fixPhone = fixPhoneList[0];
        if (fixPhoneList.length > 1) {
          seriUser.fixPhone2 = fixPhoneList[1];
        }
        if (fixPhoneList.length > 2) {
          seriUser.fixPhone3 = fixPhoneList[2];
        }
      }

      // console.info(seriUser);
      this.$api.user
        .editSeriUser(seriUser)
        .then(res => {
          //if(res.code = "0000"){
          Toast.success("操作成功");
          this.$router.push("/user/totalCodeUsers");
          //}
        })
        .catch(error => {
          console.log(error);
        });
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
          //const qrCodePrex = this.urlPre.split("/wst-boss")[0]
          const qrCodePrex = location.host
          if (url && url.indexOf(qrCodePrex) !== -1) {
            //从url中获取qrCodeId
            if (paramsObj.id) {
              Dialog.confirm({
                title: "提示",
                message: "确认要将编号关联此二维码？"
              })
                .then(() => {
                  this.userCard.qrCodeId = paramsObj.id;
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
    }
  },
  mounted() {
    this.userCard = this.seriUser;
    this.userCard.userNum = this.seriUser.serialNo;
    this.phoneList = this.userCard.contactPhone;
    if (this.userCard.contactPhone2) {
      this.phoneList = this.phoneList + "," + this.userCard.contactPhone2;
    }
    if (this.userCard.contactPhone3) {
      this.phoneList = this.phoneList + "," + this.userCard.contactPhone3;
    }
    this.telList = this.userCard.fixPhone;
    if (this.userCard.fixPhone2) {
      this.telList = this.telList + "," + this.userCard.fixPhone2;
    }
    if (this.userCard.fixPhone3) {
      this.telList = this.telList + "," + this.userCard.fixPhone3;
    }

  }
};
</script>

<style scoped>
.header {
  margin: 15px 15px 0 15px;
  padding: 10px 0;
}
.cell {
  padding: 0;
}
.addQr {
  color: #0a0;
  font-size: 18px;
}
.clearQr {
  color: red;
  font-size: 18px;
}
</style>
