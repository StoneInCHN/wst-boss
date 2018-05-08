<template>
	<div>
		<Header backUrl="/manage"/>
		<h2 class="sub_title">二维码管理</h2>
		<CellGroup>
		  <Field
		    v-model="count"
		    label="输入数量"
		    placeholder="请输入生成二维码数量"
		    @click-icon='genQrPdf'>
		    <Button slot="icon" size="small" type="primary">批量生成</Button>
		  </Field>
		  <Field v-if="qrUrl" disabled
		    v-model="qrUrl"
		    label="二维码链接"
		    @click-icon='copyQrPdf'>
		    <Button slot="icon" size="small" type="primary" 
		    	class="copyBtn" :data-clipboard-text = "qrUrl">复制链接</Button>
		  </Field>
		</CellGroup>
		<Footer/>
	</div>
</template>

<script>
 
import {Field, CellGroup, Button, Toast,Dialog} from 'vant';
import Clipboard from 'clipboard';
let clipboard = new Clipboard('.copyBtn');
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "QrManage",
	components: { Header, Footer, Field, CellGroup, Button, Toast,Dialog },
	data () {
		return {
			count: null,
			baseUrl:'http://test.yeager.vip/wst-boss',
			qrUrl:null
		}
	},
	methods: {
		copyQrPdf() {
	      	Dialog.alert({
				title: '复制成功',
				message: '请粘贴到浏览器中打开下载:'+this.qrUrl
			}).then(() => {
						 
			});
	    },

	    genQrPdf () {
	    	if(this.count){
	    		var req = {};
			    req.userId = this.userId;
			    req.pageSize = this.count;
				this.$api.mine.getQrPdfUrl(req)
				.then(res => {
					console.info(res);
					if(res.code = "0000"){
						this.qrUrl = this.baseUrl+res.desc;
			    	}	        
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
