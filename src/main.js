import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import api from './apis/index'
import wechat from 'weixin-js-sdk'
import VeeValidate from 'vee-validate';
import "./assets/css/reset.css"
import 'vant/lib/vant-css/icon-local.css';
import "./assets/css/common.css"

Vue.use(VeeValidate);

//用于简单的事件调用
Vue.prototype.$eventBus = new Vue()
Vue.prototype.$wechat = wechat
Vue.prototype.$api = api
FastClick.attach(document.body)
Vue.config.productionTip = false


//require('./mock')

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
