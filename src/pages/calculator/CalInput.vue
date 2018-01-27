<template>
	<div>
		<van-field v-model="num1" placeholder="num1" />
		<van-field v-model="num2" placeholder="num2" />
		<br/>
		<van-button type="default" @click="calResult('add')" >加</van-button>
		<van-button type="primary" @click="calResult('sub')" >减</van-button>
		<van-button type="danger"  @click="calResult('mul')" >乘</van-button>
		<van-button type="danger"  @click="calResult('divi')" >除</van-button>
		<van-button type="default"  @click="getUserInfo" >getUserInfo</van-button>
		<hr/>
		<cal-output/>
		<hr/>
		<div v-if="isShwoUser">
			<van-address-edit
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

vue.use(Button)
vue.use(Field)
vue.use(AddressEdit)

export default{
	name: 'CalInput',
	components: {
		CalOutput
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