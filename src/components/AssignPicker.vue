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
      require: true
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
    },
    empIncome: {
      type: [Number, String],
      default: 0
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
    ...mapGetters(["userId", "orderIds4Assign", "assignType"]),
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
    confirm(value, index) {
      const emp = this.listSrc[index];
      const ids = this.orderIds4Assign.concat();
      this.assignOrder(emp, ids);
      this.close();
    },
    assignOrder(emp, ids) {
      const params = {
        entityIds: ids,
        oprStatus: "PROCESSING",
        userId: this.userId,
        empId: emp.id,
        empIncome: this.empIncome
      };
      const { assignType } = this;
      console.log({ params, assignType });
      this.$api.order.oprSO(params).then(r => {
        console.log({ r });
        if (assignType === "assign") {
          Toast.success("指派成功");
        } else if(assignType === "reassignment") {
          Toast.success("改派成功");
        }
      });
    },
    confirm2(value, index) {
      const { isBatch, type } = this;
      const ids = isBatch ? this.checkedOrders : [this.item.id];
      const desc = isBatch ? `批量指派` : "单个订单指派";
      const emp = this.listSrc[index];
      console.log({ isBatch, type, ids, desc, emp });
      if (!ids || ids.length === 0) {
        Toast("请先选择订单");
      } else if (type === "PENDING" || type === "PROCESSING") {
        //不是直接送达
        //指派
        const params = {
          entityIds: ids,
          oprStatus: "PROCESSING",
          userId: this.userId,
          empId: emp.id,
          empIncome: this.empIncome
        };
        this.$api.order
          .oprSO(params)
          .then(r => {
            if (type === "PENDING") {
              Toast.success("指派成功");
              const lists = this.pendingList.filter(item => {
                return !ids.includes(item.id);
              });
              this.setPendingList(lists);
            } else {
              Toast.success("改派成功");
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
            }
            this.setEditable(false);
            this.setCheckedOrders([]);
            this.setEmpIncome(0);
            this.close();
          })
          .catch(e => {
            Toast.success("改派失败");
          });
      } else if (type === "assign2Finish") {
        //直接送达
        //直接批量送达 在paymethodPicker.vue 中处理
        this.setEmpId(emp.id);
        this.close("openFinish4Assign");
      }
    },
    oprSO() {
      console.log("订单处理");
    }
  }
};
</script>
<style>
</style>
