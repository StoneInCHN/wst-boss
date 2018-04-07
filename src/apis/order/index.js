import { fetch, post, patch, put } from "../config";

const baseUrl = "/";

const order = {
  pageShopOrders(params) {
    return post("/sorder/pageShopOrders", params);
  },
  /**商家操作订单 */
  oprSO(params) {
    return post("/sorder/oprSO", params);
  }
};

export default order;
