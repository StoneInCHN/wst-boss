<template>
	<div>
		<Header backUrl="/manage"/>
		<Panel>
			<div slot="header">
				<Cell title="店铺管理" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="店铺名称" v-model="store.shopName" placeholder="请输入店铺名称"/>
				  <Field label="店家座机号" v-model="store.telphoneNum" placeholder="请输入区号 请输入电话号码"/>
				  <Field label="店家手机号" v-model="store.mobilePhoneNum" placeholder="请输入11位手机号码" type="tel" error-message="手机号格式错误"/>
				  <Field label="营业时间"  v-model="store.bussBeginTime" placeholder="请选择开始时间" type="datetime" @click="selectTime(0)"/>
				  <Field label=" "  v-model="store.bussEndTime" placeholder="请选择开始时间"  type="datetime" @click="selectTime(1)"/>
				  <Field label="店铺公告" v-model="store.notice" placeholder="100字以内，例如本店保证下单后，2小时之内送到" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet v-model="show" title="选择时间" subname="营业时间">
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
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet, DatetimePicker, Toast},
	data () {
		return {
			currentType:0,
			store:{},
			minHour: 0,
		    maxHour: 23,
		    minDate: null,
		    show:false
		}
	},
	methods: {
        save () {
        	this.store.userId = this.$store.state.userId;
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
		    req.userId = this.$store.state.userId;
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
	.cell{
		padding: 0;
	}	
</style>
