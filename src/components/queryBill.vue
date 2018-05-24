<template>
  <div class="queryBill">
    <!--<h3>账单查询</h3>-->
    <div class="queryBill_tit">
      <label>
        <span>账单发送日期：</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          style="width: 180px"
          @on-change="changeTime"
          v-model="payMentDate"
        ></DatePicker>
      </label>
      <label>
        <span>账单名称：</span>
        <Input v-model.trim="billName" placeholder="" style="width: 150px"/>
      </label>
      <label>
        <span class="search" @click="search">查询</span>
      </label>
    </div>
    <div class="queryBill_table">
      <Table border :columns="columns" :data="tableData"></Table>
    </div>
    <PartPage :tableData="tableData" :total="total" :current="curPage" :page-size="pageSize"
              @changePage="changePage" @changePageSize="changePageSize"></PartPage>
    <!--催费确认弹窗-->
    <PartModal @clickOk="clickOkThreeFn" @clickCancel="clickCancelThreeFn" :title-text="modalTitleText"
               :is-show="isShowModalThree">
      <div slot="main" class="power-pay-modal-main">
        <div><span class="label-span">本次一健催费的账单为{{powerBillNum}}条。</span></div>
        <div><span class="label-span">温馨提示：单条缴费单同一天内只能催缴一次！</span></div>
      </div>
    </PartModal>
  </div>
</template>

<script>
  import API from '../api/api'
  import PartModal from './Part/Part_modal'
  import PartPage from './Part/part_page'

  export default {
    name: 'queryBill',
    data () {
      return {
        isShowModalThree: false,
        modalTitleText: '',
        billName: '',
        powerBillId: '',
        powerBillNum: '',
        curPage: 1,
        pageSize: 20,
        total: 0,
        columns: [
          {
            title: '账单名称',
            key: 'name'
          },
          {
            width: 110,
            title: '发送时间',
            key: 'releaseDatetimeStr'
          },
          {
            width: 110,
            title: '到期时间',
            key: 'closeDatetimeStr',
            render:(h,params)=>{
              return h('div',params.row.closeDatetimeStr || '无')
            }
          },
          {
            title: '实收/应收金额',
            key: 'receiveMoney',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: 'red'
                  }
                }, params.row.receiveMoney),
                h('span', '/' + params.row.totalMoney)
              ])
            },
          },
          {
            title: '待收金额',
            key: 'unReceiveMoney',
            render: (h, params) => {
              const that = this
              return h('span', {
                style: {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'checkDetail', params: {id: params.row.billId, payStatus: 5}})
                  }
                }
              }, params.row.unReceiveMoney)
            }
          },
          {
            title: '成功数/总数',
            key: 'successpay',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: 'red'
                  }
                }, params.row.payBillAmount),
                h('span', '/' + params.row.billAmount)
              ])
            },
          },
          {
            title: '未缴费数',
            key: 'unPayBillAmount',
            render: (h, params) => {
              const that = this
              return h('span', {
                style: {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'checkDetail', params: {id: params.row.billId, payStatus: 5}})
                  }
                }
              }, params.row.unPayBillAmount)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
            render: (h, params) => {
              const that = this
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      that.$router.push({name: 'checkDetail', params: {id: params.row.billId}})
                    }
                  }
                }, '查看'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      window.open('https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/downloadbill?billId='+params.row.billId)
                    }
                  }
                }, '缴费账单下载'),
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }, style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      that.modalTitleText = '一键催缴'
                      that.isShowModalThree = true
                      that.powerBillId = params.row.billId
                      that.requestGetWarnPayCountApiFn({billId:params.row.billId})
                    }
                  }
                }, '一键催费')
              ])
            }
          }
        ],
        tableData: [],
        payMentDate: null
      }
    },
    created () {
      // 重置手动缴费页面回显数据
      this.$store.commit('manualPayment/resetData')
      this.requestBillSearchFn({curPage: 1})
    },
    components: {
      PartModal,
      PartPage
    },
    methods: {
      /**
       * 账单列表
       *
       */
      requestBillSearchFn (obj = {}) {
        const that = this
        let params = {
          payStartTime: this.payMentDate !== null ? this.payMentDate[0] : '',
          payEndTime: this.payMentDate !== null ? this.payMentDate[1] : '',
          name: this.billName,
          curPage: this.curPage,
          pageSize: this.pageSize
        }
        if (obj.curPage) {
          params.curPage = obj.curPage
        }
        API.requestBillsearchApi(params).then(function (json) {
          if (json.data.code === '000') {
            let data = json.data.data
            that.tableData = data.items
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
        if (that.powerBillId) {
          params.billId = [that.powerBillId]
        }
        API.requestWarnpayallApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('催缴成功')
            that.requestBillSearchFn()
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 催费条数
       * @param obj
       */
      requestGetWarnPayCountApiFn (obj = {}) {
        const that = this
        let params = {}
        if (that.powerBillId) {
          params.billId = [that.powerBillId]
        }
        API.requestGetWarnPayCountApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.powerBillNum = json.data.data
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      search () {
        this.requestBillSearchFn({curPage: 1})
      },
      changePage (page) {
        console.log('page_' + page)
        this.curPage = page
        this.requestBillSearchFn()
      },
      changePageSize (page) {
        this.pageSize = page
        this.requestBillSearchFn({curPage: 1})
      },
      changeTime (date) {
        console.log(date)
        if (this.payMentDate === null || this.payMentDate.length !== 2) {
          this.payMentDate = []
        } else {
          this.payMentDate = date
        }
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
    ,
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/stylesheets/common.scss';
  .queryBill{
    margin: 0 16px;
    @include clearfix();
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

  .queryBill_tit {
    line-height: 30px;
    margin-top: 10px;
  }

  .queryBill_tit label {
    margin-left: 20px;
  }

  .queryBill_table {
    margin-top: 20px;
  }

  .page {
    float: right;
    margin: 10px 20px 20px 0;
  }

  .color-red {
    color: red;
  }
</style>
