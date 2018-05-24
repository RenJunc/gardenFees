<template>
    <div class="Garden">
      <div class="list record">
        <v-custom :tit_span="'提现记录'" @custom-event="record"></v-custom>
        <h2>
          <span>￥</span>{{statisticData.balance}}
        </h2>
        <p class="record_p">可提现金额（元）：<br><span>{{statisticData.availableBalance}}</span></p>
      </div>
      <div class="list remind">
        <v-custom :tit="'待缴提醒'" :tit_span="'查看'" @custom-event="remind"></v-custom>
        <div class="remind_text">
          <p class="remind_p">未收齐</p>
          <b>{{statisticData.owingNum}}<i>（人）</i></b><br>
          <b>{{statisticData.owingMoney}}<i>（元）</i></b>
        </div>
        <span class="remind_span" @click="fushFees">一键催费</span>
      </div>
      <div class="list collec">
        <v-custom :tit="'今日收款'" :tit_span="'查看'" @custom-event="collec"></v-custom>
        <h2>
          <span>￥</span>{{statisticData.dayMoney}}
        </h2>
        <p class="collec_p">线上缴费（元）：<span>{{statisticData.online}}</span></p>
        <p class="collec_p">线下缴费（元）：<span>{{statisticData.offline}}</span></p>
      </div>
      <div class="list qrcode">
        <div class="qr">
          <p>园缴费码</p>
          <div class="btn-box">
            <span @click="down" class="qr_down">下载</span>
            <span @click="doPrint">打印</span>
          </div>

        </div>
        <div class="qrcode_text" id="qrcode_text">
          <vue-qr :text="codeUrl" class="ddd" id="qr_text"></vue-qr>
          <span>({{schoolCode.schoolName}})</span>
        </div>
        <div class="qrcode_text" id="qrcode_text1">
          <!--startprint-->
          <div id="con1">
            <h3 id="con_h3">园所收费二维码</h3>
            <p>使用支付宝钱包，扫一扫下面二维码</p>
            <p>输入手机号、学生姓名查询账单缴费</p>
          </div>
          <vue-qr :text="codeUrl" class="ddd" id="qr_text1"></vue-qr>
          <span>({{schoolCode.schoolName}})</span>
          <div id="con2"><img src="../assets/bbtree_lo.png" alt=""></div>
          <!--endprint-->
        </div>
      </div>
      <!--催费确认弹窗-->
      <PartModal @clickOk="clickOkThreeFn" @clickCancel="clickCancelThreeFn" :title-text="modalTitleText"
                 :is-show="isShowModalThree">
        <div slot="main" class="power-pay-modal-main">
          <div><span class="label-span">本次一健催费的账单为{{powerBillNum}}条。</span></div>
          <div><span class="label-span">温馨提示：单条缴费单同一天内只能催缴一次！</span></div>
        </div>
      </PartModal>
    </div>
</template>

