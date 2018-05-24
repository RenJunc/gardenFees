/*api*/
import axios from 'axios'
axios.defaults.withCredentials = true
const ON_LINE_URL = 'https://javaport.bbtree.com/erpfinanceapi'
const ON_DEV_URL = ''




export default {
  /** 2018/5/11
   *说明: 2.1  首页统计接口
   * params 【参数】
   */
  requestStatisticApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/statistic',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.2园所二维码
  *params 【参数】
  *
  * */
  requestSchoolCodeApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/schoolcode',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
   *说明: 2.20  账单列表
   * params 【参数】
   */
  requestBillsearchApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/billsearch',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
    * 2.3 提现记录页面
    *params【参数】
    * */
  requestDrawlistApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/drawlist',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
   *说明: 2.16  缴费账单详情数据获取接口
   * params 【参数】
   */
  requestPaydetailApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/paydetail',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.25 提现记录导出
  * params【参数】
  * */
  requestGecashrecordexportApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/gecashrecordexport',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
   *说明: 2.23  批次账单查看接口
   * params 【参数】
   */
  requestGetStudentBillApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/getstudentbill',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
   *说明: 2.23  班级列表
   * params 【参数】
   */
  requestClassListApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/listclass',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
   *说明: 2.11  缴费状态/缴费方式合集
   * params 【参数】
   */
  requestBillStatusListApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/billStatusList',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.4 缴费记录查询  批次账单查看（共用）
  * params【参数】
  * */
  requestPaylistApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/paylist',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },

  /*
  * 2.19 催费
  * params【参数】
  * */
  requestWarnpayallApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/warnpayall',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.12 关闭账单
  * params【参数】
  * */
  requestClosedpayApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/closedpay',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.5 缴费账单导入模板下载,页面使用window.open()实现
  * params【参数】
  * */
  /*requestBillDownApi (params) {
    return axios({
      method: 'get',
      url: ON_DEV_URL + '/vrf/v1/finance/billtempletedown',
      data: params /!* 注意 get 请求要把 data 改为 params *!/
    })
  },*/
  /*
  * 2.15  其他方式收费保存（线下收费）
  * params【参数】
  * */
  requestOtherPayTypeApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/otherpaytype',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
    * 2.6 缴费账单导入
    * params【参数】
    * */
  requestBillImportApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/billimport',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
    * 2.28  缴费单打印，页面使用window.open()实现
    * params【参数】
    * */
  /*requestBillprintApi (params) {
    return axios({
      method: 'get',
      url: ON_DEV_URL + '/vrf/v1/finance/billprint',
      params: params /!* 注意 get 请求要把 data 改为 params *!/
    })
  },*/
  /*
    * 2.14  收据打印 页面使用window.open()实现
    * params【参数】
    * */
  /*requestBillPayPrintApi (params) {
    return axios({
      method: 'get',
      url: ON_DEV_URL + '/vrf/v1/finance/billpayprint',
      params: params /!* 注意 get 请求要把 data 改为 params *!/
    })
  },*/
  /*
  * 2.7 账单确认发送
  * params【参数】
  * */
  requestBillSendApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/billsend',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.29  手动发起账单
  * params【参数】
  * */
  requestBillCreateApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/billcreate',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * 2.10  收费项目使用率获取接口
  * params【参数】
  * */
  requestListItemApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/listitem',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
/*
  * 2.22 缴费单下载，页面中使用window.open()实现
  * params【参数】
  * */
  /*requestDownloadbillApi (params) {
    return axios({
      method: 'get',
      url: ON_DEV_URL + '/vrf/v1/finance/downloadbill',
      params: params /!* 注意 get 请求要把 data 改为 params *!/
    })
  },*/
/*
  * 2.9 按照条件获取孩子接口
  * params【参数】
  * */
  requestFindChildConditionApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/findchildsbyconditions',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
/*
  * 2.30  提现回执打印,页面中使用window.open()实现
  * params【参数】
  * */
  /*requestBillCashPrintApi (params) {
    return axios({
      method: 'get',
      url: ON_DEV_URL + '/vrf/v1/finance/billcashprint',
      data: params /!* 注意 get 请求要把 data 改为 params *!/
    })
  },*/
      /*
      * * 2.13  删除缴费账单
  * params【参数】
  * */
  requestDeletePayApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/deletepay',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  },
  /*
  * *  获取催费条数
  * params【参数】
  * */
  requestGetWarnPayCountApi (params) {
    return axios({
      method: 'post',
      url: ON_DEV_URL + '/vrf/v1/finance/getwarnpaycount',
      data: params /* 注意 get 请求要把 data 改为 params */
    })
  }
}
