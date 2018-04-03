import { fetch, post, patch, put } from "../config";

const baseUrl = "/";

const order = {
  pageShopOrders(params) {
    return post("/sorder/pageShopOrders", params);
  }
};

export default order;
