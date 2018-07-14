<template>
    <div class="no-data">
       <div class="content">
            <div class="img"></div>
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
            padding-top: 40%;
            text-align: center;
            color: #999;
            font-size: 3.5vw;
            .img{
                height: 15vh;
                background: #fff url('../assets/images/svg/no-data.svg') no-repeat center;
            }
        }
    }
</style>

