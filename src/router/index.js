import Vue from "vue";
import Router from "vue-router";

// 异步加载组件 减少首屏等待时间
const Home = () => import("@/pages/home/Home");

const Mine = () => import("@/pages/mine/Mine");
//我的-->统计
const Statistics = () => import("@/pages/mine/statistical/Statistics");
const WithdrawView = () => import("@/pages/mine/statistical/WithdrawView");
const WithdrawInput = () => import("@/pages/mine/statistical/WithdrawInput");
const AddAccount = () => import("@/pages/mine/statistical/AddAccount");
const MonthIncome = () => import("@/pages/mine/statistical/MonthIncome");
const CutSpending = () => import("@/pages/mine/statistical/CutSpending");

//我的-->管理
const Manage = () => import("@/pages/mine/manage/Manage");
const GoodsManage = () => import("@/pages/mine/manage/GoodsManage");
const GoodsEdit = () => import("@/pages/mine/manage/GoodsEdit");
const TicketManage = () => import("@/pages/mine/manage/TicketManage");
const TicketAdd = () => import("@/pages/mine/manage/TicketAdd");
const StoreManage = () => import("@/pages/mine/manage/StoreManage");
const WorkerManage = () => import("@/pages/mine/manage/WorkerManage");
const WorkerAdd = () => import("@/pages/mine/manage/WorkerAdd");

//用户
const UserManage = () => import("@/pages/user/UserManage");
const AddCoupon = () => import("@/pages/user/AddCoupon");
const AddCouponGoods = () => import("@/pages/user/AddCouponGoods");
const AddOrder = () => import("@/pages/user/AddOrder");
const AddGoods = () => import("@/pages/user/AddGoods");
const NewCode = () => import("@/pages/user/NewCode");
const ScanQr = () => import("@/pages/user/ScanQr");
const TotalOrderUsers = () => import("@/pages/user/TotalOrderUsers");

//订单
const Order = () => import("@/pages/order/Index");

//其他
const Calcul = () => import("@/pages/calculator/Index");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    //我的
    {
      path: "/mine",
      name: "Mine",
      component: Mine
    },
    {
      path: "/statistics",
      name: "Statistics",
      component: Statistics
    },
    {
      path: "/statistics/withdrawView",
      name: "WithdrawView",
      component: WithdrawView
    },
    {
      path: "/statistics/withdrawInput",
      name: "WithdrawInput",
      component: WithdrawInput
    },
    {
      path: "/statistics/addAccount",
      name: "AddAccount",
      component: AddAccount
    },
    {
      path: "/statistics/monthIncome",
      name: "MonthIncome",
      component: MonthIncome
    },
    {
      path: "/statistics/cutSpending",
      name: "CutSpending",
      component: CutSpending
    },
    {
      path: "/manage",
      name: "Manage",
      component: Manage
    },
    {
      path: "/manage/goodsManage",
      name: "GoodsManage",
      component: GoodsManage
    },
    {
      path: "/manage/goodsEdit",
      name: "GoodsEdit",
      component: GoodsEdit
    },
    {
      path: "/manage/ticketManage",
      name: "TicketManage",
      component: TicketManage
    },
    {
      path: "/manage/ticketAdd",
      name: "TicketAdd",
      component: TicketAdd
    },
    {
      path: "/manage/storeManage",
      name: "StoreManage",
      component: StoreManage
    },
    {
      path: "/manage/workerManage",
      name: "WorkerManage",
      component: WorkerManage
    },
    {
      path: "/manage/workerAdd",
      name: "WorkerAdd",
      component: WorkerAdd
    },  
    {
      path: "/userManage",
      name: "UserManage",
      component: UserManage
    },    
    {
      path: "/user/addCoupon",
      name: "AddCoupon",
      component: AddCoupon
    },  
    {
      path: "/user/addCouponGoods",
      name: "AddCouponGoods",
      component: AddCouponGoods
    }, 
    {
      path: "/user/addGoods",
      name: "AddGoods",
      component: AddGoods
    }, 
    {
      path: "/user/addOrder",
      name: "AddOrder",
      component: AddOrder
    }, 
    {
      path: "/user/newCode",
      name: "NewCode",
      component: NewCode
    },    
    {
      path: "/user/scanQr",
      name: "ScanQr",
      component: ScanQr
    },   
    {
      path: "/user/totalOrderUsers",
      name: "totalOrderUsers",
      component: TotalOrderUsers
    },            
    {
      path: "/order",
      name: "Order",
      component: Order
    },
    {
      path: "/cal",
      name: "Calcul",
      component: Calcul
    }
  ]
});
