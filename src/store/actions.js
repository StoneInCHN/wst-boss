const actions = {
  increment({ commit }) {
    commit("increment");
  },
  setResultNum({ commit }, resultNum) {
    commit("setResultNum", resultNum);
  },
  setWorker({ commit }, worker) {
    commit("setWorker", worker);
  },
  setCheckedOrders({ commit }, checkedOrders) {
    commit("setCheckedOrders", checkedOrders);
  },
  setToken({ commit }, token) {
    commit("setToken", token );
  }
};

export default actions;
