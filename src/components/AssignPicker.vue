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
import { CommonActionTypeEnum } from "@/shared/consts";
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
    ...mapGetters(["userId", "orderIds4Assign", "actionType", "orderList"]),
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
    ...mapActions(["reserveOrderList"]),
    confirm(value, index) {
      const emp = this.listSrc[index];
      const ids = this.orderIds4Assign.concat();
      const { actionType } = this;
      if(actionType === CommonActionTypeEnum.FINISH){
        //直接关闭
        const employee = Object.assign({},emp)
        this.close({employee, ids, actionType});
      }else{
        this.assignOrder(emp, ids);
        this.close();
      }
       
    },
    //指派 或 改派订单
    assignOrder(emp, ids) {
      const params = {
        entityIds: ids,
        oprStatus: "PROCESSING",
        userId: Number(this.userId),
        empId: Number(emp.id),
        empIncome: Number(this.empIncome)
      };
      const { actionType } = this;
      console.log({ params, actionType });
      /** 
      this.$api.order.oprSO(params).then(r => {
        console.log({ r });
        if (actionType === "assign") {
          Toast.success("指派成功");
        } else if(actionType === "reassignment") {
          Toast.success("改派成功");
        }
      });
      */
    },
    oprSO() {
      console.log("订单处理");
    }
  }
};
</script>
<style>
</style>
