import { fetch, post, patch, put, lift } from "../config";

const index = {
  getCntOrder(params) {
    return lift(post("/sorder/cntOrders", params));
  },
  getRank(params) {
    return lift(post("/sGoods/getRank", params));
  }
};

export default index;
