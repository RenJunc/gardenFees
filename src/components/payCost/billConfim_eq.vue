<template>
  <div class="billConfim">
    <h3>缴费账单确认</h3>
    <div class="billName">账单名称：{{dataBill.billName}}</div>
    <div class="clear"></div>
    <div class="billConfim_table">
      <!--<Table border :columns="columns" :data="data"></Table>-->
      <table>
        <tr>
          <td class="table_class">班级</td>
          <td class="table_name">幼儿</td>
          <td class="table_phone">家长手机号</td>
          <td v-for="item in billType" class="table_item">
            <span>{{item.name}}</span>
          </td>
          <td class="table_sum">总额</td>
          <td class="table_memo">备注</td>
          <td class="table_edit">操作</td>
        </tr>
        <tr v-for="item,index in dataBill.list" :class="{changeBg:item.studentId === undefined} ">
          <td>
            <span v-if="edit !== index">{{item.className}}</span>
            <span v-else><input type="text" v-model="item.className" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.childName}}</span>
            <span v-else><input type="text" v-model="item.childName" class="billConfim_input"></span>
          </td>
          <td>
            <span v-if="edit !== index">{{item.childPhone}}</span>
            <span v-else><input type="text" v-model="item.childPhone" class="billConfim_input"></span>
          </td>
          <td v-for="option in item.itemArray" class="item_money">
            <span v-if="edit !== index">{{option.money}}</span>
            <span v-else><input type="text" v-model="option.money" onkeyup="value=value.replace(/[^-\d\.]/g,'')"
                                class="billConfim_input"></span>
          </td>
          <td>{{item.billSumPrice}}</td>
          <td>{{item.memo}}</td>
          <td>
            <Button type="success" @click="editInput(index)" v-if="edit !== index">编辑</Button>
            <Button type="success" @click="saveInput(index)" v-else>保存</Button>
            <Button type="error" @click="delBillList(index)">删除</Button>
          </td>
        </tr>
        <tr class="no_tdline">
          <td>合计</td>
          <td>{{sumPerson}}人</td>
          <td v-for="item in billType1" class="table_item">
            <span>{{item}}</span>
          </td>
          <td>{{sumSum}}</td>
        </tr>
      </table>

    </div>
    <div class="bill_period">
      <PartPayStauts class="row-item bill_period_div" v-model="billLimit" label-text="有效期" @changeVal="changeTypeFn"
                     :payType="3"></PartPayStauts>
      <div class="bill_period_btn">
        <Button @click="reimport">重新导入</Button>
        <Button type="primary" @click="send">确认发送</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api/api'
  import PartPayStauts from '../Part/part_pay_status_type_select'

  export default {
    name: 'billConfim',
    data () {
      return {
        data: [],
        billLimit: 0,
        edit: '-1',
        className: '',
        childName: '',
        parentPhone: '',
        sumPrice: '',
        remark: '无',
        byf: '',
        wsf: '',
        billName: '',
        billCloseType: '',
        billStatus: '',
        upload: '',
        billReleaseDatetime: '',
        dataBill: {},
        billType: [],
        billType1: [],
        sumPerson: '',
        billSumPrice: 0,
        sumSum: 0,
        arr: [],
        billOnePrice: 0,
        obj: {},
        stringNull: ''
      }
    },
    components: {
      PartPayStauts
    },
    computed: {
      BILL_IMPORT_DATA: function () {
        return this.$route.params.dataObj
      },
    },
    methods: {
      reimport () {
        this.$router.push({name: 'payCost', params: {modal1: true}})
      },
      totalMoney(){
        const that = this
        let total = 0
        for (let i = 0, length = that.billType1.length; i < length; i++) {
          let item = that.billType1[i]
          total+=(item-0)
        }
        return (total + that.sumSum)
      },
      send () {
        const that = this
        let params = {
          billName: that.BILL_IMPORT_DATA.billName,
          billCloseType: that.BILL_IMPORT_DATA.billCloseType,
          billStatus: that.BILL_IMPORT_DATA.billStatus,
          billReleaseDatetime: that.BILL_IMPORT_DATA.billReleaseDatetime,
          totalMoney: that.totalMoney(),
          list: that.dataBill.list,
        }
        API.requestBillSendApi(params).then((json) => {
          if (json.data.code === '000') {
            that.$Message.success('发送成功')
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      editInput (index) {
        this.edit = index
        this.billSumCunt()
      },
      saveInput (index) {
        this.edit = -1
        this.billSumCunt()
      },
      changeTypeFn (val) {
        console.log(val)
      },
      billSumCunt () {
        this.sumSum = 0
        this.arr = []
        this.billType1 = []
        this.stringNull = ''
        this.billOnePrice = 0
        this.obj = {}
        this.dataBill.list.map((item, idx) => {
          for (let i = 0; i < item.itemArray.length; i++) {
            this.billSumPrice += parseInt(item.itemArray[i].money)
            // this.arr.push(item.itemArray[i].money)
            if (item.itemArray[i].name in this.obj) {
              this.obj[item.itemArray[i].name].push(item.itemArray[i].money)
            } else {
              this.obj[item.itemArray[i].name] = []
              this.obj[item.itemArray[i].name].push(item.itemArray[i].money)
            }
          }
          // this.arr.push(this.billSumPrice)
          this.dataBill.list[idx].billSumPrice = this.billSumPrice
          this.sumSum += parseInt(this.billSumPrice)
          this.billSumPrice = 0
        })

        // this.dataBill.list.forEach((item,idx) => {
        //   for(var j=0;j<item.itemArray.length;j++){
        //     if(item.itemArray[j].name in this.obj){
        //       this.obj[item.itemArray[j].name].push(item.itemArray[j].money)
        //     }else {
        //       this.obj[item.itemArray[j].name] = []
        //       this.obj[item.itemArray[j].name].push(item.itemArray[j].money)
        //     }
        //   }
        // })
        for (var option in this.obj) {
          this.billOnePrice = 0
          for (var m = 0; m < this.obj[option].length; m++) {
            this.billOnePrice += parseInt(this.obj[option][m])
          }
          this.stringNull += '_' + this.billOnePrice
        }
        this.billType1 = this.stringNull.split('_')

      },
      delBillList (index) {
        // console.log(this.billType)
        // this.dataBill.list = this.dataBill.list.splice(index,1)
        this.dataBill.list.splice(index, 1)
        this.sumPerson--
        this.billSumCunt()
      }
    },
    mounted () {
      const that = this
      that.dataBill = that.BILL_IMPORT_DATA
      that.sumPerson = that.dataBill.list.length
      that.billType = JSON.parse(JSON.stringify(that.dataBill.list[0].itemArray))
      that.billSumCunt()
    }
  }
</script>

<style scoped>
  .billConfim{
    margin: 0 16px;
  }
  .billConfim_input {
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
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
    outline: none;
  }

  table {
    border-collapse: collapse;
  }

  td {
    border: 1px solid #eaeff4;
    line-height: 40px;
    text-align: center;
  }

  .billConfim_table table {
    width: 100%;
  }

  h3 {
    line-height: 40px;
    color: #333;
    margin-left: 20px;
  }

  .billName {
    float: right;
    margin-right: 20px;
    color: #333;
  }

  .clear {
    clear: both;
  }

  .billConfim_table {
    margin-top: 10px;
  }

  .bill_period {
    line-height: 40px;
    overflow: hidden;
    padding: 0 20px;
  }

  .bill_period_div {
    display: inline-block;
    float: left;
  }

  .bill_period_div span {
    margin-right: 10px;
  }

  .bill_period_btn {
    display: inline-block;
    float: right;
  }

  .bill_period_btn button:nth-child(1) {
    margin-right: 10px;
  }

  .no_tdline td {
    border: none;
  }

  .table_class {
    width: 120px;
  }

  .table_name {
    width: 120px;
  }

  .table_phone {
    width: 120px;
  }

  .table_item {
    width: 120px;
  }

  .table_sum {
    width: 120px;
  }

  .table_memo {
    width: 200px;
  }

  .table_edit {
    width: 200px;
  }

  .changeBg {
    background: #ffe8e8;
  }
</style>
