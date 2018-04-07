const getters = {
  getCount: state => {
    return state.count;
  },
  getName: state => {
    return state.name;
  },
  getResultNum: state => {
    return state.resultNum;
  },
  checkedOrders: state => {
    return state.checkedOrders;
  }
};

export default getters;
