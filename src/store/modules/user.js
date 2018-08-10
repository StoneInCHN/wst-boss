import * as types from "../types";
import { getItem, getBooleanItem, getIntItem } from "../../utils";

const state = {
  couponGoods: getItem("couponGoods") || {},
  existCouponIds: getItem("existCouponIds") || [],
  couponGoodsList: getItem("couponGoodsList") || [],
  seriUser: getItem("seriUser") || {},
  userOrderGoodsList: getItem("userOrderGoodsList") || []
};

const actions = {
  setCouponGoods({ commit }, couponGoods) {
    commit(types.USER_COUPON_GOODS, couponGoods);
  },
  setExistCouponIds({ commit }, existCouponIds) {
    commit(types.USER_EXIST_COUPON_IDS, existCouponIds);
  },
  setCouponGoodsList({ commit }, couponGoodsList) {
    commit(types.USER_COUPON_GOODS_LIST, couponGoodsList);
  },
  setSeriUser({ commit }, seriUser) {
    commit(types.USER_SERI_USER, seriUser);
  },
  setUserOrderGoodsList({ commit }, userOrderGoodsList) {
    commit(types.USER_ORDER_GOODS_LIST, userOrderGoodsList);
  }
  
};

const getters = {
  couponGoods: state => state.couponGoods,
  existCouponIds : state => state.existCouponIds,
  couponGoodsList: state => state.couponGoodsList,
  seriUser: state => state.seriUser,
  userOrderGoodsList: state => state.userOrderGoodsList
};

const mutations = {
  [types.USER_COUPON_GOODS](state, couponGoods) {
    state.couponGoods = couponGoods;
    sessionStorage.setItem("couponGoods", JSON.stringify(couponGoods));
  },
  [types.USER_EXIST_COUPON_IDS](state, existCouponIds) {
    state.existCouponIds = existCouponIds;
    sessionStorage.setItem("existCouponIds", JSON.stringify(existCouponIds));
  },
  [types.USER_COUPON_GOODS_LIST](state, couponGoodsList) {
    state.couponGoodsList = couponGoodsList;
    sessionStorage.setItem("couponGoodsList", JSON.stringify(couponGoodsList));
  },
  [types.USER_SERI_USER](state, seriUser) {
    state.seriUser = seriUser;
    sessionStorage.setItem("seriUser", JSON.stringify(seriUser));
  },
  [types.USER_ORDER_GOODS_LIST](state, userOrderGoodsList) {
    state.userOrderGoodsList = userOrderGoodsList;
    sessionStorage.setItem("userOrderGoodsList", JSON.stringify(userOrderGoodsList));
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
