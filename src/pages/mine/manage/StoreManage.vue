<template>
	<div class="store-manage">
		<Header backUrl="/manage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="店铺管理" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="店铺名称" v-model="store.shopName" required placeholder="请输入店铺名称" :error-message="errorMessage.shopName" @blur="validateCheck('shopName')"/>
				  <Field label="店家座机号" v-model="store.telphoneNum" placeholder="请输入区号 请输入电话号码" type="tel"/>
				  <Field label="店家手机号" v-model="store.mobilePhoneNum" required  placeholder="请输入11位手机号码" type="tel" :error-message="errorMessage.mobilePhoneNum" @blur="validateCheck('mobilePhoneNum')"/>
				  <Field label="营业时间"  v-model="store.bussBeginTime" required placeholder="请选择开始时间" type="datetime" :error-message="errorMessage.beginTime" @click="selectTime(0)"/>
				  <Field label=" "  v-model="store.bussEndTime" required placeholder="请选择结束时间"  type="datetime" :error-message="errorMessage.endTime" @click="selectTime(1)"/>
				  <Field label="店铺公告" v-model="store.notice" placeholder="100字以内，例如本店保证下单后，2小时之内送到" type="textarea"/>
				</CellGroup>
				<div class="qr-uploader">
					<label class="required">微信收款码:</label>
					<div class="uploader-view-img" v-show="wxPayCodeUrlShow" @click.stop.prevent="previewHandel('wx')" :style="wxViewStyle" />
					<Icon class="remove-img" v-show="wxPayCodeUrlShow" name="delete" @click="removeWxPayUrl"/>
					<Uploader class="uploder" :after-read="uploaderWxPayImg" v-show="!wxPayCodeUrlShow">
						<Icon name="add"/>
					</Uploader>
				</div>
				<div class="qr-uploader">
					<label class="required">支付宝收款码:</label>
					<div class="uploader-view-img" v-show="aliPayCodeUrlShow" @click.stop.prevent="previewHandel('alipay')" :style="aliViewStyle"/>
					<Icon class="remove-img" v-show="aliPayCodeUrlShow" name="delete" @click="removeAliPayUrl"/>
					<Uploader class="uploder" :after-read="uploaderAliPayImg" v-show="!aliPayCodeUrlShow">
						<Icon name="add"/>
					</Uploader>
				</div>
			</div>	
		</Panel>
		<Actionsheet v-model="show" :title="tips" subname="营业时间">
			<DatetimePicker @confirm="saveTime" @cancel="selectTime"
			  v-model="minDate"
			  type="time"
			  :min-hour="minHour"
			  :max-hour="maxHour"
			/>
		</Actionsheet>
	</div>
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  Actionsheet,
  DatetimePicker,
  Toast,
  Icon,
  Uploader,
  ImagePreview
} from "vant";
import Header from "../../wechat/Header";
import validate from "../../../utils/validate";
import { getAbsoluteUrl } from "../../../utils";
import lrz from "lrz";
import { mapGetters } from "vuex";

