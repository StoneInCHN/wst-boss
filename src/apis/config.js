import Vue from "vue";
import axios from "axios";
import store from "../store/index";
import { Toast } from "vant";
import qs from "qs";

// 超时时间
axios.defaults.timeout = 5000;

//axios.defaults.baseURL = "http://localhost:8081/wst-boss/";

//
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// http请求拦截器
axios.interceptors.request.use(
  config => {
    const {token} = store.state.common
    //console.log({store})
    if (token) {
      config.headers.post["X-Auth-Token"] = `${token}`;
      /** 
      if (config.method === "post") {
        config.data = qs.stringify(config.data);
      }
      */
    }
    return config;
  },
  error => {
    Toast.fail("错误的传参");
    return Promise.reject(error);
  }
);

//返回状态判断
axios.interceptors.response.use(
  res => {
    return Promise.resolve(res.data);
  },
  error => {
    Toast.fail("网络异常");
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(
        res => {
          console.log("url", url);
          console.log("res", res);
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(
        res => {
          console.log("url", url);
          console.log("res", res);
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
  });
}

export function lift(res) {
  //console.log({ res });

  return new Promise((resolve, reject) => {
    //console.log({ resolve, reject });
    res
      .then(r => {
        const _CODE = "0000";
        //.log({r})
        //console.log(r.code === _CODE)
        if (r.code === _CODE) {
          resolve(r.msg);
          //console.log(r.msg)
        } else {
          reject(r);
        }
      })
      .catch(e => {
        Toast.fail("系统错误："+r.code);
        return Promise.reject(e);
      });
  });
}
