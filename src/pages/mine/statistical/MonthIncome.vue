<template>
	<div>
		<Header backUrl="/statistics"/>
		<Row>
			<Col span="8" class="left">
				<img src="@/assets/images/datePicker.png" width="18" height="18" @click="selectMonth"/>
			</Col>
			<Col span="8" class="h">收支明细</Col>
			<Col span="8" class="right">
				<div v-if="bType">
					<img src="@/assets/images/filter.png" width="18" height="18" @click="search"/>
				</div>
			</Col>
		</Row>	
		<div class="content">
		<Tabs :active="active" @click="clickType">
			<Tab v-for="(type,index) in allType" :title="type.name" :key="index">
				<div class="sub-title">
					<CellGroup>
						<Cell :title="ym" :value="reportValue"></Cell>
					</CellGroup>
				</div>				
				<div class="orderStatist" v-for="(detail, index) in detailList" :key="index">
					<Row class="address">
						<Col span="24">{{detail.addrInfo}}</Col>
					</Row>
					<Row class="detail">
						<Col span="14">
							{{formatDate(detail.createDate)}}
						</Col>
						<Col span="6">
							<div v-if="detail.type == 'INCOME'">{{formatPayType(detail.payType)}}</div>
							<div v-if="detail.type == 'OUTCOME'">{{detail.empName}}</div>
						</Col>
						<Col span="4">
							<div v-if="detail.type == 'INCOME'" class="income">+{{formatPrice(detail.amount)}}</div>
							<div v-if="detail.type == 'OUTCOME'" class="outcome">-{{formatPrice(detail.amount)}}</div>
							
						</Col>				
					</Row>			
				</div>
			</Tab>	
		</Tabs>
	    </div>
		<Actionsheet v-model="show" title="选择年月">
			<DatetimePicker @confirm="confirmMonth" @cancel="cancelSelect"
			  v-model="currentDate"
			  type="year-month"
			  :min-date="minDate"
			  cancel-button-text="重置"
			/>
		</Actionsheet>
		<Actionsheet v-model="showSelectType"  :actions="payways" cancel-text="取消"/>
		<Actionsheet v-model="showSelectEmp"  :actions="emps" cancel-text="取消"/>
		<Footer/>
	</div>
</template>

