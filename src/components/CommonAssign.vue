<template>
    <div class="common-assign">
        <Popup
          v-model="showCommissionModel"
          class="commission-popup"
        >
          <h4>提成金额</h4>
            <Field
              v-model="commissionPrice"
              label="提成金额"
              required
              placeholder="请输入提成金额"
              @blur="checkCommissionPrice"
              :error-message="errorMsgshow.commissionPrice"
            />
            <Button size="large" :loading="commissionLoading" @click="onCommissionConfirm">确定</Button>
        </Popup>
        <AssignPicker v-if="showAssign" :empIncome="commissionPrice" :close="closeAssgin" />
        <PayMethodPicker v-if="showFinish" :ids="orderIds4Assign" :employee="employee" :close="closeFinish" :type="payMethodType"></PayMethodPicker>
    </div>
</template>

<script>
import { Button, Field, Popup } from "vant";
import AssignPicker from "@/components/AssignPicker";
import PayMethodPicker from "@/components/PayMethodPicker";
import { mapActions, mapGetters } from "vuex";
import validate from "../utils/validate";
import { AssignActionTypeEnum, PayMethodActionTypeEnum } from "@/shared/consts";

export default {
  name: "CommonAssign",
  components: {
    Button,
    Field,
    Popup,
    AssignPicker,
    PayMethodPicker
  },
  data() {
    return {
      showCommissionModel: false,
      commissionPrice: null,
      commissionLoading: false,
      showAssign: false,
      showFinish: false,
      payMethodType: PayMethodActionTypeEnum.DIRECT_FINISH,
      employee: {},
      ids: [],
      errorMsgshow: {
        commissionPrice: ""
      }
    };
  },
  computed: {
    ...mapGetters(["orderIds4Assign"]),
    checkRules() {
      return [
        {
          el: this.commissionPrice,
          alias: "commissionPrice",
          rules: [
            { rule: "isNoNull", msg: "提成金额不能为空" },
            {
              rule: "isPrice",
              msg: "提成金额只能为大于或等于0的数字且最多两位小数"
            }
          ]
        }
      ];
    }
  },
  watch: {
    orderIds4Assign(ids) {
      this.showCommissionModel = true;
    }
  },
  methods: {
    onCommissionConfirm() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        console.log(`提成确认: ${this.commissionPrice} 元`);
        //关闭 金额提成输入框
        this.showCommissionModel = false;
        //打开 员工指派picker
        this.showAssign = true;
      }
    },
    checkCommissionPrice() {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === "commissionPrice";
        })
      );
      this.errorMsgshow.commissionPrice = result ? result : "";
    },
    closeAssgin(params) {
      console.log("关闭 -> closeAssgin");
      this.showAssign = false;
      console.log({ params });
      //待支付订单 直接 点击完成
      if (params && params.actionType === AssignActionTypeEnum.FINISH) {
          const { employee } = params
        if (employee) {
          this.employee = {
              empId : employee.id,
              empIncome: Number(this.commissionPrice)
          };
        }
        this.showFinish = true;
        this.payMethodType = PayMethodActionTypeEnum.ASSIGN_2_FINISH;
      } else {
        // 重置金额
        this.commissionPrice = null;
      }
    },
    closeFinish() {
      console.log("关闭 -> closeAssgin");
      this.showFinish = false;
      this.commissionPrice = null;
    }
  }
};
</script>

<style lang="less">
.common-assign {
  .commission-popup {
    width: 80vw;
    padding: 1rem;
    box-sizing: border-box;
    h4 {
      text-align: center;
      padding: 0.5rem 0;
    }
    .van-button--default {
      margin-top: 0.5rem;
      background-color: #00a0e9;
      color: #fff;
    }
  }
}
</style>