<script>
  import vCustom from './garden/custom'
  import VueQr from 'vue-qr'
  import html2canvas from 'html2canvas'
  import API from '../api/api'
  import PartModal from './Part/Part_modal'
	export default {
		name: "Garden",
    data(){
		  return {
        statisticData:{},
        isShowModalThree: false,
        modalTitleText: '',
        schoolCode:{},
        codeUrl:'',
        powerBillNum: ''
      }
    },
    components:{
      vCustom,
      VueQr,
      PartModal
    },
    created(){
      // 重置手动缴费页面回显数据
      this.$store.commit('manualPayment/resetData')
      API.requestStatisticApi().then((json) =>  {
        console.log(json)
        if(json.data.code==='000'){
          this.statisticData = json.data.data
          this.statisticData.availableBalance = this.statisticData.availableBalance.toFixed(2)
          this.statisticData.balance = this.statisticData.balance.toFixed(2)
          this.statisticData.owingMoney = this.statisticData.owingMoney.toFixed(2)
          this.statisticData.dayMoney = this.statisticData.dayMoney.toFixed(2)
          this.statisticData.online = this.statisticData.online.toFixed(2)
          this.statisticData.offline = this.statisticData.offline.toFixed(2)
        }else {
          console.log(json.data.msg);
        }
      }).catch( (error) => {
        console.log(error);
      }),
      API.requestSchoolCodeApi().then((json)=>{
        if(json.data.code === "000"){
          this.schoolCode = json.data.data
          this.codeUrl = this.schoolCode.codeUrl
        }else{
          console.log(json.data.msg)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      record() {
        console.log("点击的是缴费记录")
        this.$router.push({name: "record"})
      },
      remind() {
        console.log("点击的是代缴提醒")
        this.$router.push({name: "remind"})
      },
      collec() {
        console.log("点击的是今日收款")
        this.$router.push({name: "collec"})
      },
      down() {
        html2canvas(document.querySelector('#qrcode_text1'),
          document.getElementById('qrcode_text1').style.display = "block"
        ).then(canvas => {
          let imgUri = canvas.toDataURL("image/jpg");
          let imgData = imgUri;
          this.downloadFile(this.schoolCode.schoolName+'.jpg', imgData);
          document.getElementById('qrcode_text1').style.display = "none"
        });
      },
      downloadFile(fileName, content) {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(content); //new Blob([content]);
        //let evt = document.createEvent("HTMLEvents");
        //evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        console.log(fileName)
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        // aLink.dispatchEvent(evt);
        aLink.click()
      },
      //base64转blob
      base64ToBlob(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
      },
      doPrint() {
        var newstr = document.getElementById('qrcode_text1').innerHTML
        document.body.innerHTML = newstr
        window.print()
        // 重新加载页面，以刷新数据
        window.location.reload()
      },
      // 催费确认弹窗
      clickCancelThreeFn () {
        this.isShowModalThree = false
      },
      clickOkThreeFn (obj) {
        this.isShowModalThree = false
        this.requestWarnpayallApiFn()
      },
      fushFees(){
        this.modalTitleText = '一键催费'
        this.isShowModalThree = true
        this.requestGetWarnPayCountApiFn()
      },
      /**
       * 催费
       * @param obj
       */
      requestWarnpayallApiFn (obj = {}) {
        const that = this
        let params = {}
        if (that.powerBillId) {
          params.billId = [that.powerBillId]
        }
        API.requestWarnpayallApi(params).then(function (json) {
          if (json.data.code === '000') {
            that.$Message.success('催缴成功')
            that.requestBillSearchFn()
          } else {
            that.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /**
       * 催费条数
       * @param obj
       */
      requestGetWarnPayCountApiFn (obj = {}) {
        API.requestGetWarnPayCountApi({}).then( (json) => {
          if (json.data.code === '000') {
            this.powerBillNum = json.data.data
          } else {
            this.$Message.error(json.data.msg)
            console.log(json.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
    }
	}
</script>

<style lang="scss">
  @import '~@/stylesheets/common.scss';
  .Garden{
    height: 100%;
    background: #eff4f7;
    padding: 0 16px;
  }
  ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .list {
    width: 400px;
    height: 230px;
    /*padding: 0 20px;*/
    background: #fff;
    float: left;
    overflow: hidden;
    margin-top: 20px;
    margin-right: 20px;
    border-radius: 4px;
  }

  .record h2, .collec h2 {
    font-size: 32px;
    color: #4c545d;
    margin-top: 35px;
    margin-left: 20px;
  }

  .record h2 span, .collec h2 span {
    font-size: 24px;
  }

  .record .record_p {
    font-size: 14px;
    margin-left: 20px;
    color: #666;
    margin-top: 20px;
    line-height: 24px;
  }

  .record .record_p span {
    font-size: 20px;
    color: #666;
  }

  .collec .collec_p {
    font-size: 14px;
    color: #666;
    line-height: 30px;
    margin-left: 20px;
  }

  .collec .collec_p span {
    font-size: 20px;
    color: #666;
  }

  .remind_text {
    margin-left: 20px;
    margin-top: 20px;
  }

  .remind_text .remind_p {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
  }

  .remind_text b {
    color: #4c545d;
    font-size: 24px;
    line-height: 30px;
  }

  .remind_text b i {
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
  }

  .remind_span {
    display: inline-block;
    width: 100px;
    background: #32c296;
    text-align: center;
    line-height: 38px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    height: 38px;
    cursor: pointer;
    margin-left: 20px;
    margin-top: 14px;
  }

  .qr {
    line-height: 42px;
    height: 42px;
    color: #333;
    background: #f9fafb;
    padding: 0 20px;
    @include clearfix();
  }
  .qr .btn-box{
    float: right;
  }

  .qr p, .qr span {
    display: inline-block;
    font-size: 14px;
  }

  .qr span {
    width: 44px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    background: #32c296;
    border-radius: 4px;
    cursor: pointer;
  }

  .qr span.qr_down {
    margin-left: 80px;
    margin-right: 10px;
  }

  .qrcode_text {
    text-align: center;
    overflow: hidden;
  }

  .qrcode_text span {
    font-size: 14px;
    color: #666;
  }

  .ddd {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }


  @media print {
    body {
      text-align: center;
    }
    #con_h3{
      width: 300px;
      /*margin-left: 200px;*/
      margin: 0 auto;
      font-size: 30px;
    }
  }
  #con1{
    margin: 0 30px;
    margin-top: 30px;
  }
  #con1 h3{
    margin-top: 30px;
    line-height: 40px;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
  }
  #con1 p{
    font-size: 14px;
    line-height: 24px;
  }
  #con2{
    margin-top: 20px;
    margin-bottom: 30px;
  }
  #qrcode_text1{
    display: none;
    margin-top: 24px;
    height: 540px;
  }
  #qr_text1{
    width: 300px;
    height: 300px;
  }
  #qr_text1 img{
    width: 100%;
    height: 100%;
  }
  /*#qr_text{*/
    /*width: 140px;*/
    /*height: 140px;*/
  /*}*/
  /*#qr_text img{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
</style>
