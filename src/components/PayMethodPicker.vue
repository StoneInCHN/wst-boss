<template>
  <WstPicker
    :title="title"
    :columns="payMethodColumns"
    :confirm="confirm"
    :close="close"
  />
</template>
<script>
import { Toast } from "vant";
import WstPicker from "./WstPicker";
import { mapActions, mapGetters } from "vuex";
import { CobPayTypeText } from "@/shared/consts";
export default {
  name: "PayMethodPicker",
  components: {
    Toast,
    WstPicker
  },
  props: {
    id: {
      type: Number | String,
      default: 0
    },
    close: {
      type: Function
    }
  },
  mounted() {},
  data() {
    return {
      title: "请选择支付方式",
      currentPayType: "",
      listSrc: []
    };
  },
  computed: {
    ...mapGetters(["checkedOrders", "userId", "cobType", "processingList"]),
    columns() {
      let lists = [];
      if (this.listSrc.length > 0) {
        this.listSrc.forEach(item => {
          lists.push(item.realName);
        });
      }
      return lists;
    },
    payMethodColumns() {
      const types = this.cobType || [];
      console.log({ types });
      let lists = [];
      if (types && types.length > 0) {
        lists = types.map(item => CobPayTypeText[item]);
      }
      return lists;
    }
  },
  methods: {
    ...mapActions(["setProcessingList"]),
    confirm(value, index) {
      const payType = this.cobType[index];
      const ids = this.isBatch ? this.checkedOrders : [this.id];
      const emp = this.listSrc[index];
      const empId = emp ? emp.id || 0 : 0;
      const empIncome = prompt("请输入员工提成金额", 0);
      if (empIncome) {
        const income = parseInt(empIncome);
        if (income || income === 0) {
          if (ids && ids.length > 0) {
            const params = {
              entityIds: ids,
              oprStatus: "FINISH",
              cobType: payType,
              userId: this.userId,
              empId,
              empIncome
            };
            this.$api.order.oprSO(params).then(r => {
              Toast.success("操作成功");
              const lists = this.processingList.filter(item => {
                return !ids.includes(item.id);
              });
              this.setProcessingList(lists);
              this.close();
            });
          }
        } else {
          Toast("请输入数字");
        }
      } else {
        console.log("你点了取消");
      }
    }
  }
};
</script>
<style>

</style>
