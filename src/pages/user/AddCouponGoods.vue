<template>
	<div>
		<Panel>
			<div slot="header" class="header">
				<Cell title="添加商品" class="cell">
			    	<Button type="primary" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<div>
				<CellGroup>
				  <Field label="优惠商品" v-model="goods.gNameSpec" placeholder="请选择优惠商品"  @click="showAllBrand" @focus="hideKeyboard"/>
				  <Field label="商品原价" v-model="goods.distPrice" disabled/>
				  <Field label="优惠价" v-model="distAmount" placeholder="请填写优惠价格" @focus='numKeyboard' :error-message="tips"/>
				</CellGroup>
			</div>	
		</Panel>
		<ActionSheet  v-model="showdGoodsList" :actions="allDGoods" cancel-text="取消"/>
		<NumInput :show="show" :input="keyWords" extraKey="."  @hide="hideNumInput" @input="inputKey"/>
	</div>
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  ActionSheet,
  Toast
} from "vant";
import { mapGetters, mapActions } from "vuex";
import NumInput from "../../components/NumInput";
export default {
  name: "AddCouponGoods",
  components: {
    Panel,
    CellGroup,
    Field,
    Button,
    Cell,
    ActionSheet,
    NumInput,
    Toast
  },
  data() {
    return {
      goods: {},
      distAmount: null,
      showdGoodsList: false,
      allDGoods: [],
      tips: null,
      show: false,
      keyWords: "",
      type: ""
    };
  },
  computed: { 
	...mapGetters(["userId", "couponGoodsList" ]),
	couponIds(){
		let ids = []
		if(this.couponGoodsList && this.couponGoodsList.length >0){
			this.couponGoodsList.forEach(item => {
				ids.push(item.id)
			});
		}
	  	return ids
  	} 
  },
  methods: {
    ...mapActions(["setCouponGoodsList"]),
    inputKey(value) {
      this.distAmount = value;
    },
    hideNumInput() {
      this.show = false;
    },
    numKeyboard(type) {
      this.keyWords = this.distAmount;
      this.hideKeyboard();
      this.show = true;
    },
    hideKeyboard() {
      document.activeElement.blur();
    },
    save() {
      if (!this.goods.gNameSpec) {
        Toast.fail("请选择优惠商品");
        return;
      }
      if (!this.distAmount) {
        this.tips = "请输入优惠价";
        return;
      }
      if (this.distAmount >= this.goods.distPrice) {
        this.tips = "优惠价必须小于原价";
        return;
      }
	  this.goods.distAmount = this.distAmount;
      let templist = this.couponGoodsList;
	  templist.push(this.goods);
      this.setCouponGoodsList(templist);
      this.$router.go(-1);
    },
    showAllBrand() {
      this.showdGoodsList = true;
    },
    getGsDdList() {
      const req = {
        entityIds: this.couponIds,
        userId: this.userId
      };
      this.$api.user.getGsDdList(req).then(res => {
        this.allDGoods = [];
        for (let i = 0; i < res.length; i++) {
          let dGoods = res[i];
          Object.assign(dGoods, {
            name: dGoods.gNameSpec,
            callback: item => {
              this.goods = item;
              this.showdGoodsList = false;
            }
          });
          this.allDGoods.push(dGoods);
        }
      });
    }
  },
  mounted() {
    this.getGsDdList();
  }
};
</script>

<style scoped>
</style>
