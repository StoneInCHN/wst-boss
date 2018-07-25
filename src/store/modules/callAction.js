import * as types from "../types";
import apis from "../../apis";
import { getItem , getBooleanItem, getIntItem} from '../../utils'

/**
 * 通用配置
 */
const state = {
    callActions: [],
    showCall: false
};

const actions = {
  setCallActions({ commit }, callActions) {
    commit(types.CALL_ACTION_CALLACTIONS, callActions);
  },
  setShowCall({ commit }, showCall) {
    commit(types.CALL_ACTION_SHOWCALL, showCall);
  }
};

const getters = {
    callActions: state => state.callActions,
    showCall: state => state.showCall
};

const mutations = {
  [types.CALL_ACTION_CALLACTIONS](state, callActions) {
    state.callActions = callActions;
  },
  [types.CALL_ACTION_SHOWCALL](state, showCall) {
    state.showCall = showCall;
  },
  
};

export default {
  state,
  actions,
  getters,
  mutations
};
