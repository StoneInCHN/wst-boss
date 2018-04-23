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
    id: {
      type: Number | String,
      default: 0
    },
    title: {
      type: String,
      default: "请指派人选"
    },
    close: {
      type: Function
    }
  },
  mounted() {
    this.$api.mine
      .listShopEmp({
        userId: this.userId
      })
      .then(r => {
        this.listSrc = r;
      })
    const _this = this
    console.log({_this})
  },
  data() {
    return {
      listSrc: []
    };
  },
  computed: {
    ...mapGetters(["checkedOrders","userId"]),
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
    ...mapActions(["setCheckedOrders"]),
    confirm(value, index) {
      console.log({ value, index });
      const ids = this.isBatch ? this.checkedOrders : [this.id];
      const desc = this.isBatch ? `批量指派` : "单个订单指派";
      console.log({ desc, ids });
      const emp = this.listSrc[index];
      console.log({ emp });
      if (ids && ids.length > 0) {
        const params = {
          entityIds: ids,
          oprStatus: "PROCESSING",
          userId: this.userId,
          empId: emp.id,
          empIncome: "8"
        };
        this.$api.order
          .oprSO(params)
          .then(r => {
            Toast.success("指派成功");
              this.close()
          })
      }
    }
  }
};
</script>
<style>

</style>
