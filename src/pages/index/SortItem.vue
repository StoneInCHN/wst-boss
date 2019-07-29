<template>
    <div class="sort-item">
        <span class="serial">{{index + 1}}</span>
        <img src="http://www.yunshuizhan.cn:20002/wst-boss/upload/pic/goods/nongfushanquan.jpg" alt="">
        <div class="content">
            <p>{{`${item.gName} (${item.gSpec})`}} </p>
            <p>
                <span>￥{{item.distPrice}}</span>
                <span class="origin-price">￥{{item.originPrice}}</span>
            </p>
        </div>
        <span>{{item.saleCount}}瓶</span>
    </div>
</template>

<script>
export default {
  name: "SortItem",
  props: {
    item: Object,
    index: Number
  }
};
</script>

<style lang="less" scoped>
.sort-item {
  color: #333;
  display: flex;
  align-items: center;
  padding: 5px 0;
  .serial {
    padding: 10px;
  }
  img {
    width: 48px;
    height: 48px;
  }
  .content {
    flex: 1;
    padding-left: 5px;
    .origin-price {
      font-size: 0.8em;
      text-decoration: line-through;
      color: #999;
      margin-left: 10px;
    }
  }
}
</style>

