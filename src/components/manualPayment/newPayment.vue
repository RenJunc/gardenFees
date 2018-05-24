<template>
  <div class="newPayment">
    <div class="selectChild classPayMent">
      <label>
        <span><b class="xin">*</b>录入新生：</span>
        <PartSearchInput1 :newType="newType" placeholder="录入班级" @inputContext="inputContextFn" @inputVal="inputValFn" ref="PartSearchInput" ></PartSearchInput1>
      </label>
      <label>
        <!--<Input v-model="childName" placeholder="幼儿姓名" style="width: 150px"/>-->
        <input type="text" placeholder="幼儿姓名" v-model="childName"  class="searchInput">
      </label>
      <label>
        <input type="text" placeholder="家长手机号" v-model="childPhone" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11" class="searchInput">
        <!--<Input v-model="childPhone" placeholder="家长手机号" style="width: 150px"/>-->
      </label>
      <label>
        <em class="new_add" @click="addNewChild">
          <Icon type="plus-round"></Icon>
        </em>
      </label>
    </div>
    <div class="childList">
      <div class="childListDiv" ref="listcheck"  v-if="childList.length > 0">
        <ul>
          <li v-for="item,index in childList"><b>{{item.childName}}</b><b>{{item.className}}</b><em @click="delChild(index)"><Icon type="close-circled"></Icon></em></li>
        </ul>
      </div>
      <em @click="checkboxdown()">
        <Icon type="ios-arrow-down" v-if="childList.length>8 && iconselect == 1" ></Icon>
      </em>
      <em @click="checkboxup()">
        <Icon type="ios-arrow-up" v-if="childList.length>8 && iconselect == 2"></Icon>
      </em>
    </div>
    <div class="billName classPayMent">
      <span><b class="xin">*</b>账单名称：</span>
      <Input v-model="billName" placeholder="如2018年4托费" style="width: 300px"/>
    </div>
    <div class="classPayMent">
      <span>备注：</span>
      <Input v-model="billMemo" placeholder="最多100个字符." style="width:300px"/>
    </div>
    <div class="classPayMent"><span>
      <b class="xin">*</b>账单期限：</span>
      <Select v-model="billCloseType" style="width:300px">
        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="classPayMent"><span>
      <b class="xin">*</b>收费总额：</span>
      <input type="text" v-model="billTotal" onkeyup="value=value.replace(/[^-\d\.]/g,'')" class="sumInput">
      元
    </div>
    <div class="classPayMent"><span>
      收费详情：</span>
      <ul class="details_ul">
        <li v-for="item,index in itemArray">
          <p><input type="text" v-model="item.name" placeholder="输入收费项目"></p>
          <p><input type="text" v-model="item.money" onkeyup="value=value.replace(/[^-\d\.]/g,'')"
                    @blur="sumPriceC"/></p>
          <p @click="delCharge(index)">
            <em>
              <Icon type="ios-minus-empty"></Icon>
            </em>
          </p>
        </li>
        <li class="addChargeList">
          <p><input type="text" v-model="createdobj.name" placeholder="输入收费项目"></p>
          <p><input type="text" v-model="createdobj.money" placeholder="输入收费金额" onkeyup="value=value.replace(/[^-\d\.]/g,'')" @blur="createSum"></p>
          <p @click="addCharge">
            <em>
              <Icon type="ios-plus-empty"></Icon>
            </em>
          </p>
        </li>
      </ul>
      <div class="pub_confirm">
        <i @mouseover="onMouseOver" @mouseleave="onMouseLeave"><Icon type="help-circled"></Icon></i>
        <p class="confirm_p" ref="confirm_p">温馨提示：<br>收费项可以填加多个，现有收费项目名称可修改，如<em style="color: dodgerblue;font-style: normal">伙食费改成书费</em>；退费可金额添加负数如-200</p>
      </div>
    </div>
    <div class="btn-box">
      <div class="conmit">带*为必填项</div>
      <Button type="primary" @click="nextBill" class="next">下一步</Button>
    </div>

  </div>
</template>

