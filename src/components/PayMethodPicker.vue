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
export default {
  name: "PayMethodPicker",
  components: {
    Toast,
    WstPicker
  },
  props: {
    id: {
      type: Number,
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
      payMethodColumns: ["纸质水票支付", "现金支付", "微信支付", "支付宝支付"],
      listSrc: []
    };
  },
  computed: {
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
    }
  }
};
</script>
<style>

</style>
