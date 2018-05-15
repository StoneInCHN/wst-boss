<template>
  <Popup v-model="show" position="bottom" :closeOnClickOverlay="false">
         <Picker 
          show-toolbar  
          :title="title"
          :confirm-button-text="confirmText"
          :columns="columns"
          @cancel="cancel"
          @confirm="pConfirm"/>
    </Popup>
</template>
<script>
import { Popup, Picker } from "vant";
export default {
  name: "WstPicker",
  components: {
    Popup,
    Picker
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    confirm: {
      require: true,
      type: Function
    },
    close: {
      type: Function
    },
    columns: {
      require: true,
      type: Array
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  data(){
    return {
      show: true
    }
  },
  watch:{
    isShow(newVal){
      this.show = newVal
    }
  },
  methods: {
    click() {
      this.show = false;
      this.close()
    },
    pConfirm(value, index){
      console.log({value, index})
      this.confirm(value, index)
    },
    cancel() {
      console.log("取消");
      this.close();
    }
  }
};
</script>
<style>

</style>

