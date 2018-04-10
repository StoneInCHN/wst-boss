const mutations = {
  increment(state, payload) {
    state.count++;
  },
  setResultNum(state, resultNum) {
    state.resultNum = resultNum;
  },
  setWorker(state, worker) {
    state.worker = worker;
  },
  setCheckedOrders(state, checkedOrders) {
    state.checkedOrders = checkedOrders;
  },
  setToken(state, token) {
    state.token = token;
  }
};

export default mutations;
