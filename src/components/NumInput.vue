<template>
	<div>
		<NumberKeyboard
		  :show="show"
		  theme="custom"
		  :extra-key="extraKey"
		  close-button-text="完成"
		  @blur="onBlur"
		  @input="onInput"
		  @delete="onDelete"
		/>
	</div>
</template>

<script>
import { NumberKeyboard } from "vant";
export default {
  name: "NumInput",
  components: { NumberKeyboard },
  props: {
    show: Boolean,
    input: String,
    extraKey: String
  },
  data() {
    return {
      keyWordObj: null
    };
  },
  computed: {
    key: {
      get: function() {
        return this.keyWordObj.join("");
      },
      set: function() {}
    }
  },
  methods: {
    onBlur() {
      this.keyWordObj = null;
      this.$emit("hide");
    },
    onInput(value) {
      this.initData();
      this.keyWordObj.push(value);
      this.$emit("input", this.key);
    },
    onDelete() {
      this.initData();
      this.keyWordObj.pop();
      this.$emit("input", this.key);
    },
    initData() {
      if (!this.keyWordObj) {
        this.keyWordObj = [];
        const length = this.input ? this.input.length : 0;
        for (var i = 0; i < length; i++) {
          this.keyWordObj.push(this.input.charAt(i));
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
