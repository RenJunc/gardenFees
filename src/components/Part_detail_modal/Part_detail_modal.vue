<template>
  <div>
    <Modal
      v-model="modal1"
      :title="titleText"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="main">
        <div class="row"><span class="label-span">记录编号：</span><span>{{data.serial}}</span></div>
        <div class="row"><span class="label-span">账单名称：</span><span>{{data.fname}}</span></div>
        <div class="row"><span class="label-span">学生姓名：</span><span>{{data.childName}}</span></div>
        <div class="row"><span class="label-span">班级名称：</span><span>{{data.className}}</span></div>
        <div class="row"><span class="label-span">家长手机号：</span><span>{{data.childPhone}}</span></div>
        <div class="row"><span class="label-span">收费金额（元）：</span><span>{{data.total}}</span></div>
        <div class="row"><span class="label-span">账单详情：</span>
          <div class="table-box">
            <div class="title-box"><span>项目</span><span>金额（元）</span></div>
            <div v-for="item in data.itemsContent"><span>{{item.name}}</span><span>{{item.money}}</span></div>
          </div>
        </div>
        <div class="row memo-box"><span class="label-span">备注：</span><span class="memo-span">{{data.memo}}</span></div>
        <div class="row"><span class="label-span">账单状态：</span><span>{{data.theStatus | statusText}}{{data.payType | thePayTypeText}}</span></div>
        <div class="pay-type-box" v-if="isEditPayType">
          <PartPayStauts :setData="setPayType" class="row-item" label-text="收费方式" @changeVal="changeTypeFn" :payType="2"></PartPayStauts>
        </div>
        <div class="row"><span class="label-span">创建时间：</span><span>{{data.releaseDatetimeStr}}</span></div>
        <div class="row"><span class="label-span">到期日期：</span><span>{{data.closeDatetimeStr}}</span></div>
        <div class="row" v-if="!isEditPayType"><span class="label-span">付款时间：</span><span>{{data.payDatetimeStr}}</span></div>
        <div class="row" v-if="!isEditPayType && this.data.orderNo !=='fail'"><span class="label-span">支付订单号：</span><span>{{data.orderNo}}</span></div>
        <div class="row hint-box" v-if="isEditPayType"><Icon type="information-circled"></Icon><span class="label-span hint-text">请确认已通过其他方式收取该笔账单的缴费金额后进行该操作！</span></div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import PartPayStauts from '../Part/part_pay_status_type_select'

  export default {
    name: 'part_modal',
    props: {
      isShow: {
        type: Boolean,
        default: false,
      },
      titleText: {
        type: String,
        default: '',
      },
      isEditPayType: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      setPayType:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        modal1: this.isShow,
        payType: ''
      }
    },
    components: {
      PartPayStauts
    },
    filters: {
      statusText (status) {
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
    },
    watch: {
      isShow: function (val) {
        this.modal1 = val
      }
    },
    methods: {
      changeTypeFn (val) {
        this.payType = val
      },
      ok () {
        const that = this
        if (!that.payType) {
          this.$emit('clickOk')
          return false
        }
        this.$emit('clickOk',{payId:that.data.payId,total: that.data.total,payType:that.payType})
      },
      cancel () {
        this.$emit('clickCancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    font-size: 14px;
    padding: 0 30px;
    .row{
      padding: 2px 0;
      .label-span {
        display: inline-block;
        min-width: 120px;
        text-align: right;

      }
      .table-box {
        border: 1px solid #dddee1;
        border-radius: 4px;
        width: 200px;
        overflow: hidden;
        margin-left: 120px;
        div {
          border-bottom: 1px solid #dddee1;
          span {
            display: inline-block;
            width: 50%;
            text-align: center;
            &:nth-child(1) {
              border-right: 1px solid #dddee1;
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
        .title-box {
          background: #eee;
        }
      }
    }
    .memo-box{
      display: flex;
      .memo-span{
        flex: 1;
        display: inline-block;
      }
    }
    .hint-box{
      margin-left: 20px;
      .hint-text{
        color: red;
      }
    }
    .pay-type-box {
      display: inline-block;
      padding-left: 50px;
    }
  }
</style>