<script>
import { Row, Col, Tab, Tabs, Cell, CellGroup, Actionsheet, DatetimePicker, Icon, Picker } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import * as utils from "../../../utils"
import {mapGetters} from 'vuex'
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "AddAccount",
	components: { Header, Footer, Row, Col, Tab, Tabs, Cell, CellGroup, Actionsheet, DatetimePicker, Icon, Picker },
	data () {
		return {
			show:false,
			showSelectType:false,
			showSelectEmp:false,
			payways: [
				{
		          name: '所有支付方式',
		          key:null,
		          callback: this.searchPay
		        },
		        {
		          name: '微信',
		          key:'WECHAT',
		          callback: this.searchPay
		        },
		        {
		          name: '支付宝',
		          key:'ALIPAY',
		          callback: this.searchPay
		        },
		        {
		          name: '现金',
		          key:'CASH',
		          callback: this.searchPay
		        },
		        // {
		        //   name: '纸质水票',
		        //   key:'PICKET',
		        //   callback: this.searchPay
		        // },
		    ],
		    emps:[],
		    empAll:{
		    	name:'所有配送员',
		    	key:null,
		    	callback:this.searchEmp
		    },
			minDate: new Date('2018-01'),
		    currentDate: new Date(),
			active: 0,
			allType: [{
				key:'ALL',
				name:'全部'
			},{
				key:'INCOME',
				name:'收入'
			},{
				key:'OUTCOME',
				name:'支出'
			}],
			bType:null,
			ym: null,		
			payType:null,	
			empId:null,
			report: {},
			reportValue:'',
			detailList:[]
		}
	},
	methods: {
		formatPrice(num){
	    	if(num){
				return parseFloat(num).toFixed(2);
	    	}else{
	    		return 0;
	    	}	    	
	    },
		allDetail(){
			    this.finReport();
				var req = {};
		    	req.userId = this.userId;
		    	req.ym = this.ym;
		    	req.pageSize = 500;
		    	req.pageNumber = 1;
		    	req.bType = this.bType;
		    	req.payType = this.payType;
		    	req.empId = this.empId;
		    	this.$api.mine.pageFinDetail(req)
		    	.then(res =>{
		    			this.detailList = res;
		    	}).catch(error => {
		    		console.error(error);
		    	})		    
		},
		finReport(){
		    	var req = {};
		    	req.userId = this.userId;
		    	this.$api.mine.finReport(req)
		    	.then(res =>{
		    			this.report = res;
		    			if(this.bType){
		    				if(this.bType == 'INCOME'){
								this.reportValue = "收入："+ this.report.monIncome;
		    				}else if(this.bType == 'OUTCOME'){
								this.reportValue = "支出："+ this.report.monEmpExp;
		    				}
		    			}else{
		    				this.reportValue = "收入："+ this.report.monIncome+ "，支出："+ this.report.monEmpExp;
		    			}
		    	}).catch(error => {
		    		console.error(error);
		    	})
		},
		formatDate(dateTime) {
			const date = new Date(dateTime)
      		return dateTime?utils.formatDateTime(date, "yyyy-MM-dd hh:mm"):""
    	},
    	formatPayType(payKey){
    		if(payKey == 'ALIPAY'){
    			return "支付宝";
    		} else if(payKey == 'WECHAT'){
				return "微信";
    		} else if(payKey == 'CASH'){
				return "现金";
    		} else if(payKey == 'PICKET'){
				return "纸质水票";
    		} else {
    			return "-";
    		}
    	},
    	selectMonth(){
    		this.show = true;
    	},
    	clickType(index){
    		if(index == 0){
    			this.bType = null;
    			this.payType = null;
    			this.empId = null;
    		}else if(index == 1){
    			this.bType = 'INCOME';
    		}else if(index == 2){
    			this.bType = 'OUTCOME';
    		}
    		this.allDetail();
    	},
    	cancelSelect(){
    		this.currentDate = new Date();
    	},
    	confirmMonth(value){
    		this.ym = value.getFullYear()+"-"+(value.getMonth()+1);
    		this.allDetail();     	
        	this.show = !this.show;
    	},
    	searchPay(item){
    		this.empId = null;
    		this.payType = item.key;
    		this.allDetail();     	
        	this.showSelectType = !this.showSelectType;
    	},
    	searchEmp(item){
    		this.empId = item.key;
    		this.payType = null;
    		this.allDetail();     	
        	this.showSelectEmp = !this.showSelectEmp;
    	},
    	search(){
    		if(this.bType == 'INCOME'){
    			this.listPayType();
				this.showSelectType = true;
		    }else if(this.bType == 'OUTCOME'){
		    	this.listShopEmp(); 
				this.showSelectEmp = true;
		    }
    	},
    	listPayType(){
    		this.payways.forEach(item => {
			    if (this.payType == item.key) {
			    	item.subname = ' √ ';
			    } else {
			    	item.subname = null;
			    }
			}); 
    	},
    	listShopEmp(){
        	var req = {};
		    req.userId = this.userId;
			this.$api.mine.listShopEmp(req)
			.then(res => {
			    	this.emps = [];
			    	this.emps.push(this.empAll);
			    	for(var i=0; i<res.length;i++){
			    		var emp = {};
			    		emp.key = res[i].id;
			    		emp.name = res[i].realName;
			    		emp.callback=this.searchEmp;
			    		this.emps.push(emp);
			    	}     
			    	this.emps.forEach(item => {
			    		if (this.empId == item.key) {
			    			item.subname = ' √ ';
			    		} else {
			    			item.subname = null;
			    		}
			    	});  
			})
			.catch(error => {
			        console.log(error);
			});
        },
    },
    mounted(){
    	var now = new Date();
    	this.ym = now.getFullYear()+"-"+(now.getMonth()+1);
    	this.allDetail();
    	this.listShopEmp();
    }

}
</script>

<style scoped>
	.content{
		padding-bottom: 80px;
	}
	.search{
		margin-left: 40px;
		text-align: right;
	}
	.address{
		margin-bottom:10px;
	}
	.detail{
		padding-bottom:5px;
		border-bottom:1px solid #e8e8e8;
	}
	.income{
		color:green;
		font-size:16px;
		text-align: right;
	}
	.outcome{
		color:red;
		font-size:16px;
		text-align: right;
	}
	.sub-title div{
		background-color: #f8f8f8;
	}
	.h{
		text-align: center;
		margin:15px auto;
	}
	.right{
		text-align: right;
		margin:20px 0 10px 0;
		padding-right: 15px;
		font-size: 12px;
	}
	.left{
		text-align: left;
		margin:20px 0 10px 0;
		padding-left: 15px;
	}
	p{
		font-size:14px;
		margin:10px 0 10px 15px;
	}
	.orderStatist{
		font-size:13px;
		margin:10px 15px 10px 15px;
		background-color: #fff;
	}
	.red{
		color:red;
		background-color: #000
	}


</style>
