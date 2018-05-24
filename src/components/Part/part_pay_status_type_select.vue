<template>
  <div class="pay_status_type_select">
    <label>
      <span class="label-text" :style="{width:labW}">{{labelText}}：</span>
      <Select v-model="val" style="width:150px" @on-change="changeVal">
        <Option v-for="item in dataArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </label>
  </div>
</template>

<script>
  import API from '../../api/api'

  export default {
    name: '',
    data () {
      return {
        listData: [],
        val: this.setData
      }
    },
    props: {
      payType: {
        type: Number,
        default: 1, // 1：缴费状态； 2：收费方式； 3：账单到期类型
      },
      labelText: {
        type: String,
        default: ''
      },
      setData:{
        type: String,
        default:''
      },
      labW:{
        type: String,
        default:''
      }
    },
    watch:{
      setData:function (val) {
        this.val = val
      }
    },
    created () {
      const that = this
      let params = {
        type: that.payType
      }
      API.requestBillStatusListApi(params).then(function (json) {
        if (json.data.code === '000') {
          that.listData = json.data.data
        } else {
          console.log(json.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    computed: {
      dataArr: function () {
        if (!this.listData.length) {
          return []
        }
        this.listData.unshift({value: '', label: '全部'})
        return this.listData.map(function (item) {
          return {
            value: item.value + '',
            label: item.label
          }
        })
      }
    },
    methods: {
      changeVal (val) {
        console.log('changeVal_' + val)
        this.$emit('changeVal', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay_status_type_select {
    display: inline-block;
    label {
      display: inline-block;
      font-size: 0;
      .label-text {
        font-size: 14px;
        vertical-align: middle;
        width: 84px;
        display: inline-block;
        text-align: right;
      }
    }
  }
</style>