<script>
  import API from '../../api/api'
  // import PartSearchInput from './Part/Part_search_input'
  import PartSearchInput1 from './Part/Part_search_input1'
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    name: "newPayment",
    data(){
      return {
        childName:'',
        childPhone:'',
        createdobj: {},
        childList:[],
        iconselect:1,
        billName:'',
        billMemo:'',
        options: [],
        billCloseType:'0',
        billTotal:'',
        itemArray: [],
        childNewList:{},
        newType:3,
        // newObj :{},
        inputVal:'',
        newItemArray:[],
        creaMoney:0
      }
    },
    components:{
      // PartSearchInput,
      PartSearchInput1
    },
    computed: {
      ...mapGetters('manualPayment', ['getNewPaymentData'])
    },
    methods: {
      checkboxdown() {
        this.$refs.listcheck.style.height = 'auto';
        this.iconselect = 2
      },
      checkboxup() {
        this.$refs.listcheck.style.height = 80 + 'px';
        this.iconselect = 1
      },
      addCharge() {
        //判断一下在添加，都不让为空
        if (!this.createdobj.money) {
          this.createdobj.money = 0
        }
        this.itemArray.push(this.createdobj)
        this.billTotal = 0
        this.itemArray.forEach(item => {
          this.billTotal += parseFloat(item.money)//item.money*1
        })
        console.log(this.itemArray)
        this.createdobj = {}
      },
      delCharge(index) {
        this.itemArray.splice(index, 1)
        let priceSum = 0;
        this.itemArray.forEach( item => {
          if(item.money === ""){
            item.money = 0
          }
          priceSum += Number(item.money)
        });
        if(this.createdobj.money === undefined){
          this.creaMoney = 0
        }else{
          this.creaMoney= this.createdobj.money
        }
        this.billTotal = parseInt(this.creaMoney) + priceSum
      },
      sumPriceC() {
        let priceSum = 0;
        this.itemArray.forEach( item => {
          if(item.money === ""){
            item.money = 0
          }
          priceSum += Number(item.money)
        });
        this.billTotal = priceSum
      },
      createSum(){
        let priceSum = 0;
        this.itemArray.forEach( item => {
          if(item.money === ""){
            item.money = 0
          }
          priceSum += Number(item.money)
        });
        this.billTotal = parseInt(this.createdobj.money) + priceSum
        this. newItemArray.push({
          name:this.createdobj.name || '收费项目',
          money:this.createdobj.money
        })
      },
      onMouseOver(){
        this.$refs.confirm_p.style.display = 'block';
      },
      onMouseLeave(){
        this.$refs.confirm_p.style.display = 'none';
      },
      nextBill(){
        // this.$router.push({name:"paymentBill",params:{type:3}})
        let newArr = []
        newArr = this.itemArray.concat(this.newItemArray)
        if(this.childList.length === 0){
          this.$Message.warning('班级不能为空');
        }else if(this.billName === ''){
          this.$Message.warning('账单名称不能为空');
        }else if(this.billCloseType === ''){
          this.$Message.warning('账单期限不能为空');
        }else if(this.billTotal === ''){
          this.$Message.warning('收费总额不能为空');
        }/*else if(this.itemArray.length === 0){
          this.$Message.warning('收费详情不能为空');
        }*/else{
          let params ={
            type:3,
            billName:this.billName,
            childList:this.childList,
            billCloseType:this.billCloseType,
            billTotal:this.billTotal,
            billMemo:this.billMemo,
            itemArray:newArr
          }
          this.$router.push({name:"paymentBill",params:params })
          console.log(params)
          this.$store.commit('manualPayment/setNewPaymentData',params)
          this.$store.commit('manualPayment/setTabActive',2)
          /*this.$router.push({name:"paymentBill",params:{
              type:3,
              billName:this.billName,
              billCloseType:this.billCloseType,
              billTotal:this.billTotal,
              itemArray:this.itemArray}
          })*/
        }
      },
      inputContextFn(val){
        this.inputVal = val
      },
      delChild(index){
        this.childList.splice(index,1)
      },
      addNewChild(){
        let myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;

        if(this.inputVal === ''){
          this.$Message.error('班级名称不能为空')
        }else if(this.childName === ''){
          this.$Message.error('幼儿姓名不能为空')
        }else if(this.childPhone === ''){
          this.$Message.error('家长手机号不能为空')
        }else if(!myreg.test(this.childPhone)){
          this.$Message.error('手机号输入有误')
        }else{
          this.childList.push({
            childName:this.childName,
            childPhone : this.childPhone ,
            className : this.inputVal
          })
          this.childPhone = ''
          this.childName = ''
          this.$refs.PartSearchInput.emptyVal()
        }

      },
      inputValFn(val){
        this.inputVal = val
        console.log('inputVal'+val)
      }
    },
    mounted(){
      const that = this
      API.requestBillStatusListApi({type:3}).then((json) => {
        if(json.data.code === "000"){
          this.options = json.data.data
        }else{
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })


      if (JSON.stringify(that.getNewPaymentData) !== '{}') {
        that.billName = that.getNewPaymentData.billName,
          that.childList = that.getNewPaymentData.childList,
          that.billCloseType = that.getNewPaymentData.billCloseType,
          that.billTotal = that.getNewPaymentData.billTotal,
          that.billMemo = that.getNewPaymentData.billMemo,
          that.itemArray = that.getNewPaymentData.itemArray
      }else {
        API.requestListItemApi({pageSize:4,curPage:1}).then((json) => {
          if(json.data.code === "000"){
            // console.log(json.data.data.data)
            this.itemArray = json.data.data
            this.itemArray.forEach((item)=>{
              item.money = 0
            })
          }else{
            console.log(json.data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  ul,ol,li{
    list-style: none;
  }
  .classPayMent{
    color: #333;
    clear: both;
    margin-top: 10px;
  }
  b {
    font-weight: normal;
  }
  .classPayMent span {
    width: 100px;
    float: left;
    display: inline-block;
    text-align: right;
    margin-right: 20px;
    line-height: 40px;
  }
  .childList em .ivu-icon{
    font-size: 20px;
  }
  .xin{
    color: red;
    margin-right: 5px;
  }
  .sumInput{
    display: inline-block;
    width: 150px;
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
  .details_ul {
    overflow: hidden;
    display: inline-block;
    float: left;
    margin-right: 40px;
  }

  .details_ul li {
    line-height: 40px;
  }

  .details_ul li p {
    display: inline-block;
  }
  .details_ul li p em{
    font-size: 20px;
    cursor: pointer;
    margin-left: 10px;
  }
  .details_ul li p input {
    width: 120px;
    height: 32px;
    display: inline-block;
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
    outline: none;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
  }
  .pub_confirm{
    display: inline-block;
    /*margin-left: 40px;*/
    margin-top: 8px;
  }
  .pub_confirm i{
    float: left;
    margin-top: 2px;
    font-size: 16px;
  }
  .pub_confirm p{
    line-height: 22px;
    color:red;
    margin-left: 26px;
    display: none;
  }
  .conmit,.xin{
    color: red;
  }
  .conmit{
    clear: both;
    margin-left: 20px;
    font-size: 12px;
    padding: 8px 0 5px 0;
  }
  .next{
    margin-left: 20px;
    display:block;
  }
  .searchInput {
    width: 150px;
    height: 32px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    line-height: 32px;
    outline: 0;
    padding: 0 10px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    font-size: 12px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  }

  .searchInput::-webkit-input-placeholder {
    color: #aab2bd;
  }
  .childList {
    margin-left: 120px;
    overflow: hidden;
  }

  .childListDiv {
    width: 730px;
    height: 80px;
    overflow: hidden;
    display: inline-block;
    margin-top: 10px;
    padding:0px 20px;
    border:1px dashed #ccc;
  }

  .childListDiv ul li{
    width: 170px;
    float: left;
    line-height: 40px;
  }
  .childListDiv ul li b:nth-child(2){
    margin:0 10px 0px 10px;
  }
  .childListDiv ul li i {
    cursor: pointer;
    color: #32c296;
  }
  .new_add{
    font-size: 18px;
    cursor: pointer;
  }
  .adas{
    width: 200px;
  }
  .btn-box{
    padding-left: 98px;
  }
</style>
