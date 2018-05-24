<template>
  <div class="paycost">
    <div class="paycost_prompt">
      <p>1、下载模板<img src="../assets/right.jpg">2、导入账单<img src="../assets/right.jpg">3、确认账单<img src="../assets/right.jpg">4、发布账单</p>
      <p><span @click="templateDown">下载缴费账单模板</span><span @click="showPrompt"><Icon type="help-circled"></Icon></span></p>
    </div>
    <div class="paycost_update">
      <p><img src="../assets/upimg.png" alt=""></p>
      <Button type="primary" @click="modal1 = true">上传账单</Button>
    </div>
    <!--<div class="pay_promt"><span class="pay_promt_down" @click="templateDown">下载缴费账单模板</span><i @click="showPrompt">-->
      <!--<Icon type="help-circled"></Icon>-->
    <!--</i></div>-->
    <!--<div class="pay_update">-->
      <!--<p>-->
        <!--<Icon type="ios-cloud-upload"></Icon>-->
      <!--</p>-->
      <!--<Button type="primary" @click="modal1 = true">上传缴费账单文件</Button>-->
    <!--</div>-->
    <Modal
      v-model="modal1"
      title="导入缴费账单"
      :mask-closable="false">
      <div class="pay_upData">
        <div class="billImport billData">
          <span>账单导入：</span>
          <p>
            <Input v-model="fileName" disabled style="width: 160px"/>
            <Button class="upload-btn" type="primary" @click="fileUploadFn">浏览</Button>
            <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
            <!--<Button type="ghost" icon="ios-cloud-upload-outline" style="width: 160px">选择文件</Button>-->
            <!--</Upload>-->
          </p>
          <b class="pay_promt_down" @click="templateDown">模板下载</b>
        </div>
        <div class="billName billData">
          <span>账单名称：</span>
          <Input v-model="billName" placeholder="如2018年3月园费" style="width: 160px"/>
        </div>
        <!--<div class="billLimit billData">-->
        <PartPayStauts class="row-item billLimit billData" label-text="账单期限" @changeVal="changeTypeFn"
                       :payType="3"></PartPayStauts>
        <!--<span></span>-->
        <!--<Select v-model="billCloseType" style="width:160px">-->
        <!--<Option v-for="item in limitList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--</Select>-->
        <!--</div>-->
        <div class="sendWay billData">
          <span>发送方式：</span>
          <RadioGroup v-model="billStatus">
            <Radio  label="7">普通发送</Radio>
            <Radio label="5">定时发送</Radio>
          </RadioGroup>
        </div>
        <div class="sendTime billData" v-if="billStatus ==='5'">
          <span>发送时间：</span>
          <DatePicker
            type="datetime"
            placeholder=""
            style="width: 180px"
            @on-change="sendTimeDate"
            v-model="billReleaseDatetime"
          ></DatePicker>
        </div>
      </div>
      <div slot="footer">
        <Button @click="closeModel">关闭</Button>
        <Button type="success" @click="importBill">导入</Button>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      title="提示"
      :width="660"
      :mask-closable="false">
      <img src="../assets/prompt.jpg" alt="" style="width:100%">
      <div slot="footer">
        <Button type="success" @click="closeModel">好的</Button>
      </div>
    </Modal>
    <!--form 表单实现上传-->
    <div style="visibility: hidden">
      <form ref="exportForm" @submit.pervent="submitFormFn">
        <input style="visibility: hidden" ref="uploadInput" type='file' name='upload'
               @change="fileChangeFn"/>
        <input style="visibility: hidden" name="billName" v-model="billName"/>
        <input style="visibility: hidden" type="text" v-if="billReleaseDatetime" name="billReleaseDatetime" v-model="billReleaseDatetime"/>
        <input style="visibility: hidden" type="text" name="billStatus" v-model="billStatus"/>
        <input style="visibility: hidden" type="text" name="billCloseType" v-model="billCloseType"/>
        <input type="submit" ref="clickSubmitBtn">

      </form>
    </div>
  </div>
</template>

