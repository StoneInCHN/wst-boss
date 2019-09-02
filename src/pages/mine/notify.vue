<template>
    <div class="notify">
        <NavBar title="消息通知"/>
        <CellGroup>
            <Cell title="消息通知" label="通过微信发送以下消息" />
        </CellGroup>
        <CellGroup>
        <div class="notify-item">
            <SwitchCell title="新订单通知"  v-model="order" disabled/>
            <a  @click="handleClick"></a>
        </div>
        </CellGroup>
        <CellGroup>
        <div class="notify-item">
            <SwitchCell title="店铺销售数据日报" v-model="daily" disabled/>
            <a  @click="handleClick"></a>
        </div>
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
      order: false,
      daily: false
    };
  },
  methods: {
    handleClick() {
      Toast({
        duration: 1500,
        message: "功能暂未开放!"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.notify {
  .notify-item {
    position: relative;
    a {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 20%;
    }
  }
}
</style>

