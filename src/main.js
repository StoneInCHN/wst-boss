import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import api from './apis'
import "./assets/css/reset.css"

Vue.prototype.$api = api
FastClick.attach(document.body)
Vue.config.productionTip = false

require('./mock')

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
