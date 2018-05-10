<template>
    <div class="remind">
      <h3>缴费记录查询</h3>
      <div class="remind_tit">
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
          代缴费
        </label>
        <label>
          <Select v-model="billTime" style="width:150px">
            <Option v-for="item in billList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </label>
        <label>
          <span>日期</span>
          <DatePicker type="daterange"
                      placement="bottom-end"
                      style="width: 200px"
                      v-model="payMentDate"
                      @on-change="changeTime"
                      placeholder="开始日期-结束日期"
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
      <div class="remind_sum">
        <p>合计：<span>80</span>笔 <span>12345</span>元</p>
        <p>一键催费</p>
      </div>
      <div class="remind_table">
        <Table border :columns="columns" :data="list"></Table>
      </div>
      <div class="page">
        <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>
      </div>
      <Modal
        v-model="modal1"
        :title="title"
        :mask-closable = false
        @on-ok="ok">
        <div id="pushFee">
          <p>本次一键催费的账单为10条</p>
          <p>温馨提示：单条账单同一天只能催缴一次！</p>
        </div>
      </Modal>
      <Modal
        v-model="modal2"
        :title="title"
        :mask-closable = false
        @on-ok="ok">
        <div id="detail">
          <p>姓名：{{this.detialData.childName}}</p>
          <p>班级：{{this.detialData.childClass}}</p>
          <p>家长手机号：{{this.detialData.parentPhone}}</p>
          <p>收费总额：{{this.detialData.sumPrice}}</p>
        </div>
        <div slot="footer">
          <Button type="success" @click="closeModel">关闭</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
	export default {
		name: "remind",
    data(){
		  return {
        payMentDate:null,
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
                      this.modal2 = true
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
                      this.modal1 = true
                      this.rushFee(params.index)
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
                      // this.remove(params.index)
                    }
                  }
                }, '打印催费单'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:true
                  },style: {
                    marginRight: '5px',
                    display:'none'
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
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
            billState: '待缴费'
          },
          {
            childName: '王小佳2',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState: '待缴费'
          },
          {
            childName: '王小佳3',
            childClass: 18,
            parentPhone:'17710320074',
            sumPrice:'1000',
            billState: '待缴费'
          }
        ],
        list:[],
        pageSize:10,
        total:0,
        modal1:false,
        modal2:false,
        title:'',
        detialData:{}
      }
    },
    methods: {
      show (index) {
        this.detialData = this.list[index]
        console.log(this.detialData)
        this.title = '记录详情'
      },
      rushFee (index) {
        this.title = '一键催费'
      },
      changeTime(date){
        console.log(date)
        if (this.payMentDate === null || this.payMentDate.length !== 2) {
          this.payMentDate = []
        }else{
          this.payMentDate = date
        }
      },
      search(){
        let data = {
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
      change(page){
        this.list = this.data.slice(this.pageSize * (page - 1), this.pageSize * (page - 1) + this.pageSize)
      },
      size(page){
        this.pageSize = page
        this.list = this.data.slice(0,page)
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      closeModel(){
        this.modal2 = false
      }
    },
    mounted(){
      this.total  = this.data.length,
        this.list = this.data.slice(0,this.pageSize)
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
  .remind_tit{
    line-height: 40px;
  }
  .remind_tit label{
    margin-left: 20px;
  }
  .remind_sum{
    line-height: 50px;
    overflow: hidden;
    background: #ccc;
    margin: 10px 0px;
  }
  .remind_sum p{
    display: inline-block;
  }
  .remind_sum p:nth-child(1){
    margin-left: 20px;
  }
  .remind_sum p:nth-child(1) span:nth-child(2){
    margin-left: 10px;
  }
  .remind_sum p:nth-child(2){
    margin-right: 20px;
    width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: #32c296;
    border-radius: 4px;
    margin-top: 9px;
    cursor: pointer;
    float: right;
  }
  .page{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>
