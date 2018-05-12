<template>
  <div class="billConfim">
    <h3>缴费账单确认</h3>
    <div class="billName">账单名称：2018年4月学杂费</div>
    <div class="clear"></div>
    <div class="billConfim_table">
      <!--<Table border :columns="columns" :data="data"></Table>-->
      <table>
        <tr>
          <td class="bill_tab_class">班级</td>
          <td class="bill_tab_name">幼儿</td>
          <td class="bill_tab_phone">家长手机号</td>
          <td class="bill_tab_list">卫生费</td>
          <td class="bill_tab_list">保育费</td>
          <td class="bill_tab_sum">总额</td>
          <td class="bill_tab_remark">备注</td>
          <td class="bill_tab_action">操作</td>
        </tr>
        <tr v-for="item,index in data" >
          <td>
            <span v-if="edit !== index">{{item.className}}</span>
            <span v-else><input type="text" v-model="item.className" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.childName}}</span>
            <span v-else><input type="text" v-model="item.childName" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.parentPhone}}</span>
            <span v-else><input type="text" v-model="item.parentPhone" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.wsf}}</span>
            <span v-else><input type="text" v-model="item.wsf" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.byf}}</span>
            <span v-else><input type="text" v-model="item.byf" class="billConfim_input"></span>
          </td>
          <td>{{item.sumPrice}}</td>
          <td>{{item.remark}}</td>
          <td>
            <Button type="success" @click="editInput(index)" v-if="edit !== index">编辑</Button>
            <Button type="success" @click="saveInput(index)" v-else>保存</Button>
            <Button type="error" @click="delBill(index)">删除</Button>
          </td>
        </tr>
        <tr class="no_tdline">
          <td>合计</td>
          <td>5人</td>
          <td></td>
          <td>200</td>
          <td>300</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="bill_period">
      <div class="bill_period_div">
        <span>有效期</span>
        <Select v-model="billLimit" style="width:160px">
          <Option v-for="item in limitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="bill_period_btn">
        <Button @click="reimport">重新导入</Button>
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
    name: "billConfim",
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
          },
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
          },
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
          },
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
          },
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
          }
        ],
        billLimit:'0',
        limitList:[
          {
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
        modal1:false,
        edit:'-1',
        className:'',
        childName:'',
        parentPhone:'',
        sumPrice:'',
        remark:'无',
        byf:'',
        wsf:''
      }
    },
    methods: {
      remove (index) {
        this.data6.splice(index, 1);
      },
      reimport(){
        this.$router.push({name:"payCost",params:{modal1:true}})
      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      },
      send(){
        this.modal1 = true
      },
      editInput(index){
        console.log(index)
        this.edit = index
      },
      saveInput(index){
        console.log(index)
        this.edit = -1
      },
      delBill(index){
        console.log(index)
        this.data.splice(index,1)
        console.log(this.data)
      }
    }
  }
</script>

<style scoped>
  .bill_tab_class{
    width: 120px;
  }
  .bill_tab_name{
    width: 120px;
  }
  .bill_tab_phone{
    width: 130px;
  }
  .bill_tab_sum{
    width: 120px;
  }
  .bill_tab_remark{
    width: 200px;
  }
  .bill_tab_action{
    width: 150px;
  }
  .bill_tab_list{
    width: 130px;
  }
  .billConfim_input{
    display: inline-block;
    width: 90px;
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
  table{
    border-collapse: collapse;
  }
  td{
    border:1px solid #ccc;
    line-height: 40px;
    text-align: center;
  }
  .billConfim_table table{
    width: 100%;
  }
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
  .no_tdline td{
    border:none;
  }
</style>
