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
    item: {
      type: Object,
      require: true
    },
    close: {
      type: Function
    }
  },
  mounted() {},
  data() {
    return {
      title: "请选择支付方式",
      currentPayType: ""
    };
  },
  computed: {
    ...mapGetters([
      "checkedOrders",
      "userId",
      "cobType",
      "processingList",
      "pendingList",
      "empIncome",
      "empId"
    ]),
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
    ...mapActions([
      "setProcessingList",
      "setPendingList",
      "setEmpIncome",
      "setEmpId"
    ]),
    confirm(value, index) {
      const payType = this.cobType[index];
      const ids = this.isBatch ? this.checkedOrders : [this.item.id];
      const { empId } = this.item.oStatus === "PROCESSING" ? this.item : this;
      const empIncome =
        this.item.oStatus === "PROCESSING"
          ? this.item.empAmout
          : this.empIncome;
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          oprStatus: "FINISH",
          cobType: payType,
          userId: this.userId,
          empIncome,
          empId
        };
        this.$api.order.oprSO(params).then(r => {
          Toast.success("操作成功");
          if (this.item.oStatus === "PENDING") {
            const lists = this.pendingList.filter(item => {
              return !ids.includes(item.id);
            });
            this.setPendingList(lists);
          } else if (this.item.oStatus === "PROCESSING") {
            const lists = this.processingList.filter(item => {
              return !ids.includes(item.id);
            });
            this.setProcessingList(lists);
          }
          this.setEmpIncome(0);
          this.setEmpId(-1);
          this.close();
        });
      }
    }
  }
};
</script>
<style>
</style>
