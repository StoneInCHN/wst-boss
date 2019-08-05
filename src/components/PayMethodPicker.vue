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
import { CobPayTypeText, PayMethodActionTypeEnum } from "@/shared/consts";
export default {
  name: "PayMethodPicker",
  components: {
    Toast,
    WstPicker
  },
  props: {
    ids: {
      type: Array,
      require: true
    },
    employee: {
      type: Object,
      require: true
    },
    close: {
      type: Function
    },
    type: {
      type: String,
      default: PayMethodActionTypeEnum.DIRECT_FINISH
    },
    refresh: {
      type: Function
    }
  },
  data() {
    return {
      title: "请选择支付方式",
      currentPayType: ""
    };
  },
  computed: {
    ...mapGetters(["userId", "cobType", "orderList"]),
    payMethodColumns() {
      const types = this.cobType || [];
      let lists = [];
      if (types && types.length > 0) {
        lists = types.map(item => CobPayTypeText[item]);
      }
      return lists;
    }
  },
  methods: {
    ...mapActions(["setEditable", "reserveOrderList"]),
    confirm(value, index) {
      const cobType = this.cobType[index];
      const { type, userId } = this;
      const entityIds = this.ids.concat() || [];
      const params = {
        entityIds,
        oprStatus: "FINISH",
        cobType,
        userId: Number(userId)
      };
      if (type === PayMethodActionTypeEnum.ASSIGN_2_FINISH) {
        this.assign2Finish(params);
      } else if (type === PayMethodActionTypeEnum.DIRECT_FINISH) {
        this.directFinish(params);
      } else {
        console.log("未知操作...");
      }
    },
    assign2Finish(params) {
      Object.assign(params, this.employee);
      this.oprSO(params);
    },
    directFinish(params) {
      this.oprSO(params);
    },
    oprSO(params) {
      this.$api.order.oprSO(params).then(r => {
        Toast.success("操作成功", 1.5);
        // const { orderList } = this;
        // const { entityIds } = params;
        // const tempList = orderList.filter(orderItem => {
        //   return !entityIds.includes(orderItem.id);
        // });
        // this.reserveOrderList(tempList);
        this.refresh && this.refresh()
        this.close();
      });
    }
  }
};
</script>
<style>
</style>
