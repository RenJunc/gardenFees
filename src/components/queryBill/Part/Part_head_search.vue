<template>
  <div class="search-wrap">
    <div class="row">
      <label class="row-item">
        <span>学生姓名：</span>
        <Input v-model.trim="childName" placeholder="" style="width: 150px" @on-change="changeNameFn(childName)" />
      </label>
      <PartClassList class="row-item" @changeVal="changeClassFn"></PartClassList>
      <PartPayStauts class="row-item" :setData="setPayStatus" label-text="缴费状态" @changeVal="changeStatusFn" :payType="1"></PartPayStauts>
      <PartPayStauts class="row-item" label-text="收费方式" @changeVal="changeTypeFn" :payType="2"></PartPayStauts>
      <Button type="primary" class="btn search-btn" @click="search">查询</Button>
    </div>
  </div>

</template>

<script>
  import PartClassList from '../../Part/part_class_list_select'
  import PartPayStauts from '../../Part/part_pay_status_type_select'
  export default {
    name: 'part_head_search',
    props:{
      setPayStatus:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        childName:'',
        childPhone:'',
        billTime:'',
        payMentDate:'',
        billList:[
          {
            value: 0,
            label: '账单付款日期'
          }, {
            value: 1,
            label: '账单创建日期'
          }
        ]
      }
    },
    components:{
      PartClassList,
      PartPayStauts
    },
    methods:{
      changeClassFn(val){
        this.$emit('changeClass',val)
      },
      changeStatusFn(val){
        this.$emit('changePayStatus',val)
      },
      changeTypeFn(val){
        this.$emit('changePayType',val)
      },
      changeNameFn(val){
        this.$emit('changeName',val)
      },
      search(val){
        this.$emit('search',val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrap{
    .row {
      padding: 10px 0;
      .row-item{
        padding-left: 20px;
        display: inline-block;
        &:nth-child(1){
          padding: 0;
        }
      }
      label {
        font-size: 0;
        span{
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    .search-btn{
      margin:6px 0 0 20px;
    }

  }
</style>