<script>
  import API from '../api/api'
  import PartPayStauts from './Part/part_pay_status_type_select'

  export default {
    name: 'payCost',
    data () {
      return {
        modal1: this.$route.params.modal1 || false,
        modal2: false,
        billName: '',
        billCloseType: 0,
        fileName: '',
        limitList: [{
          value: 0,
          label: '永久'
        }, {
          value: 1,
          label: '两周'
        }, {
          value: 2,
          label: '一个月'
        }, {
          value: 3,
          label: '三个月'
        }],
        billStatus: 7,
        billReleaseDatetime: '',
      }
    },

    components: {
      PartPayStauts
    },
    created(){
      // 重置手动缴费页面回显数据
      this.$store.commit('manualPayment/resetData')
    },
    methods: {
      sendTimeDate (date) {
        this.billReleaseDatetime = date
      },
      fileUploadFn () {
        console.log('点击上传')
        const that = this
        that.$refs.uploadInput.click()
      },
      fileChangeFn (e) {
        const that = this
        that.fileName = ''
        // 限制上传文件类型
        if (!that.checkFileType()) {
          return false
        }
        // 点击选择文件，如果有选择文件，把对应名字显示出来，如果没有选择文件，关闭窗口，则显示未选择文件
        if (e.currentTarget.files.length) {
          that.fileName = e.currentTarget.files[0].name
        } else {
          that.fileName = ''
        }
      },
      checkFileType () {
        const that = this
        const fileTypeArr = ['.xls', '.xlsx']
        const filePath = that.$refs.uploadInput.value
        if (!filePath) {
          return false
        }
        let isNext = false
        let fileEnd = filePath.substring(filePath.indexOf('.'))
        for (let i = 0; i < fileTypeArr.length; i++) {
          if (fileTypeArr[i] == fileEnd) {
            isNext = true
            break
          }
        }
        if (!isNext) {
          alert('不接受此文件类型')
          return false
        }
        return true
      },
      importBill () {

        console.log(this.billName)
        console.log(this.billCloseType)
        console.log(this.billStatus)
        console.log(this.billReleaseDatetime)
        console.log(this.fileName)
        if (this.fileName === '') {
          window.alert('导入EXCEL不能为空')
        } else if (this.billName === '') {
          window.alert('账单名称不能为空')
        } else {
          this.$refs.clickSubmitBtn.click()
          console.log('可以了')
        }
      },
      submitFormFn (event) {
        const that = this
        event.preventDefault()
        var formData = new FormData(event.target)
        API.requestBillImportApi(formData).then(function (json) {
          if (json.data.code === '000') {
            // 上传成功后重置数据，解决重复上传同文件的问题
            formData = new FormData({})
            that.$router.push({
              name: 'billConfim_eq', params: {dataObj:json.data.data}
            })
          } else {
            that.$Message.error(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      handleChange (file, fileList) {
        this.fileList3 = fileList.slice(-3)
        console.log(this.fileList3)
      },
      templateDown () {
        window.open('https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/billtempletedown')
      },
      showPrompt () {
        this.modal2 = true
      },
      closeModel () {
        this.modal2 = false
        this.modal1 = false
      },
      changeTypeFn (val) {
        this.billCloseType = val
        console.log(this.billCloseType)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .paycost{
    margin: 0 16px;
  }

  .paycost_prompt{
    text-align: center;
    margin-top: 60px;
    color: #999;
    font-size: 14px;
    p:nth-child(1){
      vertical-align: middle;
      img{
        margin: 0 5px;
      }
    }
    p:nth-child(2){
      margin-top: 24px;
      color: #32c296;
      span:nth-child(1){
        text-decoration: underline;
        cursor: pointer;
      }
      span:nth-child(2){
        cursor: pointer;
        color: #c2c7d7;
        margin-left: 5px;
        font-size: 20px;
      }
    }
  }
  .paycost_update{
    text-align: center;
    margin-top: 60px;
    button{
      width: 146px;
      height: 50px;
      font-size: 14px;
    }
  }


  .billData {
    margin-top: 10px;
    color: #333;
    .upload-btn {

    }
  }

  .billData span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }

  .billImport p {
    display: inline-block;
  }

  .billImport b {
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }

  /*.ivu-btn-primary{*/
  /*background: #32c296;*/
  /*border-color: #32c296;*/
  /*}*/
  .ivu-btn-primary {
    background: #32c296;
    border-color: #32c296;
  }

  .ivu-btn-primary:hover {
    background: #32c296;
    border-color: #32c296;
  }

  .ivu-btn-text {
    border: 1px solid #ccc;
  }

  .pay_promt_down {
    text-decoration: underline;
    cursor: pointer;
    color: rgb(45, 140, 240);
  }
</style>
