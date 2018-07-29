import { fetch, post, patch, put, lift } from "../config";

const baseUrl = "/";

const order = {
  pageShopOrders(params) {
    return lift(post("/sorder/pageShopOrders", params))
  },
  /**商家操作订单 */
  oprSO(params) {
    return lift(post("/sorder/oprSO", params));
  },
  /**商家操作订单 */
  printSO(params) {
    return lift(post("/sorder/printSO", params));
  }
};

export default order;
