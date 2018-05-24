import Vue from 'vue'
import Router from 'vue-router'
//首页
import Garden from '@/components/Garden'
import record from '@/components/garden/record'
import remind from '@/components/garden/remind'
import collec from '@/components/garden/collec'
//智能缴费
import payCost from '@/components/payCost'
import billConfim from '@/components/payCost/billConfim'
import billConfim_eq from '@/components/payCost/billConfim_eq'
//手工缴费
import manualPayment from '@/components/manualPayment'
import childPayment from '@/components/manualPayment/childPayment'
import classPayment from '@/components/manualPayment/classPayment'
import newPayment from '@/components/manualPayment/newPayment'
import paymentBill from '@/components/manualPayment/paymentBill'

//缴费记录查询
import payMentRecordEnquiry from '@/components/payMentRecordEnquiry'
//账单查询
import queryBill from '@/components/queryBill'
import checkDetail from '@/components/queryBill/checkDetail'
Vue.use(Router)

const router = new Router({
  routes: [
    // { path: '/', redirect: '/Garden' },
    {
      path: '/Garden',
      name: 'Garden',
      component: Garden,
      meta: {}
    },
    {
      path: '/record',
      name: 'record',
      component: record,
      meta: {}
    },
    {
      path: '/remind',
      name: 'remind',
      component: remind,
      meta: {}
    },
    {
      path: '/collec',
      name: 'collec',
      component: collec,
      meta: {}
    },
    {
      path: '/payCost',
      name: 'payCost',
      component: payCost,
      meta: {}
    },
    {
      path: '/billConfim',
      name: 'billConfim',
      component: billConfim,
      meta: {}
    },
    {
      path: '/billConfim_eq/:dataObj',
      name: 'billConfim_eq',
      component: billConfim_eq,
      meta: {}
    },
    {
      path:'/manualPayment',
      name:'manualPayment',
      component:manualPayment,
      meta: {},
      children:[
        {
          path: '/',
          redirect: '/manualPayment/classPayment',
          meta: {},
        },
        {
          path: '/manualPayment/classPayment',
          name: 'classPayment',
          component: classPayment,
          meta: {}
        },
        {
          path: '/manualPayment/childPayment',
          name: 'childPayment',
          component: childPayment,
          meta: {}
        },

        {
          path: '/manualPayment/newPayment',
          name: 'newPayment',
          component: newPayment,
          meta: {}
        },
        {
          path:'/manualPayment/paymentBill',
          name: 'paymentBill',
          component: paymentBill,
          meta: {}
        }
      ]
    },
    {
      path:'/payMentRecordEnquiry',
      name:'payMentRecordEnquiry',
      component:payMentRecordEnquiry,
      meta: {title: "缴费记录查询"}
    },
    {
      path:'/queryBill',
      name:'queryBill',
      component:queryBill,
      meta: {title: "账单查询", }
    },
    {
      path:'/checkDetail/:id/:payStatus?',
      name:'checkDetail',
      component:checkDetail,
      meta: {title: "账单详情"}
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to.name);
  next()
})


export default router
