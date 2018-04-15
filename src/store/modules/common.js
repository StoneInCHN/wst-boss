import * as types from "../types";
import apis from "../../apis";

/**
 * 通用配置
 */
const state = {
  token: sessionStorage.getItem("token") || "",
  key: "",
  userId: 1
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
  }
};

const getters = {
  token: state => state.token,
  key: state => state.key,
  userId: state => state.userId
};

const mutations = {
  [types.COM_SET_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem("token",token)
  },
  [types.COM_SET_KEY](state, key) {
    state.key = key;
  },
  [types.COM_SET_USER_ID](state, userId) {
    state.userId = userId;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
