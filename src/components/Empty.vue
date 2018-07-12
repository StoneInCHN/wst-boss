<template>
    <div class="no-data">
       <div class="content">
            <Icon name="records"/>
            <p>{{content}}</p>
       </div>
    </div>
</template>

<script>
import { Icon } from 'vant' 
export default {
    name: "Empty",
    components: {
        Icon
    },
    props:{
        content: {
            type: String,
            default: "暂无数据"
        }
    }
}
</script>

<style lang="less">
    .no-data{
        height: 100%;
        background-color: #fff;
        .content{
            padding-top: 50%;
            text-align: center;
            color: #666;
            .van-icon{
                font-size: 35px;
            }
        }
    }
</style>

