import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cal from '@/pages/calculator/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cal',
      component: Cal
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
