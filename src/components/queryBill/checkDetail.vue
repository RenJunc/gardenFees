<template>
    <div class="checkDetail">
      <h3>查看详情</h3>
      <div class="checkDetail_tit">
        <label>
          <span>账单名称</span>2018年上半年学费
        </label>
        <label>
          <span>账单创建时间</span>2018-04-10 16：40：44
        </label>
        <label>
          <span>账单到期日期</span>2018-04-10
        </label>
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
          <span>缴费单状态</span>
          <Select v-model="billState" style="width:150px">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </label>
        <label>
          <span>收费方式</span>
          <Select v-model="payType" style="width:150px">
            <Option v-for="item in payList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </label>
        <label>
          <span class="search">查询</span>
        </label>
      </div>
      <div class="checkDetail_btn">
        <Button @click="allClose">一键关闭</Button>
        <Button type="primary" @click="allFees">全部催费</Button>
      </div>
      <div class="checkDetail_sum">
        合计：<span>80</span>笔 <span>12345</span>元
      </div>
      <div class="checkDetail_table">
        <Table border :columns="columns" :data="data"></Table>
      </div>
      <div class="page">
        <Page :total="40" size="small" show-elevator show-sizer></Page>
      </div>
    </div>
</template>

<script>
	export default {
		name: "checkDetail",
    data(){
		  return {
        childName:'',
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
        payType:0,
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
            title: '收费金融（元）',
            key: 'sumPrice'
          },
          {
            title: '账单状态',
            key: 'billState'
          },
          {
            title: '截止时间',
            key: 'endTime'
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
                }, '其它方式收费'),
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
                }, '关闭'),
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
                }, '打印收据'),
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
            endTime:'2018-04-10 16：40：44',
            sumPrice:'1000',
            billState:'待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            endTime:'2018-05-05 16：40：44',
            sumPrice:'1000',
            billState:'缴费成功（现金）'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            endTime:'2018-04-12 16：40：44',
            sumPrice:'1000',
            billState:'发送失败'
          }
        ],
      }
    },
    methods:{
      allClose(){

      },
      allFees(){

      }
    }
	}
</script>

<style scoped>
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
  .checkDetail_tit{
    line-height: 40px;
  }
  .checkDetail_tit label{
    margin-left: 20px;
  }
  .checkDetail_tit label span{
    margin-right: 10px;
  }
  .checkDetail_btn{
    margin: 10px 0px;
  }
  .checkDetail_btn button{
    margin-left: 10px;
  }
  .checkDetail_sum{
    line-height: 50px;
    overflow: hidden;
    background: #ccc;
    margin: 10px 0px;
    padding-left: 20px;
  }
  .checkDetail span:nth-child(2){
    margin-left: 10px;
  }
  .checkDetail_table{
    margin: 10px 0px;
  }
  .page{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>
