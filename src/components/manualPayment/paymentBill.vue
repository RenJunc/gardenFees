<template>
  <div class="paymentBill">
    <h3>缴费账单确认</h3>
    <div class="billName">账单名称：{{this.$route.params.billName}}</div>
    <div class="clear"></div>
    <div class="billConfim_table">
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
        <tr v-for="item,index in dataBill.list" :class="{changeBg:item.studentId === undefined} " >
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
          <td v-for="option in item.itemArray" class="item_money" >
            <span v-if="edit !== index">{{option.money}}</span>
            <span v-else><input type="text" v-model="option.money" onkeyup="value=value.replace(/[^-\d\.]/g,'')" class="billConfim_input"></span>
          </td>
          <td>{{item.billSumPrice || item.total}}</td>
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
          <td v-if="!showTd"></td>
          <td v-for="item in billType1" class="table_item">
            <span>{{item}}</span>
          </td>
          <td>{{sumSum}}</td>
        </tr>
      </table>
    </div>
    <div class="bill_period">
      <div class="bill_period_div">
        <span>账单期限：</span>
        <Select v-model="billCloseType" style="width:300px">
          <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <!--<PartPayStauts class="row-item bill_period_div" v-model="billLimit" label-text="有效期" @changeVal="changeTypeFn" :payType="3"></PartPayStauts>-->
      <div class="bill_period_btn">
        <Button @click="reimport">上一步</Button>
        <Button type="primary" @click="send">确认发送</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../api/api'
  export default {
    name: "paymentBill",
    data () {
      return {
        billCloseType:0 || this.$route.params.billCloseType,
        billType:[],
        dataBill:{},
        billType1:[],
        sumPerson:'',
        sumSum:0,
        options:[],
        edit:-1,
        billSumPrice:0,
        type:1,
        billOnePrice:0,
        stringNull:'',
        obj:0,
        billUnde:[],
        showTd:false
      }
    },
    computed:{

    },
    methods: {
      reimport(){
        this.$router.go(-1)
      },
      send(){
        this.dataBill.totalMoney = this.sumSum
        API.requestBillSendApi(this.dataBill).then((json)=>{
          if(json.data.code === "000"){
            // alert('成功了')
            // this.$router.push({name:"payMentRecordEnquiry"})
            window.location.href='http://auction-static.bbtree.com/pc/gradenfees/index.html#/payMentRecordEnquiry'
            this.$store.commit('manualPayment/resetData')

          }else{
            console.log(json.data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      changeTypeFn(val){
        // console.log(val)
        this.billLimit = val
      },
      editInput(index){
        this.edit = index
        this.billSumCunt()
      },
      saveInput(index){
        this.edit = -1;
        this.billSumCunt()
      },
      billSumCunt(){
        this.sumSum = 0
        this.billType1 = []
        this.stringNull = ""
        this.billOnePrice = 0
        this.obj = {}
        // console.log(this.dataBill.list)
        this.dataBill.list.map((item,idx) => {
          for(let i=0;i<item.itemArray.length;i++){
            this.billSumPrice += parseInt(item.itemArray[i].money)
            if(item.itemArray[i].name in this.obj){
              this.obj[item.itemArray[i].name].push(item.itemArray[i].money)
            }else {
              this.obj[item.itemArray[i].name] = []
              this.obj[item.itemArray[i].name].push(item.itemArray[i].money)
            }
          }
          this.dataBill.list[idx].billSumPrice = this.billSumPrice
          if(this.dataBill.list[idx].billSumPrice){
            this.sumSum += parseInt(this.dataBill.list[idx].billSumPrice)
          }else {
            this.sumSum += parseInt(item.total)
          }
          // console.log(this.billSumPrice)
          this.billSumPrice = 0

        })
        for(var option in this.obj){
          this.billOnePrice = 0
          for(var m=0;m<this.obj[option].length;m++){
            this.billOnePrice += parseInt(this.obj[option][m])
          }
          this.stringNull +='_'+this.billOnePrice
        }
        this.billType1 = this.stringNull.split('_')

      },
      delBillList(index){
        this.dataBill.list.splice(index, 1)
        this.sumPerson --
        this.billSumCunt()
      }
    },
    mounted(){
      // console.log(this.$route.path)
      API.requestBillStatusListApi({type:3}).then((json) => {
        if(json.data.code === "000"){
          this.options = json.data.data
        }else{
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
      let data = {
        billName : this.$route.params.billName,
        billCloseType : this.$route.params.billCloseType,
        billMemo : this.$route.params.billMemo,
        billTotal:this.$route.params.billTotal,
        type:this.$route.params.type || this.type,
        childList:this.$route.params.childList,
        classList:this.$route.params.classList,
        itemArray:this.$route.params.itemArray
      };
      if(this.$route.params.type === 2 || this.$route.params.type === 3){
        delete data.classList
      }else{
        delete data.childList
      }
      // console.log(data)
      API.requestBillCreateApi(data).then((json)=>{
        if(json.data.code === "000"){
          this.dataBill = json.data.data
          this.sumPerson = this.dataBill.list.length
          console.log(this.sumPerson)
          if(this.dataBill.list[0].itemArray !== undefined){
            this.billType = JSON.parse(JSON.stringify(this.dataBill.list[0].itemArray))
            this.billSumCunt()
            this.showTd = true

          }else{
            this.sumSum = this.dataBill.list[0].total * this.dataBill.list.length
          }

        }else{
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style scoped>
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

  table{
    border-collapse: collapse;
  }
  td{
    border:1px solid #eaeff4;
    line-height: 40px;
    text-align: center;
  }
  .billConfim_table table{
    width: 100%;
  }
  .table_class{
    width: 120px;
  }
  .table_name{
    width: 120px;
  }
  .table_phone{
    width: 120px;
  }
  .table_item{
    width: 120px;
  }
  .table_sum{
    width: 120px;
  }
  .table_memo{
    width: 200px;
  }
  .table_edit{
    width: 200px;
  }
  .changeBg{
    background: #ffe8e8;
  }

  .no_tdline td{
    border:none;
  }
</style>
