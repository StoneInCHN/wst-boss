<template>
	<div>
		<Header backUrl="/manage"/>
		<p class="cell-title">水票管理 
			<a @click="manage" class="right">
				<span v-if="editable">取消</span>
				<span v-else>管理</span>
			</a>
		</p>
		<Tabs :active="active" type="card" @click="changeTab">
			<Tab title="未添加水票" >
				<div v-for="item in withoutTickets">
					<h2 class="sub_title">{{item.brand}}</h2>
					<TicketCrumb v-for="(ticket, index) in item.ticketList" :ticket="ticket" :editable="editable" :key="index"/>
				</div>				
			</Tab>	
			<Tab title="已添加水票" >
				<div v-for="item in withTickets">
					<h2 class="sub_title">{{item.brand}}</h2>
					<TicketCrumb v-for="(ticket, index) in item.ticketList" :ticket="ticket" :editable="editable" :key="index"/>
				</div>				
			</Tab>	
		</Tabs>
		<p class="fixed">			
			<a v-if="tabIndex == 0" @click="addTicket" class="add"><Icon name="add-o"/> 添加</a>
			<a v-else @click="deleteTicket" class="delete"><Icon name="delete"/> 删除</a>
		</p>
		<Actionsheet v-model="showAction" :actions="actions" cancel-text="取消"/>
	</div>
</template>

<script>
import { Tab, Tabs, Actionsheet, Icon } from 'vant'
import Header from "../../wechat/Header"
import Footer from "../../wechat/Footer"
import TicketCrumb from "./TicketCrumb"
export default{
	name: "Mine",
	components: { Header, Footer, TicketCrumb, Tab, Tabs, Actionsheet, Icon},
	data () {
		return {
			tabIndex:0,
			editable: false,
			active: 0,
			showAction:false,
			actions:[
		        { name: '删除', callback: this.deleteSelected }
		    ],
			withoutTickets:[{
				brand:"蓝剑",
				ticketList:[{
					goodsName:"冰川时代",
					price:17.2,
					salePrice:16,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:""
				},{
					goodsName:"蓝剑矿泉水（15L）",
					price:18.5,
					salePrice:15,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:""
				}]
			},{
				brand:"乐百氏",
				ticketList:[{
					goodsName:"乐开杯",
					salePrice:14,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:""
				},{
					goodsName:"乐百氏矿泉水（15L）",
					salePrice:12,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:""
				}]
			}],
			withTickets:[{
				brand:"农夫山泉",
				ticketList:[{
					goodsName:"农夫山泉矿",
					price:17.2,
					salePrice:16,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:"10张+1张=120元"
				},{
					goodsName:"农夫山泉Mini",
					price:18.5,
					salePrice:15,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:"10张+0张=120元"
				}]
			},{
				brand:"乐百氏",
				ticketList:[{
					goodsName:"乐开杯",
					salePrice:14,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:"10张+1张=120元"
				},{
					goodsName:"乐百氏矿泉水（15L）",
					salePrice:12,
					goodsUrl:"//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg",
					ticketInfo:"10张+2张=120元"
				}]
			}]

		}
	},
	methods: {
		changeTab(index){
			this.tabIndex = index;
		},
	    addTicket () {
	 		this.$router.push('/manage/ticketAdd');
	    },
	    deleteTicket () {
	 		this.showAction = !this.showAction;
	    },
	    deleteSelected(item) {
	      	//删除选中水票
	    },
	    manage(){
	    	this.editable = !this.editable;
	    },

    }
}
</script>

<style scoped>
	.fixed {
	  position: fixed;
	  width:100%;
	  bottom: 0;
	  right: 0;
	  background-color: #fcfcfc;
	  padding: 10px 0;
	  margin: 0;
	  
	}
	.fixed .add{
		font-size:14px;
		float:right;
		margin-right:15px;
		color: #6B8C43;
	}
	.fixed .delete{
		font-size:14px;
		float:right;
		margin-right:15px;
		color: #CC0E18;
	}
	.cell-title{
		margin:10px 0 10px 15px;
		font-size:14px;
	}
	.right{
		float:right;
		margin-right:15px;
		color: #6B8C43;
		font-size:14px;
	}	
	.sub_title {
	    margin: 10px;
	    font-weight: 400;
	    font-size: 14px;
	    color: rgba(69,90,100,.6);
	} 
</style>
