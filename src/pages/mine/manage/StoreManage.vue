<template>
	<div>
		<Header backUrl="/manage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="店铺管理" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="店铺名称" v-model="store.shopName" placeholder="请输入店铺名称"/>
				  <Field label="店家座机号" v-model="store.telphoneNum" placeholder="请输入区号 请输入电话号码" type="tel"/>
				  <Field label="店家手机号" v-model="store.mobilePhoneNum" placeholder="请输入11位手机号码" type="tel" :error-message="telError"/>
				  <Field label="营业时间"  v-model="store.bussBeginTime" placeholder="请选择开始时间" type="datetime" :error-message="beginTimeError" @click="selectTime(0)"/>
				  <Field label=" "  v-model="store.bussEndTime" placeholder="请选择结束时间"  type="datetime" :error-message="endTimeError" @click="selectTime(1)"/>
				  <Field label="店铺公告" v-model="store.notice" placeholder="100字以内，例如本店保证下单后，2小时之内送到" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet v-model="show" :title="tips" subname="营业时间">
			<DatetimePicker @confirm="saveTime" @cancel="selectTime"
			  v-model="minDate"
			  type="time"
			  :min-hour="minHour"
			  :max-hour="maxHour"
			/>
		</Actionsheet>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet, DatetimePicker, Toast  } from 'vant'
import Header from "../../wechat/Header"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet, DatetimePicker, Toast},
	data () {
		return {
			currentType:0,
			store:{},
			minHour: 0,
		    maxHour: 23,
		    minDate: null,
		    show:false,
		    tips:"",
		    telError:null,
		    beginTimeError:null,
		    endTimeError:null,
		}
	},
	methods: {
		validate(){
			var valid = true;
			if(!this.store.bussBeginTime){
				valid = false;
        		this.beginTimeError = "请选择营业开始时间!";
        	}
        	if(!this.store.bussEndTime){
        		valid = false;
        		this.endTimeError = "请选择营业结束时间!";	
        	}
			return valid;
		},
        save () {
        	var valid = this.validate();
        	if(!valid){
        		return;
        	}
        	this.store.userId = this.userId;
        	this.$api.mine.updateInfo(this.store)
			.then(res => {
				//if(res.code = "0000"){
					Toast.success("操作成功");
					this.$router.push('/manage');
				//}	        
			})
			.catch(error => {
				console.log(error);
			});
			
        },
        selectTime(type){
        	document.activeElement.blur();
        	if(type == 0){
				this.tips = "请选择营业开始时间";
        	}else{
        		this.tips = "请选择营业结束时间";
        	}
        	this.currentType = type;
        	this.show = !this.show;        	
        },
        saveTime(value){
        	if(this.currentType == 0){
				this.store.bussBeginTime = value;
        	}else{
				this.store.bussEndTime = value;
        	}       	
        	this.show = !this.show;
        },
        getStoreInfo(){
        	var req = {};
		    req.userId = this.userId;
			this.$api.mine.getInfo(req)
			.then(res => {
				//if(res.code = "0000"){
					this.store = res;
				//}	        
			})
			.catch(error => {
				console.log(error);
			}); 
        }
       
    },
    mounted(){
    	this.getStoreInfo();
    }
}
</script>

<style scoped>
	.header{
		margin:15px 15px 0 15px;
	}
	.cell{
		padding: 0;
	}	
</style>
