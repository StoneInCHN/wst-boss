import * as types from "../types";
import apis from "../../apis";
import { getItem , getBooleanItem} from '../../utils'

/**
 * 通用配置
 */
const state = {
  token: sessionStorage.getItem("token") || "",
  key: sessionStorage.getItem("key") || "",
  userId: sessionStorage.getItem("userId") || 1,
  cobType: getItem("cobType") || [] ,
  editable: getBooleanItem("editable") || false
};

const actions = {
  setToken({ commit }, token) {
    commit(types.COM_SET_TOKEN, token);
  },
  setKey({ commit }, key) {
    commit(types.COM_SET_KEY, key);
  },
  setUserId({ commit }, userId) {
    commit(types.COM_SET_USER_ID, userId);
  },
  setCobType({ commit }, cobType) {
    commit(types.COM_SET_COB_PAY_TYPE, cobType);
  },
  setEditable({ commit }, editable) {
    commit(types.COM_SET_EDITABLE, editable);
  },
};

const getters = {
  token: state => state.token,
  key: state => state.key,
  userId: state => state.userId,
  cobType: state => state.cobType ,
  editable: state => state.editable
};

const mutations = {
  [types.COM_SET_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  [types.COM_SET_KEY](state, key) {
    state.key = key;
    sessionStorage.setItem("key", key);
  },
  [types.COM_SET_USER_ID](state, userId) {
    state.userId = userId;
    sessionStorage.setItem("userId", userId);
  },
  [types.COM_SET_COB_PAY_TYPE](state, cobType) {
    state.cobType = cobType;
    sessionStorage.setItem("cobType", JSON.stringify(cobType));
  },
  [types.COM_SET_EDITABLE](state, editable) {
    state.editable = editable;
    sessionStorage.setItem("editable", editable);
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
