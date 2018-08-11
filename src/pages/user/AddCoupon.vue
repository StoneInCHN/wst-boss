<template>
		<Panel>
			<div slot="header" class="header">
				<Cell title="添加优惠" class="cell">
			    	<Button type="primary" size="small" @click="validate">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="用户编号" v-model="seriUser.serialNo" disabled/>
				  <Field label="姓名" v-model="seriUser.realName" disabled/>
				  <Field label="用户地址" v-model="seriUser.addrInfo" disabled/>
				</CellGroup>				
				<CouponGoods v-for="(coupon,index) in couponGoodsList" :coupon="coupon"  :num="index" :key="index" />
				<Row>
					<Col span="6">
						<div class="addLable">添加优惠</div>
					</Col>
					<Col span="18">
						<div class="addCoupon" @click="addCoupnGoods"><Icon name="add-o"/></div>	
					</Col>
				</Row>					
				<CellGroup>  
				  <Field label="优惠原因" v-model="distCause" placeholder="请填写优惠原因" type="textarea"/>
				</CellGroup>
			</div>	
		</Panel>
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  Row,
  Col,
  Icon,
  Toast
} from "vant";
import CouponGoods from "./CouponGoods";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddCoupon",
  components: {
    Panel,
    CellGroup,
    Field,
    Button,
    Cell,
    Row,
    Col,
    Icon,
    CouponGoods,
    Toast
  },
  data() {
    return {
      couponList: [],
      existIds: [],
      distCause: null
    };
  },
  computed: {
    ...mapGetters([
      "userId",
      "existCouponIds",
      "couponGoods",
      "couponGoodsList",
      "seriUser"
    ])
  },
  methods: {
    ...mapActions([
      "setCouponIds",
      "setCouponGoodsList",
      "setCouponGoods",
      "setSeriUser",
      "setExistCouponIds"
    ]),
    validate() {
      /** 
      if (this.couponGoodsList.length === 0) {
        Toast.fail("至少添加一件优惠商品");
      } else {
        
      }
      */
      this.save();
    },
    initCouponInfo() {
      const params = {
        userId: this.userId,
        entityId: this.seriUser.id
      };
      this.$api.user.distInfo(params).then(res => {
        let goodsList = [];
        let ids = [];
        if (res && res.length > 0) {
          res.forEach(item => {
            const { distAmount, shopGoods } = item;
            if (distAmount) {
              Object.assign(shopGoods, { distAmount });
            }
            goodsList.push(shopGoods);
            ids.push(shopGoods.id);
          });
        }
        this.setCouponGoodsList(goodsList);
        this.setExistCouponIds(ids);
      });
    },
    save() {
      const { couponGoodsList, existCouponIds } = this;
      let newCouponIds = [],
        deleteCouponIds = [],
        addDistMap = {};
      //数据库没有保存优惠信息
      if (existCouponIds && existCouponIds.length === 0) {
        if (couponGoodsList && couponGoodsList.length > 0) {
          couponGoodsList.forEach(item => {
            newCouponIds.push(item.id);
            addDistMap[item.id] = item.distAmount;
          });
        } else {
          //未添加优惠 ，不执行任何操作
        }
      } else {
        //数据库以保存优惠信息
        if (couponGoodsList && couponGoodsList.length > 0) {
          let cIds = []; //存放所有具有优惠信息的商品的Id集合
          //检测新添加的
          couponGoodsList.forEach(item => {
            cIds.push(item.id);
            if (!existCouponIds.includes(item.id)) {
              newCouponIds.push(item.id);
              addDistMap[item.id] = item.distAmount;
            }
          });
          //检测已删除的
          existCouponIds.forEach(id => {
            if (!cIds.includes(id)) {
              deleteCouponIds.push(id);
            }
          });
        } else {
          existCouponIds.forEach(id => {
            deleteCouponIds.push(id);
          });
        }
      }
      const params = {
        userId: this.userId,
        entityId: this.seriUser.id,
        addDistMap,
        entityIds: deleteCouponIds,
        distCause: this.distCause
      };
      this.$api.user.saveGsDist(params).then(res => {
        Toast.success("操作成功");
        this.$router.go(-1);
      });
    },
    addCoupnGoods() {
      this.$router.push("/user/addCouponGoods");
    }
  },
  mounted() {
    if (this.couponGoodsList.length === 0) {
      this.initCouponInfo();
    }
  }
};
</script>

<style scoped>
.header {
  margin: 15px 15px 0 15px;
  padding: 10px 0;
}
.cell {
  padding: 0;
}
.addCoupon {
  font-size: 18px;
  margin-top: 15px;
  color: green;
}
.addLable {
  font-size: 14px;
  margin: 15px 0 auto 15px;
}
</style>
