<template>
    <ActionSheet v-model="show" :actions="actions" cancel-text="取消"></ActionSheet>
</template>
<script>
import { ActionSheet } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "CallAction",
  components: {
    ActionSheet
  },
  data() {
    return {
      show: false,
      actions: []
    };
  },
  computed: {
    ...mapGetters(["callActions"])
  },
  watch: {
    callActions(val) {
      if (val && val instanceof Array) {
        this.show = true;
        val.forEach(item => {
          item.callback = this.callSomeone;
          this.actions.push(item);
        });
      }
    }
  },
  methods: {
    callSomeone(phoneNum) {
      location.href = `tel:${phoneNum}`;
    }
  }
};
</script>

<style>
</style>
