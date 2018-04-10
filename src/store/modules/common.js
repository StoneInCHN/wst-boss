import * as types from "../types";
import apis from "../../apis"

/**
 * 通用配置
 */
const state = {
  token: "",
  key: ""
};

const actions = {
  setToken({ commit }, token) {
    commit(types.COM_SET_TOKEN, token);
  },
  setKey({ commit }, key) {
    commit(types.COM_SET_KEY, key);
  }
};

const getters = {
  token: state => state.token,
  key: state => state.key
};

const mutations = {
  [types.COM_SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.COM_SET_KEY](state, key) {
    state.key = key;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
