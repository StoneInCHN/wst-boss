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
  //待确认订单
  pendingList: state => {
    const { pendingList } = state;
    let lists = [];
    console.log({pendingList})
    if (pendingList && pendingList.length > 0) {
      lists = pendingList.filter(item => {
        return item.oStatus === "PENDING";
      });
    }
    return lists;
  },
  //配送中的订单
  processingList: state => {
    const { processingList } = state;
    console.log({processingList})
    let lists = [];
    if (processingList && processingList.length > 0) {
      lists = processingList.filter(item => {
        return item.oStatus === "PROCESSING";
      });
    }
    return lists;
  },
  //其他类型的订单（除去 待确认 和 配送中的 订单）
  otherList: state => {
    const { otherList } = state;
    let lists = [];
    console.log({otherList})
    if (otherList && otherList.length > 0) {
      lists = otherList.filter(item => {
        return item.oStatus !== "PENDING" && item.oStatus !== "PROCESSING";
      });
    }
    return lists;
  },
  //选中的订单
  checkedOrders: state => state.checkedOrders 
};

const mutations = {
  [types.ORDER_PENDING_LIST](state, pendingList) {
    state.pendingList = pendingList;
    sessionStorage.setItem("pendingList", JSON.stringify(pendingList));
  },
  [types.ORDER_PROCESSING_LIST](state, processingList) {
    state.processingList = processingList;
    sessionStorage.setItem("processingList", JSON.stringify(processingList));
  },
  [types.ORDER_OTHER_LIST](state, otherList) {
    state.otherList = otherList;
    sessionStorage.setItem("otherList", JSON.stringify(otherList));
  },
  [types.ORDER_CHECKED_ORDERS](state, checkedOrders) {
    state.checkedOrders = checkedOrders;
    sessionStorage.setItem("checkedOrders", JSON.stringify(checkedOrders));
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
