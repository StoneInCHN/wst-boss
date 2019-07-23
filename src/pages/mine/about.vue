<template>
    <div class="about">
        <NavBar title="关于云水站"/>
        <h4>云水站介绍</h4>
        <p>云水站是提供给水站的管理工具，致力于帮助水站提高效率、扩大规模、节省成本。
        云水站的愿景是成为水站老板的运营好帮手！</p>
        <h4>联系我们</h4>
        <p>电话：18030701005</p>
        <p class="qr">
            <label >微信号: JTOTORO</label>
            <!--
            <img  src="http://thumb12.jfcdns.com/2018-06/bce5b34974538f2e.jpeg" alt="二维码">
            -->
        </p>
    </div>
</template>

<script>
import { NavBar, Icon } from "vant";
export default {
  name: "About",
  components: { NavBar },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.about {
  padding: 20px;
  h4 {
    margin: 10px 0;
  }
  .qr {
    margin-top: 10px;
    display: flex;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>

