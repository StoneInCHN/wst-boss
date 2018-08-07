/**
 *主要入口文件，引入其他四个js
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//引入actions、mutations、getters
//不推荐使用了
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
import state from "./state.js";

//以modules的方式引入更好
import user from "./modules/user";
import mine from "./modules/mine";
import order from "./modules/order";
import common from "./modules/common";
import callAction from "./modules/callAction";
import commonAssign from "./modules/commonAssign";

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
    mine,
    order,
    common,
    callAction,
    commonAssign
  }
});

export default store;
