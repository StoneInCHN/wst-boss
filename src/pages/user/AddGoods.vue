<template>
	<div>
		<Panel>
			<div slot="header" class="header">
				<Cell title="添加商品" class="cell">
			    	<Button class="green-btn" size="small" @click="save">完成</Button>
			  	</Cell>
			</div>
			<Row class="gRow" v-if="goods.gId">
				<Col span="3">
					<img :src="imgUrl" width="35" height="35"/>
			     </Col>
				<Col span="12">
				  <Field label="" v-model="goods.gName" disabled/>
				  
				 </Col>
			     <Col span="9">
					<Stepper v-model="goods.gCount" :min="1" :max="100"  :default-value="1" class="step"/>
			     </Col>				
			</Row>
			<Row class="gRow">
				<Col span="24">
					<Button class="green-btn" bottom-action @click="showAllGoods">请选择需要购买的商品</Button>
				</Col>
			</Row>
		</Panel>
		<Actionsheet  v-model="showGoods" :actions="allGoods" cancel-text="取消"/>
	</div>
</template>

<script>
import {
  Panel,
  CellGroup,
  Field,
  Button,
  Cell,
  Actionsheet,
  Stepper,
  Row,
  Col
} from "vant";

import { mapGetters, mapActions } from "vuex";
import { getAbsoluteUrl } from "@/utils";
export default {
  name: "StoreManage",
  components: {
    Panel,
    CellGroup,
    Field,
    Button,
    Cell,
    Actionsheet,
    Stepper,
    Row,
    Col
  },
  data() {
    return {
      goods: { gCount: 1 },
      showGoods: false,
      goodsName: false,
      size: false,
      allGoods: []
    };
  },
  computed: {
    ...mapGetters(["userId", "seriUser", "userOrderGoodsList"]),
    imgUrl() {
      return getAbsoluteUrl(this.goods.gPic);
    }
  },
  methods: {
    ...mapActions(["setUserOrderGoodsList"]),
    hideKeyboard() {
      document.activeElement.blur();
    },
    save() {
      let tempList = [];
      let flag = false;
      const id = this.goods.gId;
      if (id) {
        const count = this.goods.gCount;
        this.userOrderGoodsList.forEach(item => {
          if (item.gId === id) {
            Object.assign(item, { gCount: item.gCount + count });
            flag = true;
          }
          tempList.push(item);
        });
        if (!flag) {
          tempList.push(this.goods);
        }
        this.setUserOrderGoodsList(tempList);
      }
      this.$router.go(-1);
    },
    showAllGoods() {
      this.showGoods = true;
    },
    setGoods(item) {
      Object.assign(this.goods, item);
      delete this.goods.callback;
      delete this.goods.name;
      this.showGoods = false;
    },
    getOnGsList() {
      var req = {
        userId: this.userId,
        entityId: this.seriUser.id
      };
      this.$api.user.getOnGsList(req).then(res => {
        console.log({ res });
        this.allGoods = [];
        const { distList, gList } = res;
        if (gList && gList.length > 0) {
          gList.forEach(item => {
            const cGoods = {
              gId: item.id,
              name: item.gNameSpec,
              gName: item.gNameSpec,
              gAmount: item.distPrice,
              gDistPrice: distList[item.id],
              gPic: item.picUrl,
              callback: this.setGoods
            };
            this.allGoods.push(cGoods);
          });
        }
      });
    }
  },
  mounted() {
    this.getOnGsList();
  }
};
</script>

<style scoped>
.step {
  padding-top: 10px;
}
.gRow {
  margin: 15px;
}
.header {
  margin: 15px 15px 0 15px;
  padding: 10px 0;
}
.cell {
  padding: 0;
}
.green-btn {
  background-color: #0a0;
  border-radius: 5px;
  color: #fff;
}
</style>
