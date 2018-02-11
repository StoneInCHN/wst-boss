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
				  <Field label="店铺名称" v-model="store.name" placeholder="请输入店铺名称"/>
				  <Field label="店家座机号" v-model="store.tel" placeholder="请输入区号 请输入电话号码"/>
				  <Field label="店家手机号" v-model="store.phone" placeholder="请输入11位手机号码" type="tel" error-message="手机号格式错误"/>
				  <Field label="营业时间"  v-model="store.startTime" placeholder="请选择开始时间" type="datetime" @click="selectTime(0)"/>
				  <Field label=" "  v-model="store.endTime" placeholder="请选择开始时间"  type="datetime" @click="selectTime(1)"/>
				  <Field label="店铺公告"  placeholder="100字以内，例如本店保证下单后，2小时之内送到" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
		<Actionsheet v-model="show" title="选择时间" subname="营业时间">
			<DatetimePicker @confirm="saveTime" @cancel="selectTime"
			  v-model="currentDate"
			  type="time"
			  :min-hour="minHour"
			  :max-hour="maxHour"
			  :min-date="minDate"
			/>
		</Actionsheet>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Actionsheet, DatetimePicker  } from 'vant'
import Header from "../../wechat/Header"
export default{
	name: "StoreManage",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Actionsheet, DatetimePicker},
	data () {
		return {
			currentType:0,
			store:{
				name:null,
				tel:null,
				phone:null,
				startTime:null,
				endTime:null
			},
			minHour: 0,
		    maxHour: 23,
		    minDate: new Date(),
		    maxDate: new Date(2118, 10, 1),
		    currentDate: new Date(2018, 0, 1),
		    show:false
		}
	},
	methods: {
        save () {
			this.$router.push('/manage');
        },
        selectTime(type){
        	this.currentType = type;
        	this.show = !this.show;        	
        },
        saveTime(value){
        	if(this.currentType == 0){
				this.store.startTime = value;
        	}else{
				this.store.endTime = value;
        	}       	
        	this.show = !this.show;
        }
       
    }
}
</script>

<style scoped>
	.cell{
		padding: 0;
	}	
</style>
