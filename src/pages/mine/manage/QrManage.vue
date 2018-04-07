<template>
	<div>
		<Header backUrl="/manage"/>
		<h2 class="sub_title">二维码管理</h2>
		<CellGroup>
		  <Field
		    v-model="count"
		    type="number"
		    label="输入数量"
		    placeholder="请输入生成二维码数量"
		    @click-icon='genQrPdf'>
		    <Button slot="icon" size="small" type="primary">批量生成</Button>
		  </Field>
		</CellGroup>
		<Footer/>
	</div>
</template>

<script>
 
import {Field, CellGroup, Button, Toast} from 'vant';
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
export default{
	name: "QrManage",
	components: { Header, Footer, Field, CellGroup, Button, Toast },
	data () {
		return {
			count: null,

		}
	},
	methods: {
	    genQrPdf () {
	    	if(this.count){
	    		var req = {};
			    req.userId = this.$store.state.userId;
			    req.pageSize = this.count;
				this.$api.mine.genQrPdf(req)
				.then(res => {
				    const toast = Toast.loading({
						  duration: 0,       // 持续展示 toast
						  forbidClick: true, // 禁用背景点击
						  message: '正在生成...'
					});

					let second = 3;
					const timer = setInterval(() => {
						  second--;
						  if(second){
						  	if(second > 1){
								toast.message = `正在下载...`;
						  	}else{
								toast.message = `下载成功!`;
						  	}
						    
						  } else {
						    clearInterval(timer);
						    Toast.clear();
						  }
					}, 1000);	        
				})
				.catch(error => {
				        console.log(error);
				});
		    }else{
		    	Toast.fail("请输入数量");
		    }
	    	
	    },	    

    }
}
</script>

<style scoped>
	.sub_title {
	    margin: 0;
	    font-weight: 400;
	    font-size: 14px;
	    padding: 20px 15px 10px;
	}

</style>
