<template>
	<div>
		<Header backUrl="/userManage"/>
		<Panel>
			<div slot="header" class="header">
				<Cell title="新建" class="cell">
			    	<Button type="primary" size="small" @click="validateInput">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="编号" v-model="userCard.userNum" placeholder="请输入用户编号" required>
				  	<span slot="icon" class="last-no">
				  	上次编号：<span v-if="lastNo">{{lastNo}}</span><span v-else>暂无</span>
				    </span>
				  </Field>
				  <Field label="手机号" v-model="phoneList" placeholder="可输入多个手机号，用逗号分隔" required  @focus='numKeyboard("phoneList")'/>
				  <Field label="座机" v-model="telList" placeholder="例（028）6573158，多个用逗号分隔"  @focus='numKeyboard("telList")'/>
				  <Field label="姓名" v-model="userCard.realName" placeholder="请填写用户姓名" required/>
				  <Field label="地址" v-model="userCard.addrInfo" placeholder="请填写用户地址" required/>
				  <Field label="楼号-门牌号" v-model="userCard.doorNum" placeholder="请填写楼号-门牌号" required/>
				  <Field label="关联二维码" v-model="userCard.qrCodeId" v-if="userCard.qrCodeId==null" placeholder="未关联" @click-icon="addQr" disabled>
				  	<Icon name="add" slot="icon"  class="addQr" @click="addQr"/>
				  </Field>
				  <Field label="关联二维码" v-model="userCard.qrCodeId" v-else @click-icon="confirmClear" disabled>
				  	<Icon name="clear" slot="icon" @click="confirmClear" class="clearQr"/>
				  </Field>
				  <Field label="备注" v-model="userCard.remark" placeholder="请填写备注" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
		<NumInput :show="show" :input="keyWords" extraKey=","  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import { Panel, CellGroup, Field, Button, Cell, Icon, Dialog, Toast } from 'vant'
