import * as types from "../types";

/**
 * 通用配置
 */
const state = {
  showAssignModel: false,
  orderIds4Assign: [],
  assignType: "assign"
};

const actions = {
  showAssignModel({ commit }, showAssignModel) {
    commit(types.COM_ASSIGN_SHOW, showAssignModel);
  },
  setOrderIds4Assign({ commit }, orderIds4Assign) {
    commit(types.COM_ASSIGN_SET_ORDER_IDS, orderIds4Assign);
  },
  setAssignType({ commit }, assignType) {
    commit(types.COM_ASSIGN_SET_TYPE, assignType);
  }
};

const getters = {
  showAssignModel: state => state.showAssignModel,
  orderIds4Assign: state => state.orderIds4Assign,
  assignType: state => state.assignType
};

const mutations = {
  [types.COM_ASSIGN_SHOW](state, showAssignModel) {
    state.showAssignModel = showAssignModel;
  },
  [types.COM_ASSIGN_SET_ORDER_IDS](state, orderIds4Assign) {
    state.orderIds4Assign = orderIds4Assign;
  },
  [types.COM_ASSIGN_SET_TYPE](state, assignType) {
    state.assignType = assignType;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
