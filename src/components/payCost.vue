<template>
    <div class="paycost">
      <div class="pay_promt"><span>下载缴费账单模板</span><Icon type="help-circled"></Icon></div>
      <div class="pay_update">
        <p><Icon type="ios-cloud-upload"></Icon></p>
        <Button type="primary" @click="modal1 = true">上传缴费账单文件</Button>
      </div>
      <Modal
        v-model="modal1"
        title="导入缴费账单"
        ok-text="导入"
        cancel-text="关闭"
        @on-ok="ok"
        :mask-closable="false"
        @on-cancel="cancel">
        <div class="pay_upData">
          <div class="billImport billData">
            <span>账单导入</span>
            <p>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button type="ghost" icon="ios-cloud-upload-outline" style="width: 160px">选择文件</Button>
              </Upload>
            </p>
            <b>模板下载</b>
          </div>
          <div class="billName billData">
            <span>账单名称</span>
            <Input v-model="billName" placeholder="如2018年3月园费" style="width: 160px"/>
          </div>
          <div class="billLimit billData">
            <span>账单期限</span>
            <Select v-model="billLimit" style="width:160px">
              <Option v-for="item in limitList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="sendWay billData">
            <span>发送方式</span>
            <RadioGroup v-model="sendWay">
              <Radio label="普通发送"></Radio>
              <Radio label="定时发送"></Radio>
            </RadioGroup>
          </div>
          <div class="sendTime billData">
            <span>发送时间</span>
            <DatePicker type="datetime" placeholder="" style="width: 160px"></DatePicker>
          </div>
        </div>
      </Modal>
    </div>
</template>

<script>
	export default {
		name: "payCost",
    data(){
		  return {
        modal1:this.$route.params.modal1 || false,
        billName:'',
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
        sendWay:'普通发送'
      }
    },
    methods: {
      ok() {
        // this.$Message.info('Clicked ok');
        this.$router.push({name:"billConfim"})
      },
      cancel() {
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
        console.log(this.fileList3)
      }
    }
	}
</script>

<style scoped>
  .pay_promt {
    margin-top: 20px;
    line-height: 40px;
    text-align: right;
    margin-right: 30px;
    color: #333;
  }

  .pay_promt span {
    margin-right: 20px;
    cursor: pointer;
  }

  .pay_promt i {
    cursor: pointer;
    font-size: 14px;
  }
  .pay_update {
    text-align: center;
    margin-top: 100px;
  }
  .pay_update p {
    font-size: 80px;
    display: block;
    margin-bottom: -20px;
  }
  .billData{
    margin-top: 10px;
    color: #333;
  }
  .billData span{
    margin-right:10px;
  }
  .billImport p{
    display: inline-block;
  }
  .billImport b{
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
