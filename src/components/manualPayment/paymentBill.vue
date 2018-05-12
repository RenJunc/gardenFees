<template>
  <div class="paymentBill">
    <h3>缴费账单确认</h3>
    <div class="billName">账单名称：2018年4月学杂费</div>
    <div class="clear"></div>
    <div class="billConfim_table">
      <Table border :columns="columns" :data="data"></Table>
    </div>
    <div class="combined">
      合计
    </div>
    <div class="bill_period">
      <div class="bill_period_div">
        <span>有效期</span>
        <Select v-model="billLimit" style="width:160px">
          <Option v-for="item in limitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="bill_period_btn">
        <Button @click="reimport">上一步</Button>
        <Button type="primary" @click="send">确认发送</Button>
      </div>
    </div>
    <Modal
      v-model="modal1"
      title="温馨提示"
      ok-text="导入"
      cancel-text="关闭"
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>150个幼儿未入学生档案，您是否将幼儿基础信息导入到学生档案里！</p>
      <p>未入学生档案的家长在缴费时只能在支付宝APP缴费，不能在智慧树APP缴费</p>
      <p>建议您导入学生档案，以便日后园所的管理</p>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "paymentBill",
    data () {
      return {
        columns: [
          {
            title: '班级',
            key: 'className'
          },
          {
            title: '幼儿',
            key: 'childName'
          },
          {
            title: '家长手机号',
            key: 'parentPhone'
          } ,
          {
            title: '保育费',
            key: 'byf'
          },
          {
            title: '卫生费',
            key: 'wsf'
          },
          {
            title: '总额',
            key: 'sumPrice'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [
          {
            className: '二班',
            childName:'王小佳1',
            parentPhone:'17710320074',
            sumPrice:'200',
            wsf:'10',
            byf:'10',
            remark: '四月新生'
          },
          {
            className: '二班',
            childName:'王小佳2',
            parentPhone:'17710320074',
            sumPrice:'200',
            wsf:'100',
            byf:'50',
            remark: '四月新生'
          },
          {
            className: '二班',
            childName:'王小佳3',
            parentPhone:'17710320074',
            sumPrice:'200',
            wsf:'40',
            byf:'20',
            remark: '四月新生'
          }
        ],
        billLimit:'0',
        limitList:[{
          value: '0',
          label: '永久'
        }, {
          value: '1',
          label: '两周'
        }, {
          value: '2',
          label: '一个月'
        }, {
          value: '3',
          label: '三个月'
        }],
        modal1:false
      }
    },
    methods: {
      remove (index) {
        this.data6.splice(index, 1);
      },
      reimport(){
        // this.$router.push({name:"payCost",params:{modal1:true}})
        history.go(-1)
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      },
      send(){
        this.modal1 = true
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
  .billName{
    float: right;
    margin-right: 20px;
    color: #333;
  }
  .clear{
    clear: both;
  }
  .billConfim_table{
    margin-top: 10px;
  }
  .combined{
    line-height: 40px;
  }
  .bill_period{
    line-height: 40px;
    overflow: hidden;
    padding: 0 20px;
  }
  .bill_period_div{
    display: inline-block;
    float: left;
  }
  .bill_period_div span{
    margin-right: 10px;
  }
  .bill_period_btn{
    display: inline-block;
    float: right;
  }
  .bill_period_btn button:nth-child(1){
    margin-right: 10px;
  }
</style>
