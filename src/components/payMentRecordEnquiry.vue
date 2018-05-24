<template>
  <div class="payMentRecordEnquiry">
    <!--<h3>缴费记录查询</h3>-->
    <PartSearch
      @changeClass="changeClassFn"
      @changePayStatus="changePayStatusFn"
      @changePayType="changePayTypeFn"
      @changeMobile="changeMobileFn"
      @changeName="changeNameFn"
      @changeTime="changeTimeFn"
      @changeTimeType="changeTimeTypeFn"
      @search="searchFn">
    </PartSearch>
    <div class="payMentRecord_sum">
      合计：<span>{{dataObj.payCount || 0}}/{{dataObj.statisticsCount || 0}}</span>笔<span>{{dataObj.payTotalMoney || 0}}/{{dataObj.totalMoney|| 0}}</span>元
    </div>
    <div class="payMentRecord_table">
      <Table border :columns="columns" :data="tableData"></Table>
    </div>
    <PartPage :tableData="tableData" :total="total" :current="curPage" :page-size="pageSize"
              @changePage="changePage" @changePageSize="changePageSize"></PartPage>
    <!--账单详情弹窗-->
    <PartDetailModal :isEditPayType="isEditPayType" :data="detailData" @clickOk="clickOkFn" @clickCancel="clickCancelFn"
                     :title-text="modalTitleText" :is-show="isShowModal"></PartDetailModal>
    <!--关闭确认弹窗-->
    <PartModal @clickOk="clickOkTwoFn" @clickCancel="clickCancelTwoFn" :title-text="modalTitleText"
               :is-show="isShowModalTwo">
      <div slot="main" class="close-modal-main">
        <div><span class="label-span">账单名称：</span><span>{{closeObj.billName}}</span></div>
        <div><span class="label-span">学生姓名：</span><span>{{closeObj.childName}}</span></div>
        <div><span class="label-span">家长手机号：</span><span>{{closeObj.childPhone}}</span></div>
        <div><span class="label-span">收费金额：</span><span>{{closeObj.total}}</span></div>
        <div class="hint-box">
          <Icon type="information-circled"></Icon>
          <span class="label-span hint-text">该操作将关闭账单，账单关闭后家长将查询不到该账单，并且关闭后不能重新打开，请仔细确认是否关闭？</span></div>
      </div>
    </PartModal>
    <!--催费确认弹窗-->
    <PartModal @clickOk="clickOkThreeFn" @clickCancel="clickCancelThreeFn" :title-text="modalTitleText"
               :is-show="isShowModalThree">
      <div slot="main" class="power-pay-modal-main">
        <div><span class="label-span">是否确认催费？</span></div>
        <div><span class="label-span">温馨提示：单条缴费单同一天内只能催缴一次！</span></div>
      </div>
    </PartModal>
  </div>
</template>

