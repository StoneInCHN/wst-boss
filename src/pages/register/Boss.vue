<template>
  <form class="register">
      <h4>商家注册</h4>
      <CellGroup>
        <Field 
            label="店铺名称:" 
            v-model="shop.shopName" 
            required
            :error-message="errorMessage.shopName"  
            placeholder="请输入店铺名称"
            @blur="validateCheck('shopName')"
        />
        <Field label="商家账号:" v-model="shop.shopAccout" required placeholder="请输入商家账号" :error-message="errorMessage.shopAccout" @blur="validateCheck('shopAccout')"/>
        <Field label="手机号:" v-model="shop.mobilePhoneNum" required placeholder="请输入手机号" :error-message="errorMessage.mobilePhoneNum" @blur="validateCheck('mobilePhoneNum')"/>
        <Field label="座机号:" v-model="shop.telphoneNum" placeholder="请输入座机号" :error-message="errorMessage.telphoneNum" />
        <Field label="店主姓名:" v-model="shop.ownerName" required placeholder="请输入店主姓名" :error-message="errorMessage.ownerName" @blur="validateCheck('ownerName')"/>
        <Field label="店铺地址:" v-model="shop.shopAddr" required type="textarea" placeholder="请输入店铺地址" :error-message="errorMessage.shopAddr" @blur="validateCheck('shopAddr')"/>
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
            <div class="uploader-view-img" v-show="alipayCodeUrlShow" @click.stop.prevent="previewHandel('alipay')" :style="aliViewStyle"/>
            <Icon class="remove-img" v-show="alipayCodeUrlShow" name="delete" @click="removeAliPayUrl"/>
            <Uploader class="uploder" :after-read="uploaderAliPayImg" v-show="!alipayCodeUrlShow">
                <Icon name="add"/>
            </Uploader>
        </div>
      </CellGroup>
      <Button class="btn-submit" size="large" @click.stop.prevent="submit">免费注册</Button>
  </form>
</template>

<script>
import {
  Uploader,
  Field,
  Cell,
  CellGroup,
  Button,
  Icon,
  ImagePreview,
Toast
} from "vant";
import validate from "../../utils/validate";
import lrz from "lrz";
export default {
  name: "RegisterBoss",
  components: {
    Uploader,
    Field,
    Cell,
    CellGroup,
    Button,
    Icon
  },
  data() {
    return {
      shop: {
        shopName: "",
        shopAccout: "",
        mobilePhoneNum: "",
        telphoneNum: "",
        ownerName: "",
        shopAddr: "",
        wxOid: "",
        wxPayCodeUrl: "",
        alipayCodeUrl: ""
      },
      wxPayCodeViewUrl: "",
      alipayCodeViewUrl: "",
      previewUrl: {
        wx: "",
        alipay: ""
      },
      errorMessage: {
        shopName: "",
        shopAccout: "",
        mobilePhoneNum: "",
        telphoneNum: "",
        ownerName: "",
        shopAddr: "",
        wxOid: "",
        wxPayCodeUrl: "",
        alipayCodeUrl: ""
      }
    };
  },
  computed: {
    wxPayCodeUrlShow() {
      return this.shop.wxPayCodeUrl && this.shop.wxPayCodeUrl !== "";
    },
    alipayCodeUrlShow() {
      return this.shop.alipayCodeUrl && this.shop.alipayCodeUrl !== "";
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
          el: this.shop.shopName,
          alias: "shopName",
          rules: [{ rule: "isNoNull", msg: "店铺名称不能为空" }]
        },
        {
          el: this.shop.shopAccout,
          alias: "shopAccout",
          rules: [
            { rule: "isNoNull", msg: "商家账号不能为空" },
            { rule: "isMobile", msg: "商家账号只能为手机号" }
          ]
        },
        {
          el: this.shop.mobilePhoneNum,
          alias: "mobilePhoneNum",
          rules: [
            { rule: "isNoNull", msg: "商家账号不能为空" },
            { rule: "isMobile", msg: "商家账号只能为手机号" }
          ]
        },
        {
          el: this.shop.ownerName,
          alias: "ownerName",
          rules: [{ rule: "isNoNull", msg: "店主姓名不能为空" }]
        },
        {
          el: this.shop.shopAddr,
          alias: "shopAddr",
          rules: [{ rule: "isNoNull", msg: "店铺地址不能为空" }]
        }
      ];
    }
  },
  methods: {
    removeWxPayUrl() {
      this.shop.wxPayCodeUrl = "";
    },
    removeAliPayUrl() {
      this.shop.alipayCodeUrl = "";
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
          this.shop.wxPayCodeUrl = r.desc;
        } else {
          this.shop.alipayCodeUrl = r.desc;
        }
        this.previewUrl[type] = file.content;
      });
    },
    previewHandel(type) {
      ImagePreview([this.previewUrl[type]]);
    },
    validateCheck(fieldNmae) {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === fieldNmae;
        })
      );
      this.errorMessage[fieldNmae] = result ? result : "";
    },
    submit() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMessage[item.alias] = item.msg;
        });
      } else {
        const {wxPayCodeUrl, alipayCodeUrl} = this.shop 
        if(!wxPayCodeUrl || wxPayCodeUrl ===""){
          Toast("微信收款二维码不能为空", 1.5)
          return 
        }
        if(!alipayCodeUrl || alipayCodeUrl ===""){
          Toast("支付宝收款二维码不能为空", 1.5)
          return 
        }
        const params = this.shop;
        this.$api.common.regSeller(params).then(r => {
        this.$router.replace("/registerSuccess");
      });
      }
    }
  }
};
</script>

<style lang="less">
.register {
  h4 {
    text-align: center;
    padding: 10px;
  }
  .van-field .van-cell__title {
    left: 3px;
  }
  .img-label {
    margin-right: 20px;
    position: relative;
  }
  .img-label::after {
    content: "*";
    position: absolute;
    left: -7px;
    font-size: 14px;
    color: #f44;
  }
  .btn-submit {
    margin: 10px 5vw;
    width: 90vw;
    background-color: #4db1e5;
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
      background-image: url("../../assets/images/water.png");
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