import Header from "../wechat/Header"
import {mapGetters} from 'vuex'
import NumInput from "../../components/NumInput"
export default{
	computed: { ...mapGetters([ "userId"]) },
	name: "NewCode",
	components: { Header, Panel, CellGroup, Field, Button, Cell, Icon, Dialog, Toast,NumInput },
	data () {
		return {
			phoneList:null,
			telList:null,
			userCard: {
				userNum:null,
				realName:null,
				addrInfo:null,
				doorNum:null,
				qrCodeId:null,
				remark:null
			},
			lastNo:null,
			config: {},
			urlPre: 'http://test.yeager.vip',
			show:false,
			keyWords:"",
			type:"",
		}
	},
	methods: {
		inputKey(value){
			//console.info("inputKey:"+this.type);
			if(this.type== "phoneList"){
				this.phoneList=value;
			}else if(this.type== "telList"){
				this.telList=value;
			}
		},
		hideNumInput(){
			this.show = false;
		},
		numKeyboard(type){
			//console.info("numKeyboard:"+this.type);
			this.type = type;
			if(type== "phoneList"){
				this.keyWords = this.phoneList;
			}else if(type== "telList"){
				this.keyWords = this.telList;
			}
			document.activeElement.blur();
			this.show = true;
		},
		validateInput(){
				if(this.userCard.userNum && this.phoneList && this.userCard.realName && this.userCard.addrInfo && this.userCard.doorNum){
					this.createSeriUser();
				}else{
					Toast.fail("请输入必填信息");
				}
		},
        createSeriUser () {
        	var seriUser = {};
		    seriUser.userId = this.userId;
		    seriUser.userNum = this.userCard.userNum;
		    seriUser.realName = this.userCard.realName;
		    seriUser.addrInfo = this.userCard.addrInfo;
		    seriUser.doorNum = this.userCard.doorNum;
		    seriUser.qrCodeId = this.userCard.qrCodeId;
		    seriUser.remark = this.userCard.remark;
		    var contactPhoneList = this.phoneList.split(",");
		    seriUser.contactPhone = contactPhoneList[0];
		    if(contactPhoneList.length>1){
				seriUser.contactPhone2 = contactPhoneList[1];
		    }
		    if(contactPhoneList.length>2){
				seriUser.contactPhone3 = contactPhoneList[2];
		    }
		    if(this.telList){
			    var fixPhoneList = this.telList.split(",");
			    seriUser.fixPhone = fixPhoneList[0];
			    if(fixPhoneList.length>1){
					seriUser.fixPhone2 = fixPhoneList[1];
			    }
			    if(fixPhoneList.length>2){
					seriUser.fixPhone3 = fixPhoneList[2];
			    }
		    }

		    // console.info(seriUser);
			this.$api.user.createSeriUser(seriUser)
			.then(res => {
			    //if(res.code = "0000"){
			    	Toast.success("操作成功");
			    	this.$router.push('/user/totalCodeUsers');
			    //}	        
			})
			.catch(error => {
			        console.log(error);
			});
			
        },
        confirmClear(){
			Dialog.confirm({
			  title: '提示',
			  message: '确认要解除编号和二维码的关联吗？'
			}).then(() => {
			  this.userCard.qrCodeId = null;
			}).catch(() => {
			  // on cancel
			});
        },
        addQr(){
	        this.$wechat.scanQRCode({
	          needResult: 1,
	          scanType: [ 'qrCode' ],
	          desc: 'scanQRCode desc',
	          success: (res) => {
	            let url = res.resultStr;
	            let paramsObj = {};
			    const paramsArrays = url.split("?")[1].split("&");	
			    paramsArrays.forEach(item => {
			      paramsObj[item.split("=")[0]] = item.split("=")[1];
			    });
	            if (url && url.indexOf(this.urlPre) !== -1) {
	            	//从url中获取qrCodeId	  
	            	if (paramsObj.id) {
	            		this.userCard.qrCodeId = paramsObj.id;
	            	}
	            } else {
	              Toast.fail("请扫描正确的二维码");
	            }
	          },
	          cancel: (res) => {
	          	console.inf(res);
	            this.$wechat.closeWindow();
	          }
	        })
        	
        },
        getLastSerialNo(){
        	var req = {};
		    req.userId = this.userId;
			this.$api.user.getLastSerialNo(req)
			.then(res => {
			    	this.lastNo = res.lastNo;
			})
			.catch(error => {
			        console.log(error);
			});
        },
        getConfig () {
		      let params = {
		        userName: location.href.split('#')[0]
		      }
		      this.$api.common.jsApiConfig(params).then(res => {

		        if (res && res.code === '0000' && res.msg) {
		          this.config.jsapi_ticket = res.msg.jsapi_ticket
		          this.config.signature = res.msg.signature
		          this.config.nonceStr = res.msg.nonceStr
		          this.config.timestamp = res.msg.timestamp
		          this.config.url = res.msg.url
		          this.config.appId = res.msg.appId
		        }
				
		        if (this.config) {		        	
		          this.$wechat.config({
		            debug: false,
		            appId: this.config.appId,
		            timestamp: this.config.timestamp,
		            nonceStr: this.config.nonceStr,
		            signature: this.config.signature,
		            jsApiList: [
		              'scanQRCode',
		              // 'hideAllNonBaseMenuItem',
		              'closeWindow'
		            ]
		          });
		          this.$wechat.error((res) => {
		            console.log('wx loading error')
		          })
		        }
		      }).catch(error => {
		        console.log(error)
		      })
    	},
    },
    mounted(){
    	this.getLastSerialNo();
    	this.getConfig();
    }
}
</script>

<style scoped>
	.header{
		margin:15px 15px 0 15px;
		padding:10px 0;
	}
	.last-no{
		font-size:14px;
		color:#0a0;
	}
	.cell{
		padding: 0;
	}	
	.addQr{
		color:#0a0;
		font-size:18px;
	}
	.clearQr{
		color:red;
		font-size:18px;
	}
</style>