<script>
  import API from '../api/api'
  import PartSearch from './Part_head_search/Part_head_search'
  import PartModal from './Part/Part_modal'
  import PartPage from './Part/part_page'
  import PartDetailModal from './Part_detail_modal/Part_detail_modal'

  export default {
    name: 'payMentRecordEnquiry',
    data () {
      return {
        isShowModal: false,
        isShowModalTwo: false,
        isShowModalThree: false,
        isEditPayType: false,
        closeOnly: false,
        closeObj: {
          billName: '',
          childName: '',
          childPhone: '',
          total: '',
          payId:'',
        },
        detailData: {},
        modalTitleText: '',
        childName: '',
        classId: '',
        payStatus: '',
        CreateDate: '',
        payTypes: '',
        curPage: 1,
        pageSize: 20,
        total: 0,
        billState: '0',
        timeType:0,
        payType: '',
        columns: [
          {
            title: '学生姓名',
            key: 'childName'
          },
          {
            title: '班级',
            key: 'className'
          },
          {
            title: '家长手机号',
            key: 'childPhone'
          },
          {
            title: '收费金额（元）',
            key: 'total'
          },
          {
            title: '账单状态',
            key: 'theStatus',
            render: (h, params) => {
              if(params.row.theStatus !== -9){
                const that = this
                return h('div',{
                  style:{
                    color: that.billStatusColor(params.row.theStatus)
                  }
                }, that.theStatusText(params.row.theStatus)  +  that.thePayTypeText(params.row.payType))
              }else{
                const that = this
                return h('div',{
                  style:{
                    color: that.billStatusColor(params.row.theStatus)
                  }
                }, that.theStatusText(params.row.theStatus))
              }

            }
          },
          {
            title: '操作',
            key: 'action',
            width: 380,
            render: (h, params) => {
              /**
               * 1）账单状态为待缴费时，操按钮为查看、催费、其它方式收费、关闭
               2）账单状态为缴费成功时，操作按钮为查看、打印收据
               3）账单状态为缴费关闭、账单逾期，操作按钮为查看、删除
               4）账单状态为发送失败时，操作按钮为查看、关闭。
               5）账单状态为定时发送时，操作按钮为查看、关闭
               *
               */
              const that = this
              let btnText = '催费'
              let isDisabled = false
              const rowData = params.row
              const rowPayId = rowData.payId
              const rowPayStatus = rowData.theStatus
              let color = '#4ca8eb'
              if (rowData.isCharge === 1) {
                btnText = '今日已催费'
                isDisabled = true
                color = 'rgb(204, 204, 204)'
              }
              return h('div', [
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      that.requestPaydetailApiFn({payId: rowPayId})
                    }
                  }
                }, '查看'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: isDisabled
                  }, style: {
                    display:rowPayStatus !== 5 ? 'none' : 'inline-block',
                    margin: '5px',
                    color: color
                  },
                  on: {
                    click: () => {
                      if (btnText === '今日已催费') {
                        return false
                      }
                      that.requestWarnpayallApiFn({payId: rowPayId})
                    }
                  }
                }, btnText),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    display: rowPayStatus !==5 ? 'none' : 'inline-block',
                    margin: '5px',
                  },
                  on: {
                    click: () => {
                      that.requestPaydetailApiFn({payId: rowPayId, flag: 'editPayType'})
                    }
                  }
                }, '其它方式收费'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    display:rowPayStatus !== 9 ? 'none' : 'inline-block',
                    margin: '5px',
                  },
                  on: {
                    click: () => {
                      // that.requestBillprintApiFn({payId: rowPayId})
                      window.open('https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/billprint?billId='+rowPayId)

                    }
                  }
                }, '打印催费单'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    display: rowPayStatus !== 9 && rowPayStatus !== -9 && rowPayStatus !== -5 ? 'inline-block' : 'none',
                    margin: '5px',
                  },
                  on: {
                    click: () => {
                      that.closeOnly = true
                      that.closeObj.billName = rowData.fname
                      that.closeObj.childName = rowData.childName
                      that.closeObj.childPhone = rowData.childPhone
                      that.closeObj.total = rowData.total
                      that.closeObj.payId = rowPayId
                      that.modalTitleText = '关闭缴费'
                      that.isShowModalTwo = true
                    }
                  }
                }, '关闭'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    display:rowPayStatus === -9 ||rowPayStatus=== -5 ? 'inline-block': 'none' ,
                    margin: '5px',
                  },
                  on: {
                    click: () => {
                      that.requestDeletePayApiFn({payId:rowPayId})
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        dataObj: {},
        list: [],
        payMentDate: []
      }
    },
    components: {
      PartSearch,
      PartModal,
      PartDetailModal,
      PartPage
    },
    created () {
      // 重置手动缴费页面回显数据
      this.$store.commit('manualPayment/resetData')
      this.requestPaylistApiFn({curPage: 1})
    },
    computed: {
      tableData: function () {
        return this.dataObj.items
      },
    },
    methods: {
      billStatusColor:function (val) {
        // 发送失败
        if(val===1){
          return '#f26875'
        }
        // 待缴费
        if(val===5){
          return '#ff9900'
        }
        // 缴费成功
        if(val===9){
          return '#32c296'
        }
        return '#333'
      },
      /**
       * 缴费账单列表
       * @param obj
       */
      requestPaylistApiFn (obj = {}) {
        const that = this
        let params = {
          billTime: this.billTime,
          childPhone: this.childPhone,
          childName: that.childName,
          classId: that.classId,
          payStatus: that.payStatus,
          payType: that.payTypes,
          curPage: that.curPage,
          pageSize: that.pageSize,
        }
        if (obj.curPage) {
          params.curPage = obj.curPage
        }
      if(that.timeType === 0){
        params.payDatetimeStrart = that.payMentDate[0] || ''
        params.payDatetimeEnd = that.payMentDate[1] || ''
      }
      if(that.timeType === 1){
        params.releaseDatetimeBegin = that.payMentDate[0] || ''
        params.releaseDatetimeEnd = that.payMentDate[1] || ''
      }

        API.requestPaylistApi(params).then(function (json) {
          if (json.data.code === '000') {
            let data = json.data.data
            that.dataObj = data
            that.pageSize = data.pageSize
            that.total = data.count
            that.curPage = data.curPage
          } else {
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 催费
       * @param obj
       */
      requestWarnpayallApiFn (obj = {}) {
        const that = this
        let params = {}
        if (obj.payId) {
          params.billId = [obj.payId]
        }
        API.requestWarnpayallApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('催费成功')
            that.requestPaylistApiFn({curPage: 1})
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 关闭账单
       * @param obj
       */
      requestClosedpayApiFn (obj = {}) {
        const that = this
        let params = {}
        if (that.closeObj.payId) {
          params.payId = that.closeObj.payId
        }
        API.requestClosedpayApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('关闭成功')
            that.requestPaylistApiFn({curPage: 1})
          } else {
            that.$Message.error(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 缴费账单详情数据获取接口
       * @param obj
       */
      requestPaydetailApiFn (obj = {}) {
        const that = this
        let params = {
          payId: ''
        }
        if (obj.payId) {
          params.payId = obj.payId
        }
        if (obj.flag === 'editPayType') {
          that.isEditPayType = true
        }
        API.requestPaydetailApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.modalTitleText = '记录详情'
            that.isShowModal = true
            that.detailData = json.data.data
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 请求其他付费方式
       * @param obj
       */
      requestOtherPayTypeApiFn (obj = {}) {
        const that = this
        let params = {
          payId: obj.payId,
          payType: obj.payType - 0,
          total: obj.total
        }
        API.requestOtherPayTypeApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('更改成功')
            that.requestPaylistApiFn({curPage: 1})
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 删除缴费
       * @param obj
       */
      requestDeletePayApiFn (obj = {}) {
        const that = this
        let params = {
          payId: obj.payId,
        }
        API.requestDeletePayApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('删除成功')
            that.requestPaylistApiFn({curPage: 1})
          } else {
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      theStatusText (status) {
        // -9：手动关闭， -5：逾期关闭， 1：发送失败， 2：发送中， 5：已发布，9：已收齐
        if (status === -9) {
          return '手动关闭'
        }
        if (status === -5) {
          return '逾期关闭'
        }
        if (status === 1) {
          return '发送失败'
        }
        if (status === 2) {
          return '发送中'
        }
        if (status === 5) {
          return '待缴费'
        }
        if (status === 9) {
          return '已收齐'
        }
        return ''
      },
      thePayTypeText (status) {
        // 1.支付宝缴费 4.微信缴费 11，现金 12，pos机 13，银行转账 14 ，微信转账 15，支付宝转账
        if (status === 1) {
          return '（支付宝）'
        }
        if (status === 4) {
          return '（微信缴费）'
        }
        if (status === 11) {
          return '（现金）'
        }
        if (status === 12) {
          return '（pos机）'
        }
        if (status === 13) {
          return '（银行转账）'
        }
        if (status === 14) {
          return '（微信转账）'
        }
        if (status === 15) {
          return '（支付宝转账）'
        }
        return ''
      },
      changePage (page) {
        this.curPage = page
        this.requestPaylistApiFn()
      },
      changePageSize (page) {
        this.pageSize = page
        this.requestPaylistApiFn({curPage: 1})
      },
      changeClassFn (val) {
        console.log('changeClass' + val)
        this.classId = val
      },
      changePayStatusFn (val) {
        console.log('changePayStatusFn' + val)
        this.payStatus = val
      },
      changePayTypeFn (val) {
        console.log('changePayTypeFn' + val)
        this.payTypes = val
      },
      changeNameFn (val) {
        console.log('changePayStatusFn' + val)
        this.childName = val
      },
      searchFn (val) {
        console.log('search' + val)

      },
      search () {
        this.requestPaylistApiFn()
      },
      changeTimeFn (date) {
        console.log(date)
        this.payMentDate = date
      },
      changeTimeTypeFn (val) {
        this.timeType = val
      },
      changeClassFn (val) {
        console.log('changeClass' + val)
        this.classId = val
      },
      changePayStatusFn (val) {
        console.log('changePayStatusFn' + val)
        this.payStatus = val
      },
      changePayTypeFn (val) {
        console.log('changePayTypeFn' + val)
        this.payTypes = val
      },
      changeNameFn (val) {
        console.log('changePayStatusFn' + val)
        this.childName = val
      },
      searchFn (val) {
        console.log('search' + val)
        this.requestPaylistApiFn()
      },
      changeMobileFn (val) {
        console.log('changeMobileFn' + val)
        this.childPhone = val
      },
      // 查看账单详情确认弹窗
      clickCancelFn () {
        this.isShowModal = false
        this.isEditPayType = false
      },
      clickOkFn (obj) {
        this.isShowModal = false
        this.isEditPayType = false
        if (obj) {
          console.log('更改付费方式' + JSON.stringify(obj))
          this.requestOtherPayTypeApiFn(obj)
        }
      },
      // 关闭确认弹窗
      clickCancelTwoFn () {
        this.isShowModalTwo = false
        this.closeOnly = false
      },
      clickOkTwoFn (obj) {
        this.isShowModalTwo = false
        this.closeOnly = false
        this.requestClosedpayApiFn()
      },
      // 催费确认弹窗
      clickCancelThreeFn () {
        this.isShowModalThree = false
      },
      clickOkThreeFn (obj) {
        this.isShowModalThree = false
        this.requestWarnpayallApiFn()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/stylesheets/common.scss';
  .payMentRecordEnquiry {
    @include clearfix();
    margin: 0 16px;
    color: #333;
    font-size: 14px;
  }

  h3 {
    line-height: 40px;
    color: #333;
    margin-left: 20px;
  }

  .search {
    /*float: right;*/
    display: inline-block;
    width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: #32c296;
    border-radius: 4px;
    cursor: pointer;
  }

  .payMentRecord_tit {
    line-height: 40px;
  }

  .payMentRecord_tit label {
    margin-left: 20px;
  }

  .payMentRecord_sum {
    line-height: 50px;
    overflow: hidden;
    padding-top: 10px;
    padding-left: 20px;
    span{
      font-weight: bold;
      font-size: 20px;
    }
  }

  .payMentRecord_sum span:nth-child(2) {
    margin-left: 10px;
  }

  .page {
    float: right;
    margin: 10px 20px 20px 0;
  }
  .close-modal-main {
    font-size: 14px;
    margin: 0 30px;
    .hint-box {
      margin-top: 20px;
      .hint-text {
        color: red;
        padding-left: 5px;
      }
    }
  }
</style>
