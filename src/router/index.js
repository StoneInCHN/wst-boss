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
const QrManage = () => import("@/pages/mine/manage/QrManage");
const GoodsManage = () => import("@/pages/mine/manage/GoodsManage");
const GoodsEdit = () => import("@/pages/mine/manage/GoodsEdit");
const TicketManage = () => import("@/pages/mine/manage/TicketManage");
const TicketAdd = () => import("@/pages/mine/manage/TicketAdd");
const StoreManage = () => import("@/pages/mine/manage/StoreManage");
const WorkerManage = () => import("@/pages/mine/manage/WorkerManage");
const WorkerAdd = () => import("@/pages/mine/manage/WorkerAdd");
const WorkerSearch = () => import("@/pages/mine/manage/WorkerSearch");

//用户
const UserManage = () => import("@/pages/user/UserManage");
const AddCoupon = () => import("@/pages/user/AddCoupon");
const AddCouponGoods = () => import("@/pages/user/AddCouponGoods");
const AddOrder = () => import("@/pages/user/AddOrder");
const AddGoods = () => import("@/pages/user/AddGoods");
const NewCodeUser = () => import("@/pages/user/NewCodeUser");
const EditCodeUser = () => import("@/pages/user/EditCodeUser");
const ScanQr = () => import("@/pages/user/ScanQr");
const ScanQr1 = () => import("@/pages/user/ScanQr1");
const TotalOrderUsers = () => import("@/pages/user/TotalOrderUsers");
const TotalCodeUsers = () => import("@/pages/user/TotalCodeUsers");

//订单
const Order = () => import("@/pages/order/Index");

//注册
const Register = () => import("@/pages/register/Boss");
const RegisterSuccess = () => import("@/pages/register/RegisterSuccess");

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
      path: "/manage/qrManage",
      name: "QrManage",
      component: QrManage
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
      path: "/manage/workerSearch",
      name: "WorkerSearch",
      component: WorkerSearch
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
      path: "/user/newCodeUser",
      name: "NewCodeUser",
      component: NewCodeUser
    },
    {
      path: "/user/editCodeUser",
      name: "EditCodeUser",
      component: EditCodeUser
    },
    {
      path: "/user/scanQr",
      name: "ScanQr",
      component: ScanQr
    },
    {
      path: "/user/scanQr1",
      name: "ScanQr1",
      component: ScanQr1
    },
    {
      path: "/user/totalOrderUsers",
      name: "totalOrderUsers",
      component: TotalOrderUsers
    },
    {
      path: "/user/totalCodeUsers",
      name: "totalCodeUsers",
      component: TotalCodeUsers
    },
    {
      path: "/order",
      name: "Order",
      component: Order
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/registerSuccess",
      name: "RegisterSuccess",
      component: RegisterSuccess
    }
  ]
});
