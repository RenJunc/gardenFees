<template>
  <div class="collec">
    <h3>缴费记录查询</h3>
    <PartSearch
      @changeClass="changeClassFn"
      @changePayType="changePayTypeFn"
      @changeMobile="changeMobileFn"
      @changeName="changeNameFn"
      @changeTime="changeTimeFn"
      @changeTimeType="changeTimeType"
      :isBill="true"
      :bill_name="bill_name"
      :bill_type="bill_type"
      @search="searchFn">
    </PartSearch>
    <div class="collec_sum">
      合计：<span>{{payListNew.payCount}}</span>笔 <span>{{payListNew.totalMoney}}</span>元
    </div>
    <div class="collec_table">
      <Table border :columns="columns" :data="payListNew.items"></Table>
    </div>
    <div class="page">
      <!--<Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>-->
      <PartPage :tableData="tableData" :total="total" :current="curPage" :page-size="pageSize"
                @changePage="changePage" @changePageSize="changePageSize"></PartPage>
    </div>
    <!--账单详情弹窗-->
    <PartDetailModal :isEditPayType="isEditPayType" :data="detailData" @clickOk="clickOkFn" @clickCancel="clickCancelFn"
                     :title-text="modalTitleText" :is-show="isShowModal"></PartDetailModal>
  </div>
</template>

<script>
  import API from '../../api/api'
  import PartSearch from '../Part_head_search/Part_head_search'
  import PartPage from '../Part/part_page'
  import PartDetailModal from '../Part_detail_modal/Part_detail_modal'
  export default {
    name: "collec",
    data(){
      return {
        isEditPayType: false,
        isShowModal: false,
        modalTitleText: '',
        detailData:{},
        childName:'',
        childPhone:'',
        payType:'',
        classId:'',
        billTime:0,
        billList:[
          {
            value: 0,
            label: '账单付款日期'
          }, {
            value: 1,
            label: '账单创建日期'
          }
        ],
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
            render:(h,params) => {
              return h('span',{
                style:{
                  color: this.billStatusColor(params.row.theStatus)
                }
              },  this.theStatusText(params.row.theStatus)  + this.thePayTypeText(params.row.payType));
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 350,
            align: 'center',
            render: (h, params) => {
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
                      this.requestPaydetailApiFn({payId: params.row.payId})
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
                  },style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      // console.log(params.row.payId)
                      window.open('https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/billpayprint?detailIds='+params.row.payId)
                    }
                  }
                }, '打印收据')
              ]);
            }
          }
        ],
        list:[],
        title:'',
        total:0,
        pageSize:10,
        curPage:1,
        payListNew:{},
        bill_name:'账单状态：',
        bill_type:'缴费成功',
        releaseDatetimeBegin:'',
        releaseDatetimeEnd:'',
        payDatetimeStrart:'',
        payDatetimeEnd:''
      }
    },
    created(){
      this.requestPaylistApi({curPage:1})
    },
    components:{
      PartSearch,
      PartDetailModal,
      PartPage
    },
    computed: {
      tableData: function () {
        return this.payListNew.items
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
      requestPaylistApi(obj={}){
        let params ={
          curPage: this.curPage,
          pageSize: this.pageSize,
          childName:this.childName,
          childPhone:this.childPhone,
          classId:this.classId,
          payStatus:9,
          payType:this.payType,
          releaseDatetimeBegin:this.releaseDatetimeBegin,
          releaseDatetimeEnd:this.releaseDatetimeEnd,
          payDatetimeStrart:this.payDatetimeStrart,
          payDatetimeEnd:this.payDatetimeEnd
        }
        if(this.billTime === 0){
          delete params.releaseDatetimeBegin
          delete params.releaseDatetimeEnd
        }else{
          delete params.payDatetimeStrart
          delete params.payDatetimeEnd
        }
        if (obj.curPage) {
          params.curPage = obj.curPage
        }
        API.requestPaylistApi(params).then(json => {
          if(json.data.code==='000'){
            let data = json.data.data;
            this.payListNew = data;
            this.pageSize = data.pageSize
            this.total = data.count
            this.curPage = data.curPage
          }else {
            console.log(json.data.msg);
          }
        }).catch((error) => {
          console.log(error)
        })
      },/*
      show(index){
        this.detialData = this.payListNew.items[index]
        this.title = '记录详情'
      },*/
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
      printBill(){
        console.log("打印账单")
      },
      clickOkFn (obj) {
        this.isShowModal = false
        this.isEditPayType = false
        // if (obj) {
        //   console.log('更改付费方式' + JSON.stringify(obj))
        //   this.requestOtherPayTypeApiFn(obj)
        // }
      },
      // 查看账单详情确认弹窗
      clickCancelFn () {
        this.isShowModal = false
        this.isEditPayType = false
      },
      changePage (page) {
        this.curPage = page
        this.requestPaylistApi()
      },
      changePageSize (page) {
        this.pageSize = page
        this.requestPaylistApi({curPage: 1})
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
      changeTimeFn(date){
        console.log(date)
        this.releaseDatetimeBegin = date[0]
        this.releaseDatetimeEnd = date[1]
        this.payDatetimeStrart = date[0]
        this.payDatetimeEnd = date[1]
      },
      changePayTypeFn(val){//收费方式
        this.payType = val
      },
      changeClassFn(val){//班级
        this.classId = val
      },
      changePayStatusFn(val){
        console.log('changePayStatusFn'+val);
      },
      changeNameFn(val){//学生姓名
        this.childName = val
      },
      searchFn(val){
        this.requestPaylistApi()
      },
      changeMobileFn(val){//手机号
        this.childPhone = val
      },
      changeTimeType(val){//日期类型
        this.billTime = val
      },
    }
  }
</script>

<style scoped>
  .collec{
    margin: 0 16px;
  }
  h3{
    font-size: 16px;
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
  .collec_tit{
    line-height: 40px;
  }
  .collec_tit label{
    margin-left: 20px;
  }
  .collec_sum{
    line-height: 50px;
    overflow: hidden;
    margin: 10px 0px;
    padding-left: 20px;
    font-size: 14px;
  }
  .collec_sum span{
    font-weight: bold;
    font-size: 20px;
  }
  .collec_sum span:nth-child(2){
    margin-left: 10px;
  }
  .page{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
  .phone_input{
    display: inline-block;
    width: 150px;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    outline: none;
  }
  .ivu-modal-footer button{
    background: #32c296;
  }
  .ivu-btn-primary{
    background: #32c296;

  }
</style>
