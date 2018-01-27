<template>
	<div>
		<field v-model="num1" placeholder="num1" />
		<field v-model="num2" placeholder="num2" />
		<br/>
		<Button type="default" @click="calResult('add')" >加</Button>
		<Button type="primary" @click="calResult('sub')" >减</Button>
		<Button type="danger"  @click="calResult('mul')" >乘</Button>
		<Button type="danger"  @click="calResult('divi')" >除</Button>
		<Button type="default"  @click="getUserInfo" >getUserInfo</Button>
		<hr/>
		<cal-output/>
		<hr/>
		<div v-if="isShwoUser">
			<address-edit
			  :area-list="areaList"
			  show-postal
			  show-set-default
			  show-search-result
			  :address-info = "addressInfo"
			  :search-result="searchResult"
			  @save="onSave"
			  @change-detail="onChangeDetail"
			/>
		</div>
	</div>
</template>
<script>
import vue from 'vue'
import { Button, Field, AddressEdit } from 'vant'
import CalOutput from "./CalOutput"
import * as utils from "../../utils"

export default{
	name: 'CalInput',
	components: {
		CalOutput,
		Button,
		Field,
		AddressEdit
	},
	data () {
		return{
			num1: 0,
			num2: 0,
			userInfo: {},
			areaList: {},
      		searchResult: []
		}
	},
	computed: {
		isShwoUser(){
			return !!this.userInfo.name
		},
		addressInfo(){
			return this.userInfo
		}
	},
	methods:{
		getUserInfo(){
			const params = {
				userId: 1
			}
			this.$api.getUserInfo(params)
				.then(data => {
					console.log(data)
					this.userInfo = data

				})
		},
		calResult(type){
			let result = 0
			switch(type){
				case 'add':
					result = utils.numAdd(this.num1 , this.num2)
					break;
				case 'sub':
					result =  utils.numSub(this.num1 , this.num2)
					break;
				case 'mul':
					result =  utils.numMul(this.num1 , this.num2)
					break;
				case 'divi':
					result =  utils.numDiv(this.num1 , this.num2)
					break;
				default:
					result= 0
			}
			this.$store.dispatch('setResultNum',{resultNum: result})
		},
		onSave() {
	      this.$toast('save');
	    },
	    onDelete() {
	      this.$toast('delete');
	    },
	    onChangeDetail(val) {
	      if (val) {
	        this.searchResult = [{
	          name: '黄龙万科中心',
	          address: '杭州市西湖区'
	        }];
	      } else {
	        this.searchResult = [];
	      }
	    }
	}
}
</script>