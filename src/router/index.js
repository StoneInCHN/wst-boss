import Vue from 'vue'
import Router from 'vue-router'

// 异步加载组件 减少首屏等待时间
const Home = () => import('@/pages/home/Home')
const Boss = () => import('@/pages/boss/Boss')
const Statistics = () => import('@/pages/boss/statistical/Statistics')
const WithdrawView = () => import('@/pages/boss/statistical/WithdrawView')
const WithdrawInput = () => import('@/pages/boss/statistical/WithdrawInput')
const AddAccount = () => import('@/pages/boss/statistical/AddAccount')
const MonthIncome = () => import('@/pages/boss/statistical/MonthIncome')

const Calcul = () => import('@/pages/calculator/Index')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    //我的
    {
      path: '/boss',
      name: 'Boss',
      component: Boss
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/statistics/withdrawView',
      name: 'WithdrawView',
      component: WithdrawView
    },
    {
      path: '/statistics/withdrawInput',
      name: 'WithdrawInput',
      component: WithdrawInput
    },
    {
      path: '/statistics/addAccount',
      name: 'AddAccount',
      component: AddAccount
    },
    {
      path: '/statistics/monthIncome',
      name: 'MonthIncome',
      component: MonthIncome
    },    
    {
      path: '/cal',
      name: 'Calcul',
      component: Calcul
    }
  ]
})