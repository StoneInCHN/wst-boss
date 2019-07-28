import { fetch, post, patch, put, lift } from "../config";


const order = {
  pageShopOrders(params) {
    return post("/sorder/pageShopOrders", params)
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
