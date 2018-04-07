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
  name: "FinishPicker",
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
    id: {
      type: Number,
      default: 0
    },
    close: {
      type: Function
    }
  },
  mounted() {
    this.$api.mine
      .listShopEmp({
        userId: 1
      })
      .then(r => {
        console.log({ r });
        if (r.code === "0000") {
          this.listSrc = r.msg || [];
        }
      })
      .catch(e => {
        console.log({ e });
      });
  },
  data() {
    return {
      title: "请选择送达的人",
      listSrc: []
    };
  },
  computed: {
    ...mapGetters(["checkedOrders"]),
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
    ...mapActions(["setCheckedOrders"]),
    confirm(value, index) {
      console.log({ value, index });
      const ids = this.isBatch ? this.checkedOrders : [this.id];
      const desc = this.isBatch ? `批量完成` : "单个订单完成";
      console.log({ desc, ids });
      const emp = this.listSrc[index];
      console.log({ emp });
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          cobType: "OFFLINE_TICKET",
          oprStatus: "FINISH",
          userId: 1,
          empId: emp.id,
          empIncome: "8"
        };
        this.$api.order
          .oprSO(params)
          .then(r => {
            if (r.code === "0000") {
              Toast.success(r.desc);
              this.close();
            } else {
              Toast.fail(r.desc);
            }
          })
          .catch(e => {
            console.log({ e });
          });
      }
    }
  }
};
</script>
<style>

</style>
