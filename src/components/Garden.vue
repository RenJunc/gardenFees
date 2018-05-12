<template>
    <div class="Garden">
      <div class="list record">
        <v-custom :tit_span="'提现记录'" @custom-event="record"></v-custom>
        <h2>
          <span>￥</span>988.65
        </h2>
        <p>可提现金额（元）：<br><span>666.53</span></p>
      </div>
      <div class="list remind">
        <v-custom :tit="'待缴提醒'" :tit_span="'查看'" @custom-event="remind"></v-custom>
        <div class="remind_text">
          <p>未收齐</p>
          <b>30<i>（人）</i></b><br>
          <b>300<i>（元）</i></b>
        </div>
        <span class="remind_span" @click="modal1 = true">一键催费</span>
      </div>
      <div class="list collec">
        <v-custom :tit="'今日收款'" :tit_span="'查看'" @custom-event="collec"></v-custom>
        <h2>
          <span>￥</span>988.65
        </h2>
        <p>线上缴费（元）：<span>666.53</span></p>
        <p>线下缴费（元）：<span>800.00</span></p>
      </div>
      <div class="list qrcode">
        <div class="qr">
          <p>园缴费码</p>
          <span @click="down" class="qr_down">下载</span>
          <span @click="doPrint">打印</span>
        </div>
        <div class="qrcode_text" id="qrcode_text">
          <!--<vue-qr text="y2.bbtree.com" class="ddd" id="qr_text"></vue-qr>-->
          <div id="qrcode" ref="qrcode"></div>
          <span>(智慧树新考勤学校)</span>
        </div>
        <div class="qrcode_text" id="qrcode_text1">
          <!--startprint-->
          <div id="con1">
            <h3 id="con_h3">园所收费二维码</h3>
            <p>使用支付宝钱包，扫一扫下面二维码</p>
            <p>输入手机号、学生姓名查询账单缴费</p>
          </div>
          <vue-qr text="y2.bbtree.com" class="ddd" id="qr_text1"></vue-qr>
          <span>(智慧树新考勤学校)</span>
          <div id="con2"><img src="../assets/bbtree_lo.png" alt=""></div>
          <!--endprint-->
        </div>
      </div>
      <Modal
        v-model="modal1"
        title="一键催费"
        @on-ok="ok"
        :mask-closable="false"
        @on-cancel="cancel">
        <p>本次一键催费的账单为10条</p>
        <p>温馨提示：单条账单同一天内只能催收一次！</p>
      </Modal>
    </div>
</template>

<script>
  import vCustom from './garden/custom'
  // import QRCode from 'qrcodejs2'
  import qrcode from './common/qrcode'
  import html2canvas from 'html2canvas'
	export default {
		name: "Garden",
    data(){
		  return {
        modal1:false
      }
    },
    components:{
      vCustom
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
          let imgUri = canvas.toDataURL("image/png");
          let imgData = imgUri;
          this.downloadFile('bbtree.png', imgData);
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
      rushFee(){

      },
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      },
      _getQart: function() {

          var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 130,//设置宽高
            height : 130  ,
            text:'y2.bbtree.com'
          });
      },


    },
    mounted () {
      this._getQart()
    }
  }
</script>

<style>
  body {
    background: #eff4f7;
  }

  ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .list {
    width: 23%;
    height: 230px;
    /*padding: 0 20px;*/
    background: #fff;
    float: left;
    overflow: hidden;
    margin: 0 1%;
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

  .record p {
    font-size: 14px;
    margin-left: 20px;
    color: #666;
    margin-top: 20px;
    line-height: 24px;
  }

  .record p span {
    font-size: 20px;
    color: #666;
  }

  .collec p {
    font-size: 14px;
    color: #666;
    line-height: 30px;
    margin-left: 20px;
  }

  .collec p span {
    font-size: 20px;
    color: #666;
  }

  .remind_text {
    margin-left: 20px;
    margin-top: 20px;
  }

  .remind_text p {
    font-size: 14px;
    color: #666;
  }

  .remind_text b {
    color: #4c545d;
    font-size: 24px;
    line-height: 40px;
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
  }

  .qr {
    line-height: 42px;
    height: 42px;
    color: #333;
    background: #f9fafb;
    padding: 0 20px;
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
  }

  .ddd img {
    width: 100%;
    height: 100%;
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
  .ivu-btn-primary, .ivu-btn-primary:active,.ivu-btn-primary:hover{
    background: #32c296;
    border-color: #32c296;
  }
  .ivu-btn-text:hover,.ivu-btn-text{
    border:1px solid #dee4ed;
    background: #fff;
    color: #666;
  }
  .ivu-btn-text.active, .ivu-btn-text:active{
    border:1px solid #dee4ed;
    background: #fff;
    color: #666;
  }
</style>
