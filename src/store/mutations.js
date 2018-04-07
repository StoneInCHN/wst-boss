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
  }
};

export default mutations;
