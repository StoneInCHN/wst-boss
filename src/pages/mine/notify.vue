<template>
    <div class="notify">
        <NavBar title="消息通知"/>
        <CellGroup>
            <Cell title="消息通知" label="通过微信发送以下消息" />
        </CellGroup>
        <CellGroup>
        <SwitchCell title="新订单通知"  v-model="order" disabled @click="handleClick"/>
        </CellGroup>
        <CellGroup>
         <SwitchCell title="店铺销售数据日报" v-model="daily" disabled/>
        </CellGroup>
    </div>
</template>

<script>
import { NavBar, SwitchCell, CellGroup, Cell, Toast } from "vant";
export default {
  name: "notify",
  components: { NavBar, SwitchCell, CellGroup, Cell },
  data() {
    return {
        order:false,
        daily: false
    };
  },
  methods:{
      handleClick(){
          Toast("功能暂不可使用!")
      }
  }
};
</script>

<style lang="less" scoped>
.notify {
}
</style>

