<template>
	<div>
		<Header backUrl="/statistics"/>
		<Row>
			<Col span="8" class="left">
				<img src="@/assets/images/datePicker.png" width="18" height="18" @click="selectDate"/>
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
						<Cell :value="searchInfoText" ></Cell>
						<Cell :title="reportValue" :value="orderCountText"></Cell>
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
		<ActionSheet v-model="showStartDate" title="选择开始时间">
			<DatetimePicker @confirm="confirmStartDate" @cancel="cancelSelect"
			  type="date"
			  :min-date="minDate"
			/>
		</ActionSheet>
		<ActionSheet v-model="showEndDate" title="选择结束时间">
			<DatetimePicker @confirm="confirmEndDate" @cancel="cancelSelect"
			  type="date"
			  :min-date="minDate"
			/>
		</ActionSheet>
		<ActionSheet v-model="showSelectType"  :actions="payways" cancel-text="取消"/>
		<ActionSheet v-model="showSelectEmp"  :actions="emps" cancel-text="取消"/>
		<Footer/>
	</div>
</template>

<script>
import {
  Row,
  Col,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  ActionSheet,
  DatetimePicker,
  Icon,
  Picker,
  Toast
} from "vant";
import Header from "../../wechat/Header";
import Footer from "../../wechat/Footer";
import * as utils from "../../../utils";
import { CobPayTypeText } from "@/shared/consts";
import { mapGetters } from "vuex";
export default {
  name: "AddAccount",
  components: {
    Header,
    Footer,
    Row,
    Col,
    Tab,
    Tabs,
    Cell,
    CellGroup,
    ActionSheet,
    DatetimePicker,
    Icon,
    Picker
  },
  data() {
    return {
      show: false,
      showStartDate: false,
      showEndDate: false,
      showSelectType: false,
      showSelectEmp: false,
      payways: [
        {
          name: "所有支付方式",
          key: null,
          callback: this.searchPay
        },
        {
          name: "微信",
          key: "WECHAT",
          callback: this.searchPay
        },
        {
          name: "支付宝",
          key: "ALIPAY",
          callback: this.searchPay
        },
        {
          name: "现金",
          key: "CASH",
          callback: this.searchPay
        },
        {
          name: "纸质水票",
          key: "OFFLINE_TICKET",
          callback: this.searchPay
        }
      ],
      emps: [],
      empAll: {
        name: "所有配送员",
        key: null,
        callback: this.searchEmp
      },
      minDate: new Date("2018-01-01"),
      active: 0,
      allType: [
        {
          key: "ALL",
          name: "全部"
        },
        {
          key: "INCOME",
          name: "收入"
        },
        {
          key: "OUTCOME",
          name: "支出"
        }
      ],
      bType: null,
      startDate: null,
      endDate: null,
      ym: null,
      payType: null,
      empId: null,
      report: {},
      detailList: [],
      empList: [],
      orderCount: 0
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    searchInfoText() {
      const { startDate, endDate, payType, empId, emps } = this;
      //console.log({startDate, endDate, payType, empId, emps})
      let text = "";
      if ((!startDate || !endDate) && !payType && !empId) {
        return "全部";
      }
      if (startDate && endDate) {
        const start = utils.formatDateTime(startDate);
        const end = utils.formatDateTime(endDate);
        text = `${start} -- ${end}`;
      }
      if (payType) {
        text += ` ${CobPayTypeText[payType]}`;
      }
      if (empId) {
        let empName = "";
        emps.forEach(emp => {
          if (emp.key === empId) {
            empName = emp.name;
          }
        });
        text += ` ${empName}`;
      }
      return text;
    },
    reportValue() {
      const { bType } = this;
      let value = "";
      if (bType) {
        if (bType == "INCOME") {
          value = `收入：${this.totalIncome}`;
        } else if (bType == "OUTCOME") {
          value = `支出：${this.totalEmpExp}`;
        }
      } else {
        value = `收入：${this.totalIncome}，支出：${this.totalEmpExp}`;
      }
      return value;
    },
    orderCountText() {
      return `订单数: ${this.orderCount}`;
    },
    totalIncome() {
      return this.calcPrice("INCOME");
    },
    totalEmpExp() {
      return this.calcPrice("OUTCOME");
    }
  },
  methods: {
    formatPrice(num) {
      if (num) {
        return parseFloat(num).toFixed(2);
      } else {
        return 0;
      }
    },
    calcPrice(t) {
      let price = 0;
      const { detailList } = this;
      if (detailList && detailList.length > 0) {
        detailList.forEach(item => {
          const { amount, type } = item;
          if (t === type) {
            price = utils.numAdd(price, amount);
          }
        });
      }
      return price;
    },
    allDetail() {
      const {
        userId,
        ym,
        startDate,
        endDate,
        pageSize = 500,
        pageNumber = 1,
        bType,
        payType,
        empId
      } = this;
      const req = {
        userId,
        startTime: startDate,
        endTime: endDate,
        pageSize,
        pageNumber,
        bType,
        payType,
        empId
      };
      this.$api.mine
        .pageFinDetail(req)
        .then(res => {
          if ("0000" === res.code) {
            this.detailList = res.msg || [];
            this.orderCount = res.desc || 0;
          } else {
            Toast(res.desc);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    finReport() {
      this.$api.mine
        .finReport({ userId: this.userId })
        .then(res => {
          this.report = res;
        })
        .catch(error => {
          console.error(error);
        });
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return dateTime ? utils.formatDateTime(date, "yyyy-MM-dd hh:mm") : "";
    },
    formatPayType(payKey) {
      if (payKey == "ALIPAY") {
        return "支付宝";
      } else if (payKey == "WECHAT") {
        return "微信";
      } else if (payKey == "CASH") {
        return "现金";
      } else if (payKey == "OFFLINE_TICKET") {
        return "纸质水票";
      } else {
        return "-";
      }
    },
    selectDate() {
      this.showStartDate = true;
    },
    clickType(index) {
      if (index == 0) {
        this.bType = null;
        this.payType = null;
        this.empId = null;
      } else if (index == 1) {
        this.bType = "INCOME";
        this.empId = null;
        this.payType = null;
      } else if (index == 2) {
        this.bType = "OUTCOME";
        this.payType = null;
        this.empId = null;
      }
      this.allDetail();
    },
    cancelSelect() {
      this.startDate = null;
      this.endDate = null;
    },
    confirmStartDate(value) {
      this.startDate = value;
      this.showStartDate = false;
      this.showEndDate = true;
    },
    confirmEndDate(value) {
      this.endDate = value;
      this.showEndDate = false;
      this.allDetail();
    },
    searchPay(item) {
      this.empId = null;
      this.payType = item.key;
      this.allDetail();
      this.showSelectType = !this.showSelectType;
    },
    searchEmp(item) {
      this.empId = item.key;
      this.payType = null;
      this.allDetail();
      this.showSelectEmp = !this.showSelectEmp;
    },
    search() {
      if (this.bType == "INCOME") {
        this.listPayType();
        this.showSelectType = true;
      } else if (this.bType == "OUTCOME") {
        this.showSelectEmp = true;
      }
    },
    listPayType() {
      this.payways.forEach(item => {
        if (this.payType == item.key) {
          item.subname = " √ ";
        } else {
          item.subname = null;
        }
      });
    },
    listShopEmp() {
      this.$api.mine
        .listShopEmp({ userId: Number(this.userId) })
        .then(res => {
          this.emps = [];
          this.emps.push(this.empAll);
          for (var i = 0; i < res.length; i++) {
            var emp = {};
            emp.key = res[i].id;
            emp.name = res[i].realName;
            emp.callback = this.searchEmp;
            this.emps.push(emp);
          }
          this.emps.forEach(item => {
            if (this.empId == item.key) {
              item.subname = " √ ";
            } else {
              item.subname = null;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    var now = new Date();
    this.ym = now.getFullYear() + "-" + (now.getMonth() + 1);
    this.finReport();
    this.allDetail();
    this.listShopEmp();
  }
};
</script>

<style scoped>
.content {
  padding-bottom: 80px;
}
.search {
  margin-left: 40px;
  text-align: right;
}
.address {
  margin-bottom: 10px;
}
.detail {
  padding-bottom: 5px;
  border-bottom: 1px solid #e8e8e8;
}
.income {
  color: green;
  font-size: 16px;
  text-align: right;
}
.outcome {
  color: red;
  font-size: 16px;
  text-align: right;
}
.sub-title div {
  background-color: #f8f8f8;
}
.h {
  text-align: center;
  margin: 15px auto;
}
.right {
  text-align: right;
  margin: 20px 0 10px 0;
  padding-right: 15px;
  font-size: 12px;
}
.left {
  text-align: left;
  margin: 20px 0 10px 0;
  padding-left: 15px;
}
p {
  font-size: 14px;
  margin: 10px 0 10px 15px;
}
.orderStatist {
  font-size: 13px;
  margin: 10px 15px 10px 15px;
  background-color: #fff;
}
.red {
  color: red;
  background-color: #000;
}
</style>
