<template>
  <div class="newPayment">
    <div class="selectChild classPayMent">
      <label>
        <span><b class="xin">*</b>录入新生：</span>
        <input type="text" placeholder="录入班级" v-model="searchChild" @keyup.enter='show($event)' class="searchInput">
      </label>
      <label>
        <Input v-model="childName" placeholder="幼儿姓名" style="width: 150px"/>
      </label>
      <label>
        <Input v-model="parentPhone" placeholder="家长手机号" style="width: 150px"/>
      </label>
      <label>
        <RadioGroup v-model="studentFies">
          <Radio label="0">同步学生档案</Radio>
          <Radio label="1">不同步学生档案</Radio>
        </RadioGroup>
      </label>
      <label>
        <em class="new_add">
          <Icon type="plus-round"></Icon>
        </em>
      </label>
    </div>
    <div class="childList">
      <div class="childListDiv" ref="listcheck">
        <ul v-for="item,index in childData">
          <li v-for="option,idx in item.people"><b>{{option.name}}</b><b>{{item.className}}</b><Icon type="close-circled"></Icon></li>
        </ul>
      </div>
      <em @click="checkboxdown()">
        <Icon type="ios-arrow-down" v-if="childData.length>4 && iconselect == 1" ></Icon>
      </em>
      <em @click="checkboxup()">
        <Icon type="ios-arrow-up" v-if="childData.length>4 && iconselect == 2"></Icon>
      </em>
    </div>
    <div class="billName classPayMent">
      <span><b class="xin">*</b>账单名称：</span>
      <Input v-model="billText" placeholder="如2018年4托费" style="width: 180px"/>
    </div>
    <div class="classPayMent">
      <span>备注：</span>
      <Input v-model="remakText" placeholder="最多100个字符." style="width: 180px"/>
    </div>
    <div class="classPayMent"><span>
      <b class="xin">*</b>账单期限：</span>
      <Select v-model="billLimit" style="width:180px">
        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="classPayMent"><span>
      <b class="xin">*</b>收费总额：</span>
      <input type="text" v-model="sumPriceDeatil" onkeyup="value=value.replace(/[^-\d\.]/g,'')" class="sumInput">
      元
    </div>
    <div class="classPayMent"><span>
      <b class="xin">*</b>收费详情：</span>
      <ul class="details_ul">
        <li v-for="item,index in chargeData">
          <p><input type="text" v-model="item.chargeName"></p>
          <p><input type="text" v-model="item.chargePrice" onkeyup="value=value.replace(/[^-\d\.]/g,'')"
                    @blur="sumPriceC"/></p>
          <p @click="delCharge(index)">
            <em>
              <Icon type="ios-minus-empty"></Icon>
            </em>
          </p>
        </li>
        <li class="addChargeList">
          <p><input type="text" v-model="createdobj.chargeName"></p>
          <p><input type="text" v-model="createdobj.chargePrice"></p>
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
    <div class="conmit">*红色星号为必填项</div>
    <Button type="primary" @click="nextBill" class="next">下一步</Button>

  </div>
</template>

<script>
  export default {
    name: "newPayment",
    data(){
      return {
        childName:'',
        studentFies:'0',
        parentPhone:'',
        createdobj: {},
        childData:[
          {
            className:'一班',
            people:[
              {
                name:'张小萌1',
                id:'0'
              },
              {
                name:'李晓亮1',
                id:'1'
              },
              {
                name:'宋晓峰1',
                id:'2'
              }
            ]
          },
          {
            className:'二班',
            people:[
              {
                name:'张小萌2',
                id:'0'
              },
              {
                name:'李晓亮2',
                id:'1'
              },
              {
                name:'宋晓峰2',
                id:'2'
              }
            ]
          },
          {
            className:'三班',
            people:[
              {
                name:'张小萌3',
                id:'0'
              },
              {
                name:'李晓亮3',
                id:'1'
              },
              {
                name:'宋晓峰3',
                id:'2'
              }
            ]
          },
          {
            className:'四班',
            people:[
              {
                name:'张小萌4',
                id:'0'
              },
              {
                name:'李晓亮4',
                id:'1'
              },
              {
                name:'宋晓峰4',
                id:'2'
              }
            ]
          },
          {
            className:'五班',
            people:[
              {
                name:'张小萌5',
                id:'0'
              },
              {
                name:'李晓亮5',
                id:'1'
              },
              {
                name:'宋晓峰5',
                id:'2'
              }
            ]
          }
        ],
        iconselect:1,
        billText:'',
        remakText:'',
        options: [{
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
        billLimit:'0',
        sumPriceDeatil:'0.0',
        chargeData: [
          {
            chargeName: '保教费',
            chargePrice: '0.00'
          },
          {
            chargeName: '伙食费',
            chargePrice: '0.00'
          },
          {
            chargeName: '退饭费',
            chargePrice: '0.00'
          },
          {
            chargeName: '托管费',
            chargePrice: '0.00'
          }
        ],
        searchChild:''
      }
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
        if (!this.createdobj.chargePrice) {
          this.createdobj.chargePrice = 0
        }
        this.chargeData.push(this.createdobj)
        this.sumPriceDeatil = 0
        this.chargeData.forEach(item => {
          this.sumPriceDeatil += parseFloat(item.chargePrice)//item.chargePrice*1
        })
        console.log(this.chargeData)
        this.createdobj = {}
      },
      delCharge(index) {
        console.log(index)
        this.sumPriceDeatil = 0
        this.chargeData.splice(index, 1)
        this.chargeData.forEach(item => {
          this.sumPriceDeatil += item.chargePrice * 1
        })
      },
      sumPriceC() {
        let priceSum = 0;
        this.chargeData.forEach( item => {
          console.log(item.chargePrice);
          priceSum += parseFloat(item.chargePrice)
        });
        this.sumPriceDeatil = priceSum
      },
      onMouseOver(){
        this.$refs.confirm_p.style.display = 'block';
      },
      onMouseLeave(){
        this.$refs.confirm_p.style.display = 'none';
      },
      nextBill(){
        this.$router.push({name:"paymentBill",params:{num:0}})
      },
      show(ev) {

        if (ev.keyCode == 13) {
          console.log(this.searchChild)
        }
      },
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
    width: 100px;
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
    width: 80px;
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
  }

  .childListDiv ul {
    margin-left: 20px;
    float: left;
  }
  .childListDiv ul li{
    width: 160px;
    line-height: 40px;
  }
  .childListDiv ul li b:nth-child(2){
    margin:0 10px 0px 25px;
  }
  .childListDiv ul li i {
    cursor: pointer;
    color: #32c296;
  }
  .new_add{
    font-size: 18px;
    cursor: pointer;
  }
</style>
