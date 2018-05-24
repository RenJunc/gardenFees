<template>
<div class="classPayment">
    <div class="select_class classPayMent">
      <span><b class="xin">*</b>选择班级：</span>
      <div class="classList" ref="listcheck">
        <CheckboxGroup v-model="classList">
        <b v-for="item,index in checkData">
          <Checkbox :label="item.classId">{{item.className}}</Checkbox>
        </b>
        </CheckboxGroup>
      </div>
      <em class="arrow-box" @click="checkboxdown()" v-if="checkData.length>4 && iconselect == 1">
        <span class="arrow-text">更多</span>
        <Icon class="arrow-icon" type="ios-arrow-down"></Icon>
      </em>
      <em class="arrow-box" @click="checkboxup()" v-if="checkData.length>4 && iconselect == 2">
        <span class="arrow-text" >收起</span>
        <Icon class="arrow-icon" type="ios-arrow-up"></Icon>
      </em>
    </div>
    <div class="billName classPayMent">
      <span><b class="xin">*</b>账单名称：</span>
      <Input v-model="billName" placeholder="如2018年4托费" style="width:300px"/>
    </div>
    <div class="classPayMent">
      <span>备注：</span>
      <Input v-model="billMemo" placeholder="最多100个字符." style="width: 300px"/>
    </div>
    <div class="classPayMent">
      <span>
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
              <Icon type="ios-minus-empty" ></Icon>
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
    <div class="conmit">*为必填项</div>
    <Button type="primary" @click="nextBill" class="next">下一步</Button>
  </div>
</div>
</template>

<script>
  import API from '../../api/api'
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name: "classPayment",
    data(){
		  return {
        createdobj: {},
        checkData:[],
        iconselect:1,
        billName:'',
        billMemo:'',
        options: [],
        billCloseType:'',
        billTotal:'',
        itemArray:[],
        classList:[],
        newItemArray:[],
        creaMoney:0
      }
    },
    computed: {
      ...mapGetters('manualPayment', ['getClassPaymentData'])
    },
    methods: {
      checkboxdown() {
        this.$refs.listcheck.style.height = 'auto';
        this.iconselect = 2
      },
      checkboxup() {
        this.$refs.listcheck.style.height = 40 + 'px';
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
        this.createdobj = {}
        console.log(this.itemArray)
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
        this.newItemArray = []
        let priceSum = 0;
        this.itemArray.forEach( item => {
          if(item.money === ""){
            item.money = 0
          }
          priceSum += Number(item.money)
        });
        this.billTotal = parseInt(this.createdobj.money) + priceSum
        // this.newItemArray = this.itemArray
        this.newItemArray.push({
          name:this.createdobj.name,
          money:this.createdobj.money
        })
        console.log(this.newItemArray)
      },
      onMouseOver(){
        this.$refs.confirm_p.style.display = 'block';
      },
      onMouseLeave(){
        this.$refs.confirm_p.style.display = 'none';
      },
      nextBill(){
        console.log(this.newItemArray)

        let newArr = []
        newArr = this.itemArray.concat(this.newItemArray)
        if(this.classList.length === 0){
          this.$Message.warning('班级不能为空');
        }else if(this.billName === ''){
          this.$Message.warning('账单名称不能为空');
        }else if(this.billCloseType === ''){
          this.$Message.warning('账单期限不能为空');
        }else if(this.billTotal === ''){
          this.$Message.warning('收费总额不能为空');
        }else{
          let params = {
            type:1,
            billName:this.billName,
            classList:this.classList,
            billCloseType:this.billCloseType,
            billMemo:this.billMemo,
            billTotal:this.billTotal,
            itemArray:newArr
        }
          this.$router.push({name:"paymentBill",params:params})
          this.$store.commit('manualPayment/setClassPaymentData',params)
          this.$store.commit('manualPayment/setTabActive',0)
        }
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
      }),
      API.requestClassListApi({className:''}).then((json) => {
        if(json.data.code === "000"){
          // console.log(json.data.data)
          this.checkData = json.data.data
        }else{
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
      // 有数据回显数据，没有再请求
      if (JSON.stringify(that.getClassPaymentData) !== '{}') {
        that.billName = that.getClassPaymentData.billName,
          that.classList = that.getClassPaymentData.classList,
          that.billCloseType = that.getClassPaymentData.billCloseType,
          that.billMemo = that.getClassPaymentData.billMemo,
          that.billTotal = that.getClassPaymentData.billTotal,
          that.itemArray = that.getClassPaymentData.itemArray
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

<style lang="scss" scoped>
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
  .classList {
    display: inline-block;
    width: 500px;
    overflow: hidden;
    height: 40px;

  }

  .classList b {
    width: 120px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-left: 3px;
    overflow: hidden;
  }
  .select_class .ivu-icon{
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
  .arrow-box{
    display: inline-block;
    position: relative;
    font-size: 14px;
    height: 40px;
    width: 50px;
    color: #32c296;
    &:hover{
      cursor:pointer;
    }
    .arrow-text{
      position: absolute;
      top: 0px;
      left: 0px;
      text-align: left;
    }
    .arrow-icon{
      position: absolute;
      top: 12px;
      right: 0px;
      text-align: left;

    }
  }
  .btn-box{
    padding-left: 98px;
  }
</style>