export default {
  name: "StoreManage",
  components: {
    Header,
    Panel,
    CellGroup,
    Field,
    Button,
    Cell,
    Actionsheet,
    DatetimePicker,
    Toast,
    Icon,
    Uploader
  },
  data() {
    return {
      currentType: 0,
      store: {
        shopName: "",
        telphoneNum: "",
        mobilePhoneNum: "",
        bussBeginTime: "",
        bussEndTime: "",
        notice: "",
        wxPayCodeUrl: "",
        aliPayCodeUrl: ""
      },
      minHour: 0,
      maxHour: 23,
      minDate: null,
      show: false,
      tips: "",
      previewUrl: {
        wx: "",
        alipay: ""
      },
      errorMessage: {
        shopName: "",
        mobilePhoneNum: "",
        beginTime: "",
        endTime: "",
        wxPayCodeUrl: "",
        aliPayCodeUrl: ""
      }
    };
  },
  mounted() {
    this.getStoreInfo();
  },
  computed: {
    ...mapGetters(["userId"]),
    wxPayCodeUrlShow() {
      return !!this.store.wxPayCodeUrl;
    },
    aliPayCodeUrlShow() {
      return !!this.store.aliPayCodeUrl;
    },
    wxViewStyle() {
      return {
        backgroundImage: `url(${this.previewUrl.wx})`
      };
    },
    aliViewStyle() {
      return {
        backgroundImage: `url(${this.previewUrl.alipay})`
      };
    },
    checkRules() {
      return [
        {
          el: this.store.shopName,
          alias: "shopName",
          rules: [{ rule: "isNoNull", msg: "店铺名称不能为空" }]
        },
        {
          el: this.store.mobilePhoneNum,
          alias: "mobilePhoneNum",
          rules: [
            { rule: "isNoNull", msg: "店家手机号不能为空" },
            { rule: "isMobile", msg: "店家手机号只能为手机号" }
          ]
        },
        {
          el: this.store.bussBeginTime,
          alias: "bussBeginTime",
          rules: [{ rule: "isNoNull", msg: "营业开始时间不能为空" }]
        },
        {
          el: this.store.bussEndTime,
          alias: "bussEndTime",
          rules: [{ rule: "isNoNull", msg: "营业结束时间不能为空" }]
        }
      ];
    }
  },
  methods: {
    validateCheck(fieldNmae) {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === fieldNmae;
        })
      );
      this.errorMessage[fieldNmae] = result ? result : "";
    },
    save() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMessage[item.alias] = item.msg;
        });
      } else {
        const { store, userId } = this;
        const { wxPayCodeUrl, aliPayCodeUrl } = store;
        if (!wxPayCodeUrl || wxPayCodeUrl === "") {
          Toast("微信收款码不能为空", 1.5);
          return;
        }
        if (!aliPayCodeUrl || aliPayCodeUrl === "") {
          Toast("支付宝收款码不能为空", 1.5);
          return;
        }
        Object.assign(store, { userId: Number(userId), alipayCodeUrl: aliPayCodeUrl });
        this.$api.mine.updateInfo(store).then(res => {
          Toast.success("操作成功");
          this.$router.push("/manage");
        });
      }
    },
    selectTime(type) {
      document.activeElement.blur();
      if (type == 0) {
        this.tips = "请选择营业开始时间";
      } else {
        this.tips = "请选择营业结束时间";
      }
      this.currentType = type;
      this.show = !this.show;
    },
    saveTime(value) {
      if (this.currentType == 0) {
        this.store.bussBeginTime = value;
      } else {
        this.store.bussEndTime = value;
      }
      this.show = !this.show;
    },
    getStoreInfo() {
      var req = {};
      req.userId = this.userId;
      this.$api.mine.getInfo(req).then(res => {
        Object.assign(this.store, res);
        const { wxPayCodeUrl, aliPayCodeUrl } = this.store;
        if (!!wxPayCodeUrl) {
          const wx = getAbsoluteUrl(wxPayCodeUrl);
          Object.assign(this.previewUrl, { wx });
        }
        if (!!aliPayCodeUrl) {
          const alipay = getAbsoluteUrl(aliPayCodeUrl);
          Object.assign(this.previewUrl, { alipay });
        }
      });
    },
    removeWxPayUrl() {
      this.store.wxPayCodeUrl = "";
    },
    removeAliPayUrl() {
      this.store.aliPayCodeUrl = "";
    },
    uploaderWxPayImg(file) {
      this.fileOperation(file, "wx");
    },
    uploaderAliPayImg(file) {
      this.fileOperation(file, "alipay");
    },
    fileOperation(file, type = wx) {
      if (!file) {
        return false;
      }
      //当上传图片大于200kb时，需要进行压缩处理后在上传
      const size = file.file.size;
      if (size && size > 200 * 1024) {
        let imgInfo = lrz(file.content)
          .then(res => {
            const fileObj = {
              content: res.base64,
              orientation: 1,
              file: new File([res.file], file.file.name),
              type: file.file.type
            };
            this.uploadFile(fileObj, type);
          })
          .catch(error => {
            console.log("lrz catch res:", error);
          })
          .always(() => {});
      } else {
        this.uploadFile(file, type);
      }
    },
    uploadFile(file, type) {
      let param = new FormData();
      param.append("file", file.file, file.file.name);
      param.append("imageType", "PAY_QRCODE");
      this.$api.common.uploadImg(param).then(r => {
        if (type === "wx") {
          this.store.wxPayCodeUrl = r.desc;
        } else {
          this.store.aliPayCodeUrl = r.desc;
        }
        this.previewUrl[type] = file.content;
      });
    },
    previewHandel(type) {
      ImagePreview([this.previewUrl[type]]);
    }
  }
};
</script>

<style lang="less" >
.store-manage {
  .header {
    margin: 15px 15px 0 15px;
  }
  .cell {
    padding: 0;
  }
  .qr-uploader {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    position: relative;
    label {
      margin-left: 3px;
    }
    .required::before {
      content: "*";
      position: absolute;
      left: 9px;
      font-size: 14px;
      color: #f44;
    }
    .remove-img {
      margin-left: 20px;
    }
    .uploder {
      margin-left: 30px;
    }
    .uploader-view-img {
      margin-left: 10px;
      display: inline-block;
      width: 64px;
      height: 64px;
      background-color: #f3f3f3;
      background-image: url("../../../assets/images/water.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      .remove-img {
        left: 80px;
        top: 30px;
      }
    }
  }
}
</style>
