<template>
  <WstPicker
    :title="title"
    :columns="columns"
    :confirm="confirm"
    :close="close"
  />
</template>
<script>
import { Toast } from "vant";
import WstPicker from "./WstPicker";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AssignPicker",
  components: {
    Toast,
    WstPicker
  },
  props: {
    isBatch: {
      require: true,
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: 0
    },
    title: {
      type: String,
      default: "请指派人选"
    },
    close: {
      type: Function
    },
    type: {
      type: String,
      default: "PENDING"
    }
  },
  mounted() {
    this.$api.mine
      .listShopEmp({
        userId: this.userId
      })
      .then(r => {
        this.listSrc = r;
      });
  },
  data() {
    return {
      listSrc: []
    };
  },
  computed: {
    ...mapGetters([
      "checkedOrders",
      "userId",
      "pendingList",
      "processingList",
      "editable",
      "empIncome"
    ]),
    show() {
      return this.isShow;
    },
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
    ...mapActions([
      "setCheckedOrders",
      "setPendingList",
      "setProcessingList",
      "setEditable",
      "setEmpIncome",
      "setEmpId"
    ]),
    confirm(value, index) {
      const ids = this.isBatch ? this.checkedOrders : [this.item.id];
      const desc = this.isBatch ? `批量指派` : "单个订单指派";
      const emp = this.listSrc[index];
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          oprStatus: "PROCESSING",
          userId: this.userId,
          empId: emp.id,
          empIncome: this.empIncome
        };
        this.$api.order.oprSO(params).then(r => {
          Toast.success("指派成功");
          if (this.type === "PENDING") {
            const lists = this.pendingList.filter(item => {
              return !ids.includes(item.id);
            });
            this.setPendingList(lists);
          } else {
            let lists = [];
            this.processingList.forEach(item => {
              if (ids.includes(item.id)) {
                const { realName, id } = emp;
                item.empName = realName;
                item.empId = id;
                item.empAmout = this.empIncome;
              }
              lists.push(item);
            });
            this.setProcessingList(lists);
            this.setEditable(false);
            this.setCheckedOrders([]);
            if (this.type !== "assign2Finish") {
              this.setEmpIncome(0);
            }
          }
          if (this.type === "assign2Finish") {
            this.close("openFinish");
            this.setEmpId(emp.id);
          } else {
            this.close();
          }
        });
      }
    }
  }
};
</script>
<style>
</style>
