<template>
  <div class="childPayment">
    <div class="selectChild classPayMent">
      <span><b class="xin">*</b>选择幼儿：</span>
      <PartSearchInput @setChildObj="setChildObjFn" placeholder="姓名/拼单/首字母/手机号查询"></PartSearchInput>
      <label>合计：{{childList.length}}名幼儿</label>
    </div>
    <div class="childList">
      <div class="childListDiv" ref="listcheck" v-if="childList.length > 0">
        <ul>
          <li v-for="item,index in childList"><b>{{item.childName}}</b><b>{{item.className}}</b><em
            @click="delChild(index)">
            <Icon type="close-circled"></Icon>
          </em></li>
        </ul>
      </div>
      <em @click="checkboxdown()">
        <Icon type="ios-arrow-down" v-if="childList.length>8 && iconselect == 1"></Icon>
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
      <Input v-model="billMemo" placeholder="最多100个字符." style="width: 300px"/>
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
          <p><input type="text" v-model="createdobj.money" placeholder="输入收费金额"  onkeyup="value=value.replace(/[^-\d\.]/g,'')" @blur="createSum"></p>
          <p @click="addCharge">
            <em>
              <Icon type="ios-plus-empty"></Icon>
            </em>
          </p>
        </li>
      </ul>
      <div class="pub_confirm">
        <i @mouseover="onMouseOver" @mouseleave="onMouseLeave">
          <Icon type="help-circled"></Icon>
        </i>
        <p class="confirm_p" ref="confirm_p">温馨提示：<br>收费项可以填加多个，现有收费项目名称可修改，如<em
          style="color: dodgerblue;font-style: normal">伙食费改成书费</em>；退费可金额添加负数如-200</p>
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
  import PartSearchInput from './Part/Part_search_input'
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'childPayment',
    data () {
      return {
        createdobj: {},
        iconselect: 1,
        billName: '',
        billMemo: '',
        options: [],
        billCloseType: '0',
        billTotal: '',
        itemArray: [],
        // searchChild:'',
        listShow: false,
        childList: [],
        newItemArray:[],
        creaMoney:0
      }
    },
    components: {
      PartSearchInput
    },
    computed: {
      ...mapGetters('manualPayment', ['getChildPaymentData'])
    },
    methods: {
      checkboxdown () {
        this.$refs.listcheck.style.height = 'auto'
        this.iconselect = 2
      },
      checkboxup () {
        this.$refs.listcheck.style.height = 80 + 'px'
        this.iconselect = 1
      },
      addCharge () {
        //判断一下在添加，都不让为空
        if (!this.createdobj.money) {
          this.createdobj.money = 0
        }
        this.itemArray.push(this.createdobj)
        this.billTotal = 0
        this.itemArray.forEach(item => {
          this.billTotal += parseFloat(item.money)//item.money*1
        })
        // console.log(this.itemArray)
        this.createdobj = {}
      },
      delCharge (index) {
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
      sumPriceC () {
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
      onMouseOver () {
        this.$refs.confirm_p.style.display = 'block'
      },
      onMouseLeave () {
        this.$refs.confirm_p.style.display = 'none'
      },
      nextBill () {
        let newArr = []
        newArr = this.itemArray.concat(this.newItemArray)
        if (this.childList.length === 0) {
          this.$Message.warning('班级不能为空')
        } else if (this.billName === '') {
          this.$Message.warning('账单名称不能为空')
        } else if (this.billCloseType === '') {
          this.$Message.warning('账单期限不能为空')
        } else if (this.billTotal === '') {
          this.$Message.warning('收费总额不能为空')
        } else {
          let params = {
            type: 2,
            billName: this.billName,
            childList: this.childList,
            billCloseType: this.billCloseType,
            billTotal: this.billTotal,
            billMemo: this.billMemo,
            itemArray: newArr
          }

          // console.log(params)
          this.$router.push({name: 'paymentBill', params: params})
          this.$store.commit('manualPayment/setChildPaymentData', params)
          this.$store.commit('manualPayment/setTabActive',1)
        }
        // this.$router.push({name:"paymentBill",params:{type:2}})
      },
      searchClass () {
        this.listShow = true
        API.requestFindChildConditionApi().then((json) => {
          if (json.data.code === '000') {
            console.log(json.data.data)
          } else {
            console.log(json.data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      setChildObjFn (obj) {
        if (obj.childId !== undefined) {
          this.childList.push(obj)
        }

        // console.log(this.childList)
      },
      delChild (index) {
        this.childList.splice(index, 1)
      }
    },
    mounted () {
      const that  = this
      API.requestBillStatusListApi({type: 3}).then((json) => {
        if (json.data.code === '000') {
          this.options = json.data.data
        } else {
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })

      // 有数据回显数据，没有再请求
      if (JSON.stringify(that.getChildPaymentData) !== '{}') {
        that.itemArray = that.getChildPaymentData.itemArray
        that.billName = that.getChildPaymentData.billName
        that.childList = that.getChildPaymentData.childList
        that.billCloseType = that.getChildPaymentData.billCloseType
        that.billTotal = that.getChildPaymentData.billTotal
        that.billMemo = that.getChildPaymentData.billMemo
      }else {
        API.requestListItemApi({pageSize: 4, curPage: 1}).then((json) => {
          if (json.data.code === '000') {
            // console.log(json.data.data)
            this.itemArray = json.data.data
            this.itemArray.forEach((item) => {
              item.money = 0
            })
          } else {
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
  ul, ol, li {
    list-style: none;
  }

  .classPayMent {
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

  .selectChild label {
    float: right;
    margin-right: 200px;
    font-size: 12px;
    color: red;
  }

  .childList em .ivu-icon {
    font-size: 20px;
  }

  .xin {
    color: red;
    margin-right: 5px;
  }

  .sumInput {
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
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
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

  .details_ul li p em {
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
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
  }

  .pub_confirm {
    display: inline-block;
    /*margin-left: 40px;*/
    margin-top: 8px;
  }

  .pub_confirm i {
    float: left;
    margin-top: 2px;
    font-size: 16px;
  }

  .pub_confirm p {
    line-height: 22px;
    color: red;
    margin-left: 26px;
    display: none;
  }

  .conmit, .xin {
    color: red;
  }

  .conmit {
    clear: both;
    margin-left: 20px;
    font-size: 12px;
    padding: 8px 0 5px 0;
  }

  .next {
    margin-left: 20px;
    display: block;
  }

  .searchInput {
    width: 180px;
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

  .chaxun {
    position: relative;
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
    border: 1px dashed #ccc;
    margin-top: 10px;
    padding: 0px 20px;
  }

  .childListDiv ul li {
    width: 170px;
    float: left;
    line-height: 40px;
  }

  .childListDiv ul li b:nth-child(2) {
    margin: 0 10px 0px 10px;
  }

  .childListDiv ul li i {
    cursor: pointer;
    color: #32c296;
  }

  .searchList {
    width: 180px;
    height: 200px;
    position: absolute;
    overflow-y: scroll;
    z-index: 2;
    left: 120px;
  }

  .searchList li {
    line-height: 30px;
    padding-left: 20px;
    cursor: pointer;
    background: #f5f5f5;
    margin-top: 2px;
  }
  .btn-box{
    padding-left: 98px;
  }
</style>
