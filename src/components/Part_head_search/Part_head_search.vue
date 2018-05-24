<template>
  <div class="search-wrap">
    <div class="row">
      <label class="row-item">
        <span>学生姓名：</span>
        <Input v-model.trim="childName" placeholder="" style="width: 150px" @on-change="changeNameFn(childName)" />
      </label>
      <PartClassList class="row-item" @changeVal="changeClassFn"></PartClassList>
      <label class="row-item">
        <span>家长手机号：</span>
        <Input v-model.trim="childPhone" placeholder="" style="width: 150px" @on-change="changeMobileFn(childPhone)" />
      </label>
      <label class="row-item" v-if="isBill">
        <span>{{bill_name}}</span>
        <span>{{bill_type}}</span>
      </label>
      <PartPayStauts v-else class="row-item" label-text="缴费状态" @changeVal="changeStatusFn" :payType="1"></PartPayStauts>
    </div>
    <div class="row">
      <label class="row-item">
        <span>日期类型：</span>
        <Select v-model="billTime" style="width:150px" @on-change="changeTimeType" >
          <Option v-for="item in billList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label class="row-item">
        <span>日期：</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          style="width: 150px"
          format="yyyy-MM-dd"
          @on-change="changeTime"
          v-model="payMentDate"
        ></DatePicker>
      </label>
      <PartPayStauts class="row-item" label-text="收费方式" @changeVal="changeTypeFn" :payType="2"  v-if="!isClose"></PartPayStauts>
      <label>
        <Button type="primary" class="btn search-btn" @click="search">查询</Button>
      </label>
    </div>
  </div>

</template>

<script>
  import PartClassList from '../Part/part_class_list_select'
  import PartPayStauts from '../Part/part_pay_status_type_select'
  export default {
    name: 'part_head_search',
    props:{
      bill_name:{
        default:'缴费单状态：'
      },
      bill_type:{
        default:'待缴费'
      },
      isBill:{
        type:Boolean
      },
      isClose:{
        type:Boolean
      }
    },
    data(){
      return {
        childName:'',
        childPhone:'',
        billTime:0,
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
      changeMobileFn(val){
        this.$emit('changeMobile',this.childPhone)
      },
      changeNameFn(val){
        // console.log(val);
        this.$emit('changeName',val)
      },
      changeTime(val){
          // console.log('time'+val);
        this.$emit('changeTime',val)
      },
      changeTimeType(val){
          // console.log('time'+val);
        this.$emit('changeTimeType',this.billTime)
      },
      search(val){
          // console.log('time'+val);
        this.$emit('search',val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrap{
    padding: 0 20px;
    .row {
      padding: 10px 0 0 0;
      .row-item{
        font-size: 0;
        padding-left: 20px;
        display: inline-block;
        span{
          font-size: 14px;
          vertical-align: middle;
        }
        &:nth-child(1){
          padding: 0;
        }
      }
    }
    .search-btn{
      margin:6px 0 0 36px;
    }
  }
</style>
