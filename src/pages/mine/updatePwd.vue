<template>
    <div class="update-pwd">
        <CellGroup>
        <Cell>
                <h4 class="title">修改密码</h4>
        </Cell>
            <Cell class="update-pwd-account" title="账号" :value="account" ></Cell>
            <Field label="原密码" required type="password" v-model="oldPwd" :error-message="errorMessage.oldPwd" @blur="validateCheck('oldPwd')" placeholder="请输入原密码" />
            <Field label="新密码" required type="password" v-model="newPwd" :error-message="errorMessage.newPwd" @blur="validateCheck('newPwd')" placeholder="请输入新密码" />
            <Field label="再次输入新密码" required type="password" v-model="confirmPwd" :error-message="errorMessage.confirmPwd" @blur="validateCheck('confirmPwd')" placeholder="请再次新密码" />
            <Button  class="save" size="large" type="primary" @click="updatePwd">保存</Button>
        </CellGroup>
     </div>   
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  DatetimePicker,
  Toast,
  Icon,
  Uploader,
  ImagePreview
} from "vant";
import Header from "../wechat/Header";
import validate from "../../utils/validate";
import { mapGetters } from "vuex";
import { JSEncrypt } from "jsencrypt";

export default {
  name: "updatePwd",
  components: {
    Header,
    CellGroup,
    Cell,
    Field,
    Button,
    Toast
  },
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      errorMessage: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      publickey: "",
      encrypt: new JSEncrypt()
    };
  },
  mounted() {
    this.getCommonKey();
  },
  computed: {
    ...mapGetters(["userId"]),
    account(){
      return this.$route.query.account || ""
    },
    checkRules() {
      return [
        {
          el: this.oldPwd,
          alias: "oldPwd",
          rules: [{ rule: "isNoNull", msg: "原密码不能为空" }]
        },
        {
          el: this.newPwd,
          alias: "newPwd",
          rules: [{ rule: "isNoNull", msg: "新密码不能为空" }]
        },
        {
          el: this.confirmPwd,
          alias: "confirmPwd",
          rules: [{ rule: "isNoNull", msg: "再次输入密码不能为空" }]
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
      //判断新密码和确认密码是否一样
      if (
        !result &&
        "confirmPwd" === fieldNmae &&
        this.newPwd !== this.confirmPwd
      ) {
        this.errorMessage[fieldNmae] = "两次输入的密码不一致";
      }
    },
    updatePwd() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMessage[item.alias] = item.msg;
        });
      } else if (!result && this.newPwd !== this.confirmPwd) {
        this.errorMessage["confirmPwd"] = "两次输入的密码不一致";
      } else {
        if (this.encrypt) {
          this.save();
        } else {
          const loading = Toast.loading("保存中");
          this.getCommonKey(() => {
            this.save();
            loading.clear();
          });
        }
      }
    },
    save() {
      const params = {
        userId: this.userId,
        password: this.encrypt.encrypt(this.newPwd),
        pwd_origin: this.encrypt.encrypt(this.oldPwd),
        pwd_confirm: this.encrypt.encrypt(this.confirmPwd)
      };
      this.$api.mine.updatePwd(params).then(res => {
        if ("0000" === res.code) {
          Toast.success("修改成功");
          this.$router.go(-1)
        } else {
          Toast.fail(res.desc);
        }
      });
    },
    getCommonKey(cb) {
      this.$api.common.getKey().then(r => {
        if ("0000" === r.code) {
          const publicKey = r.msg.key;
          this.encrypt.setPublicKey(publicKey);
        }
        cb && cb();
      });
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/manage/storeManage')
    }
  }
};
</script>
<style lang="less">
.update-pwd {
  &-account {
    .van-cell__title {
      max-width: 90px;
    }
    .van-cell__value {
      text-align: left;
    }
  }
  .title {
    font-size: 20px;
    margin-top: 20px;
  }
  .save {
    margin-top: 10px;
  }
}
</style>
