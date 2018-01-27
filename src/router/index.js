import Vue from 'vue'
import Router from 'vue-router'

// 异步加载组件 减少首屏等待时间
const Home = () => import('@/components/Home')
const Calcul = () => import('@/pages/calculator/Index')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cal',
      name: 'Calcul',
      component: Calcul
    }
  ]
})