import * as types from "../types";

const state = {
  pendingList: [],
  processingList: [],
  otherList: [],
  checkedOrders: []
};

const actions = {
  setPendingList({ commit }, pendingList) {
    commit(types.ORDER_PENDING_LIST, pendingList);
  },
  setProcessingList({ commit }, processingList) {
    commit(types.ORDER_PROCESSING_LIST, processingList);
  },
  setOtherList({ commit }, otherList) {
    commit(types.ORDER_OTHER_LIST, otherList);
  },
  setCheckedOrders({ commit }, checkedOrders) {
    commit(types.ORDER_CHECKED_ORDERS, checkedOrders);
  }
};

const getters = {
  pendingList: state => state.pendingList, //待确认订单
  processingList: state => state.processingList, //配送中的订单
  otherList: state => state.otherList, //其他类型的订单（除去 待确认 和 配送中的 订单）
  checkedOrders: state => state.checkedOrders //选中的订单
};

const mutations = {
  [types.ORDER_PENDING_LIST](state, pendingList) {
    state.pendingList = pendingList;
    sessionStorage.setItem("pendingList", pendingList);
  },
  [types.ORDER_PROCESSING_LIST](state, processingList) {
    state.processingList = processingList;
    sessionStorage.setItem("processingList", processingList);
  },
  [types.ORDER_OTHER_LIST](state, otherList) {
    state.otherList = otherList;
    sessionStorage.setItem("otherList", otherList);
  },
  [types.ORDER_CHECKED_ORDERS](state, checkedOrders) {
    state.checkedOrders = checkedOrders;
    sessionStorage.setItem("checkedOrders", checkedOrders);
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
