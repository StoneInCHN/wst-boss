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
      payMethodColumns: ["现金支付", "微信支付", "支付宝支付"],
      listSrc: []
    };
  },
  computed: {
    ...mapGetters(["checkedOrders","userId"]),
    columns() {
      let lists = [];
      if (this.listSrc.length > 0) {
        this.listSrc.forEach(item => {
          lists.push(item.realName);
        });
      }
      return lists;
    }
  },
  methods: {
    confirm(value, index) {
      console.log({ value, index });
      const ids = this.isBatch ? this.checkedOrders : [this.id];
      const desc = this.isBatch ? `批量指派` : "单个订单指派";
      console.log({ desc, ids });
      const emp = this.listSrc[index];
      console.log({ emp });
      const empId = emp? emp.id || 0 : 0
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          oprStatus: "FINISH",
          cobType: "OFFLINE_TICKET",
          userId: this.userId,
          empId,
          empIncome: "8"
        };
        this.$api.order
          .oprSO(params)
          .then(r => {
            Toast.success("操作成功");
            this.close()
          })
      }
    }
  }
};
</script>
<style>

</style>
