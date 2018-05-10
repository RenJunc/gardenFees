import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//首页
import Garden from '@/components/Garden'
import record from '@/components/garden/record'
import remind from '@/components/garden/remind'
import collec from '@/components/garden/collec'
//智能缴费
import payCost from '@/components/payCost'
import billConfim from '@/components/payCost/billConfim'
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

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    { path: '/', redirect: '/Garden' },
    {
      path: '/Garden',
      name: 'Garden',
      component: Garden
    },
    {
      path: '/record',
      name: 'record',
      component: record
    },
    {
      path: '/remind',
      name: 'remind',
      component: remind
    },
    {
      path: '/collec',
      name: 'collec',
      component: collec
    },
    {
      path: '/payCost',
      name: 'payCost',
      component: payCost
    },
    {
      path: '/billConfim',
      name: 'billConfim',
      component: billConfim
    },
    {
      path:'/manualPayment',
      name:'manualPayment',
      component:manualPayment,
      children:[
        {
          path: '/',
          name: 'classPayment',
          component: classPayment
        },
        {
          path: '/childPayment',
          name: 'childPayment',
          component: childPayment
        },

        {
          path: '/newPayment',
          name: 'newPayment',
          component: newPayment
        },
        {
          path:'/paymentBill',
          name: 'paymentBill',
          component: paymentBill
        }
      ]
    },
    {
      path:'/payMentRecordEnquiry',
      name:'payMentRecordEnquiry',
      component:payMentRecordEnquiry
    },
    {
      path:'/queryBill',
      name:'queryBill',
      component:queryBill
    },
    {
      path:'/checkDetail',
      name:'checkDetail',
      component:checkDetail
    }
  ]
})
