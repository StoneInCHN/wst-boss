import { fetch, post, patch, put, lift } from "../config";

const baseUrl = "/";

const order = {
  pageShopOrders(params) {
    return lift(post("/wst-boss/sorder/pageShopOrders", params))
  },
  /**商家操作订单 */
  oprSO(params) {
    return lift(post("/wst-boss/sorder/oprSO", params));
  }
};

export default order;
