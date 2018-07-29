<template>
    <div>
        {{msg}}
        <Footer/>
    </div>
</template>

<script>
import Footer from "@/pages/wechat/Footer";
export default {
    name: "Goods",
    components:{
        Footer
    },
    data(){
        return {
            msg: 'this is goods pages'
        }
    },
    mounted(){
        console.log("init goods")
    }
}
</script>

<style>

</style>
