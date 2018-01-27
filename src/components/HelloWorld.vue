<template>
  <div class="hello">
    <van-notice-bar
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
      left-icon="https://img.yzcdn.cn/1.png"
    />
    <van-button type="default" @click="popupHandle">popup</van-button>
    <van-button type="primary">主要按钮</van-button>    
    <van-button type="danger">危险按钮</van-button>
    <hr/>
    <van-badge-group :active-key="activeKey">
      <van-badge title="热销榜" @click="onClick" />
      <van-badge title="花式寿司" @click="onClick" info="8" />
      <van-badge title="火炽寿司" @click="onClick" info="99" />
      <van-badge title="dialog" @click="openDialog" info="199" />
    </van-badge-group>
    <van-popup v-model="show" >内容</van-popup>
    <van-picker
      show-toolbar
      title="指派"
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import vue from 'vue'
import { Button, BadgeGroup, Badge, NoticeBar, Popup, Dialog, Picker, Toast } from 'vant'

vue.use(Button)
vue.use(BadgeGroup)
vue.use(Badge)
vue.use(NoticeBar)
vue.use(Popup)
vue.use(Dialog)
vue.use(Picker)
vue.use(Toast)

export default {
  name: 'HelloWorld',
  data () {
    return {
      activeKey: 0,
      show: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  },
  methods: {
    onClick(key) {
      this.activeKey = key;
      console.log(key)
    },
    popupHandle(){
      this.show = !this.show
    },
    openDialog(){
      this.$dialog({
        message: '弹窗内容'
      })
    },
     onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel(){
      Toast('取消');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
