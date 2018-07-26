import * as types from "../types";

/**
 * 通用配置
 */
const state = {
  showAssignModel: false,
  orderIds4Assign: [],
  actionType: "toAssign"
};

const actions = {
  showAssignModel({ commit }, showAssignModel) {
    commit(types.COM_ASSIGN_SHOW, showAssignModel);
  },
  setOrderIds4Assign({ commit }, orderIds4Assign) {
    commit(types.COM_ASSIGN_SET_ORDER_IDS, orderIds4Assign);
  },
  setAssignType({ commit }, actionType) {
    commit(types.COM_ASSIGN_SET_TYPE, actionType);
  },
  assignAction({ commit }, payload) {
    commit(types.COM_ASSIGN_SET_ASSIGN_ACTION, payload)
  }
};

const getters = {
  showAssignModel: state => state.showAssignModel,
  orderIds4Assign: state => state.orderIds4Assign,
  actionType: state => state.actionType
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
  },
  [types.COM_ASSIGN_SET_ASSIGN_ACTION](state, assignType) {
    const { ids, actionType} = assignType
    state.orderIds4Assign = ids;
    state.actionType = actionType;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
