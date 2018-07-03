<template>
	<div>
		<Header backUrl="/manage"/>
		<h2 class="sub_title">二维码管理</h2>
		<CellGroup>
		  <Field
		    v-model="count"
		    label="输入数量"
		    placeholder="请输入生成二维码数量"
		    @click-icon='genQrPdf'  @focus='numKeyboard'>
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
		<NumInput :show="show" :input="keyWords" extraKey=""  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
 
import {Field, CellGroup, Button, Toast,Dialog} from 'vant';
import Clipboard from 'clipboard';
let clipboard = new Clipboard('.copyBtn');
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import NumInput from "../../../components/NumInput"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "QrManage",
	components: { Header, Footer, Field, CellGroup, Button, Toast,Dialog,NumInput },
	data () {
		return {
			count: "",
			qrUrl:null,
			show:false,
			keyWords:"",
			type:"",
		}
	},
	methods: {
		inputKey(value){
			//console.info("this.type:"+this.type);
			this.count=value;
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(type){
			this.hideKeyBoard();
			//console.info("numKeyboard:"+type);
			this.keyWords = this.count;			
			this.show = true;
		},
		hideKeyBoard(){
			document.activeElement.blur();
		},
		copyQrPdf() {
	      	Dialog.alert({
				title: '复制成功',
				message: '请粘贴到浏览器中打开下载:'+this.qrUrl
			}).then(() => {
						 
			});
	    },

	    genQrPdf () {
	    	if(this.count){
	    		if(this.count > 100){
	    			Toast.fail("超过最大生成数量100个");
	    			return;
	    		}
	    		var req = {};
			    req.userId = this.userId;
			    req.pageSize = this.count;
				this.$api.mine.getQrPdfUrl(req)
				.then(res => {
					console.info(res);
					if(res.code = "0000"){
						this.qrUrl = process.env.BASE_URL+res.desc;
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
