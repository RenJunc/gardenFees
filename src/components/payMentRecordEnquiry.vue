<template>
  <div class="payMentRecordEnquiry">
    <h3>缴费记录查询</h3>
    <div class="payMentRecord_tit">
      <label>
        <span>学生姓名</span>
        <Input v-model="childName" placeholder="" style="width: 150px" />
      </label>
      <label>
        <span>班级</span>
        <Select v-model="classId" style="width:150px">
          <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label>
        <span>家长手机号</span>
        <Input v-model="childPhone" placeholder="" style="width: 150px" />
      </label>
      <label>
        <span>缴费单状态</span>
        <Select v-model="billState" style="width:150px">
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label>
        <Select v-model="billTime" style="width:150px">
          <Option v-for="item in billList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label>
        <span>日期</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          style="width: 200px"
          @on-change="changeTime"
          v-model="payMentDate"
        ></DatePicker>
      </label>
      <label>
        <span>收费方式</span>
        <Select v-model="payType" style="width:150px">
          <Option v-for="item in payList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <label>
        <span class="search" @click="search">查询</span>
      </label>
    </div>
    <div class="payMentRecord_sum">
      合计：<span>80</span>笔 <span>12345</span>元
    </div>
    <div class="payMentRecord_table">
      <Table border :columns="columns" :data="list"></Table>
    </div>
    <div class="page">
      <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: "payMentRecordEnquiry",
    data(){
      return {
        childName:'',
        childPhone:'',
        payType:0,
        classId:'',
        classList: [
          {
            value: '0',
            label: '大一班'
          },
          {
            value: '1',
            label: '大二班'
          },
          {
            value: '2',
            label: '大三班'
          },
          {
            value: '3',
            label: '大四班'
          },
          {
            value: '4',
            label: '大五班'
          },
          {
            value: '5',
            label: '大六班'
          }
        ],
        payList:[
          {
            value: 0,
            label: '支付宝缴费'
          }, {
            value: 1,
            label: '现金'
          }, {
            value: 2,
            label: 'POS机'
          }, {
            value: 3,
            label: '银行汇款'
          }, {
            value: 4,
            label: '微信转账'
          }, {
            value: 5,
            label: '支付宝转账'
          }, {
            value: 6,
            label: '其他'
          }
        ],
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
            key: 'childClass'
          },
          {
            title: '家长手机号',
            key: 'parentPhone'
          },
          {
            title: '收费金融（元）',
            key: 'sumPrice'
          },
          {
            title: '账单状态',
            key: 'billState'
          },
          {
            title: '操作',
            key: 'action',
            width: 350,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '催费'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '打印催费单'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '今日已催费')
              ]);
            }
          }
        ],
        data: [
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          },
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          },
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          },
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          },
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          },
          {
            childName: '王小佳1',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState:'发送失败'
          }

        ],
        stateList:[
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '缴费成功'
          }, {
            value: '2',
            label: '代缴费'
          }, {
            value: '3',
            label: '缴费关闭'
          }, {
            value: '4',
            label: '逾期关闭'
          }, {
            value: '5',
            label: '定时发送'
          }, {
            value: '6',
            label: '发送中'
          }, {
            value: '7',
            label: '发送失败'
          }
        ],
        billState:'0',
        total:0,
        pageSize:10,
        list:[],
        payMentDate:null
      }
    },
    methods: {
      change(page){
        this.list = this.data.slice(this.pageSize * (page - 1), this.pageSize * (page - 1) + this.pageSize)
      },
      size(page){
        this.pageSize = page
        this.list = this.data.slice(0,page)
      },
      search(){
        let data ={
          childName:this.childName,
          classId:this.classId,
          childPhone:this.childPhone,
          billTime:this.billTime,
          payType:this.payType,
          payStartTime:this.payMentDate !== null ? this.payMentDate[0] : '',
          payEndTime:this.payMentDate !== null ? this.payMentDate[1] : ''
        }
        console.log(data)
      },
      changeTime(date){
        console.log(date)
        if (this.payMentDate === null || this.payMentDate.length !== 2) {
          this.payMentDate = []
        }else{
          this.payMentDate = date
        }
      },
    },
    mounted(){
      this.total  = this.data.length,
        this.list = this.data.slice(0,this.pageSize)
    }
  }
</script>

<style scoped>
  .payMentRecordEnquiry{
    color: #333;
  }
  h3{
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
  .payMentRecord_tit{
    line-height: 40px;
  }
  .payMentRecord_tit label{
    margin-left: 20px;
  }
  .payMentRecord_sum{
    line-height: 50px;
    overflow: hidden;
    background: #ccc;
    margin: 10px 0px;
    padding-left: 20px;
  }
  .payMentRecord_sum span:nth-child(2){
    margin-left: 10px;
  }
  .page{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>
