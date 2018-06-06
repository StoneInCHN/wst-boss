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
    },
    type: {
      type: String,
      default: ""
    },
    isBatch: {
      type: Boolean,
      default: false
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
      const params = this.getParams(index);
      console.log({ params });
      this.orderOperation(params)
    },
    getParams(index) {
      const payType = this.cobType[index];
      const ids = this.isBatch ? this.checkedOrders : [this.item.id];
      let params = {
        entityIds: ids,
        oprStatus: "FINISH",
        cobType: payType,
        userId: this.userId
      };
      if (!this.isBatch || this.type !== "processing2Finish") {
        const { empId } =
          !this.isBatch && this.item && this.item.oStatus === "PROCESSING"
            ? this.item
            : this;
        const empIncome =
          !this.isBatch && this.item && this.item.oStatus === "PROCESSING"
            ? this.item.empAmout
            : this.empIncome;
        params = {
          entityIds: ids,
          oprStatus: "FINISH",
          cobType: payType,
          userId: this.userId,
          empIncome,
          empId
        };
      }
      return params;
    },
    orderOperation(params) {
      //非已指派 在完成
      const ids = params.entityIds;
      this.$api.order.oprSO(params).then(r => {
        Toast.success("操作成功", 1.5);
        if (this.type === "assign2Finish") {
          const lists = this.pendingList.filter(item => {
            return !ids.includes(item.id);
          });
          this.setPendingList(lists);
        } else {
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
};
</script>
<style>
</style>
