<template>
    <div class="common-assign">
        <Popup
          v-model="showCommissionModel"
          class="commission-popup"
        >
          <h4>提成金额</h4>
            <!--
            <Cell title="指派人员:" class="commission-person">
              <select v-model="assignId" placeholder="请选择指派人员">
                <option v-for="item in employees" :key="item.id" :value="item.id">
                    {{item.realName}}
                </option>
              </select>
            </Cell>
            -->
            <Field
              v-model="assignName"
              disabled
              label="指派人员:"
              placeholder="请选择指派人员"
              @click="selectAssignId"
            />
            <Field
              v-model="commissionPrice"
              label="提成金额:"
              required
              placeholder="请输入提成金额"
              @blur="checkCommissionPrice"
              :error-message="errorMsgshow.commissionPrice"
            />
            <Button size="large" :loading="commissionLoading" @click="onCommissionConfirm">确定</Button>
        </Popup>
        <AssignPicker v-if="showAssign" :empIncome="commissionPrice" :close="closeAssgin" />
        <ActionSheet v-model="showEmployee" :actions="employeeActions" @select="selectEmployee"></ActionSheet>
        <PayMethodPicker v-if="showFinish" :ids="orderIds4Assign" :employee="employee" :close="closeFinish" :type="payMethodType" :refresh="refresh" ></PayMethodPicker>
    </div>
</template>

<script>
import { Button, Field, Popup, Cell, Toast, ActionSheet } from "vant";
import AssignPicker from "@/components/AssignPicker";
import PayMethodPicker from "@/components/PayMethodPicker";
import { mapActions, mapGetters } from "vuex";
import validate from "../utils/validate";
import { CommonActionTypeEnum, PayMethodActionTypeEnum } from "@/shared/consts";

export default {
  name: "CommonAssign",
  components: {
    Button,
    Field,
    Popup,
    Cell,
    AssignPicker,
    PayMethodPicker,
    ActionSheet
  },
  props: {
    refresh: Function
  },
  data() {
    return {
      showCommissionModel: false,
      commissionPrice: null,
      commissionLoading: false,
      showAssign: false,
      showFinish: false,
      showEmployee: false,
      payMethodType: PayMethodActionTypeEnum.DIRECT_FINISH,
      employee: {},
      ids: [],
      errorMsgshow: {
        commissionPrice: ""
      },
      employees: [],
      assignId: null,
      assignName: ""
    };
  },
  mounted() {
    this.getEmployee();
  },
  computed: {
    ...mapGetters([
      "userId",
      "orderIds4Assign",
      "actionType",
      "editable",
      "orderList"
    ]),
    employeeActions() {
      let actions = [];
      if (this.employees && this.employees.length) {
        actions = this.employees.map(item => {
          return {
            name: item.realName,
            id: item.id
          };
        });
      }
      return actions;
    },
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
      const { actionType } = this;
      if (this.actionType !== CommonActionTypeEnum.SERVICE) {
        this.showCommissionModel = true;
      } else {
        this.showFinish = true;
      }
    }
  },
  methods: {
    ...mapActions(["setEditable", "reserveOrderList"]),
    onCommissionConfirm() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        //打开 员工指派picker
        //this.showAssign = true;
        const { commissionPrice = 0, assignId } = this;
        //将assignId存到本地, 下次默认选中
        if (assignId || this.actionType === CommonActionTypeEnum.FINISH) {
          if (assignId) {
            localStorage.setItem("assignId", assignId);
            const employee = this.employees.filter(
              i => this.assignId === i.id
            )[0];
            const { realName } = employee;
            const emp = {
              id: assignId,
              empIncome: commissionPrice,
              realName
            };
            this.employee = Object.assign({}, employee, emp);
            //关闭 金额提成输入框
            this.showCommissionModel = false;
            const ids = this.orderIds4Assign.concat();
            if (this.actionType === CommonActionTypeEnum.FINISH) {
              //直接关闭
              const employee = Object.assign({}, emp);
              this.closeAssgin({ employee, ids, actionType });
            } else {
              this.assignOrder(emp, ids, this.closeAssgin());
            }
          } else {
            const ids = this.orderIds4Assign.concat();
            const emp = {
              id: 0,
              empIncome: commissionPrice,
              realName: ""
            };
            //关闭 金额提成输入框
            this.showCommissionModel = false;
            this.closeAssgin({ emp, ids, actionType: this.actionType });
          }
        } else {
          Toast("请选择指派人员!");
        }
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
      this.showAssign = false;
      //待支付订单 直接 点击完成
      if (params && params.actionType === CommonActionTypeEnum.FINISH) {
        const { employee } = params;
        if (employee) {
          this.employee = {
            empId: employee.id,
            empIncome: Number(this.commissionPrice)
          };
        }
        this.showFinish = true;
        this.payMethodType = PayMethodActionTypeEnum.ASSIGN_2_FINISH;
      } else {
        // 重置金额
        this.commissionPrice = null;
        this.setEditable(false);
      }
    },
    closeFinish() {
      this.showFinish = false;
      this.commissionPrice = null;
      this.setEditable(false);
    },
    //指派 或 改派订单
    assignOrder(emp, ids, callback) {
      const { userId } = this;
      const params = {
        entityIds: ids,
        oprStatus: "PROCESSING",
        userId: Number(userId),
        empId: Number(emp.id),
        empIncome: Number(emp.empIncome)
      };
      const { actionType } = this;
      this.$api.order.oprSO(params).then(r => {
        if (actionType === CommonActionTypeEnum.ASSIGN) {
          Toast.success("指派成功");
          this.refresh && this.refresh();
          if (callback) {
            callback();
          }
        } else if (actionType === CommonActionTypeEnum.REASSIGNMENT) {
          Toast.success("改派成功");
          this.refresh && this.refresh();
          if (callback) {
            callback();
          }
        }
      });
    },
    getEmployee() {
      this.$api.mine
        .listShopEmp({
          userId: this.userId
        })
        .then(r => {
          this.employees = r;
        });
    },
    selectAssignId() {
      this.showEmployee = !this.showEmployee;
    },
    selectEmployee(item) {
      this.showEmployee = false;
      this.assignId = item.id;
      this.assignName = item.name;
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
    .commission-person {
      .van-cell__title {
        max-width: 90px;
      }
      .van-cell__value {
        text-align: left;
        select {
          background: #fff;
        }
      }
    }
    .van-button--default {
      margin-top: 0.5rem;
      background-color: #00a0e9;
      color: #fff;
    }
    .van-field__control:disabled {
      color: #333;
    }
  }
}
</style>
