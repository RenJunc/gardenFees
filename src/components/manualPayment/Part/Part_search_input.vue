<template>
  <div class="search-input-warp" :style="{padding:warpPdpx}">
    <span v-if="labeText" class="label-span" :style="{width:labelW}"><i v-if="showStar">*</i>{{labeText}}</span>
    <div class="input-box">
      <!--<input type="text" class="input-style"-->
             <!--:style="{width:wpx,height:hpx}"-->
             <!--:placeholder="placeholder"-->
             <!--v-model="keyword"-->
             <!--@focus="focusFn"-->
             <!--@blur="blurFn">-->
      <input type="text"
             class="input-style"
             @blur="blurFn"
             :placeholder="placeholder"
             v-model.trim="keyword" @keyup="get($event)" @keydown.down.prevent="selectDown"
             @keydown.up.prevent="selectUp"
      >
      <ul class="ul-box" v-if="childData">
        <li class="text-center" v-for="(item,index) in childData" @click.stop="clickSchoolNameFn(item)">
          <span class="text-success textprimary" :class="{gray:index==now}">{{item.childName}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // 节流函数
  const delay = (function () {
    let timer = 0
    return function (callback, ms) {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  })()
  import API from '../../../api/api'
  export default {
    name: 'part_search_input',
    data () {
      return {
        isShow: false,
        keyword: this.setVal,
        keywordVal: "",
        clickSchool: false,
        childData:[],
        now:-1,
        childObj:{}
      }
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      wpx: {
        type: String,
        default: '150px'
      },
      hpx: {
        type: String,
        default: '34px'
      },
      labeText: {
        type: String,
        default: ''
      },
      labelW: {
        type: String,
        default: ''
      },
      showStar: {
        type: Boolean,
        default: false
      },
      warpPdpx: {
        type: String,
        default: '0 13px 0 0'
      },
      setVal:{
        type:String,
        default:''
      },
      id:{
        type:Number,
        default:0
      },
      Phone:{
        type:String,
        default:''
      },
      newType:{
        type:Number,
        default:0
      },

    },
    watch: {
      setVal: function (val) {
        this.keyword = val
        this.keywordVal = val
      },
      childData:function (val) {
        const that =this
        if(val==1){
          that.now = 0
        }
      },
      keywordVal:function (val) {
        this.$emit('inputVal',this.keywordVal)
      }
    },
    mounted(){

    },
    methods: {
      searchChildFn () {
        const that = this
        if (!that.keyword) {
          return false
        }
        let params = {
          classId:that.id,
          childName:that.keyword,
          childPhone:that.Phone
        }
        API.requestFindChildConditionApi(params).then((json) => {
          if(json.data.code === "000"){
            that.childData = json.data.data
          }else{
            that.$Message.error(json.data.msg)
          //  console.log(json.data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })

      },
      clickSchoolNameFn (obj) {
        const that = this
        that.childObj = obj
        that.keywordVal = obj.childName
        that.keyword = obj.childName
        if(that.newType!==3){
          that.keyword = ''
        }
        that.childData=[]
        that.$emit('setChildObj',obj)

      },
      blurFn () {
        const that = this
        setTimeout(function () {
          that.childData=[]
        },200)
        this.keyword = this.keyword.trim()
        this.$emit('inputContext',this.keyword)
      },
      get:function (event) {
        this.$emit('inputContext',this.keyword)
        const that = this
        if(event.keyCode==38||event.keyCode==40)return;
        if(event.keyCode==13){
          that.$emit('setChildObj',that.childObj)
          that.now=-1;
          if(that.newType!==3){
            that.keyword = ''
          }
          that.childData=[]
        }
        delay(() => {
          this.searchChildFn()
        }, 300)
      },
      selectDown:function () {
        const that =this
        that.now++;
        if(that.now==that.childData.length){
          that.now=-1;
        }
        if(that.now!=-1){
          that.keyword=this.childData[this.now].childName;
          that.keywordVal=this.childData[this.now].childName;
          that.childObj = this.childData[this.now]
        }else {
          if(that.newType!==3){
            that.keyword = ''
          }
          that.childObj = {}
        }


      },
      selectUp:function () {
        const that =this
        that.now--;
        if(that.now==-2){
          that.now=this.childData.length-1;
        }
        if(that.now!=-1){
          that.keyword=this.childData[this.now].childName;
          that.keywordVal=this.childData[this.now].childName;
          that.childObj = this.childData[this.now]
        }else {
          if(that.newType!==3){
            that.keyword = ''
          }
          that.childObj = {}
        }

      },
      emptyVal(){
        this.keyword = ''
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/stylesheets/common.scss';
  $starColor: #ff2222;
  $colorFFF: #ffffff;
  $placeholderColor: #bbbec4;
  .search-input-warp {
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
    padding-right: 13px;
    @include clearfix;
    .label-span {
      float: left;
      display: inline-block;
      text-align: right;
      min-width: 45px;
      font-size: 14px;
      line-height: 34px;
      vertical-align: middle;
      i {
        display: inline-block;
        padding: 0 5px;
        color: $starColor;
      }
    }
    .input-box {
      float: right;
      font-size: 14px;
      position: relative;
      display: inline-block;
      .input-style {
        display: inline-block;
        padding: 0px 7px;
        height: 32px;
        width: 300px;
        float: right;
        font-size: 14px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        &::-webkit-input-placeholder { /* WebKit browsers */
          color: $placeholderColor;
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: $placeholderColor;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: $placeholderColor;
        }
        &:-ms-input-placeholder { /* Internet Explorer 10+ */
          color: $placeholderColor;
        }
      }
      .ul-box {
        background-color: $colorFFF;
        box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.12);
        position: absolute;
        display: inline-block;
        top: 34px;
        left: 0;
        z-index: 10;
        width: 100%;
        li {
          width: 100%;
          display: inline-block;
          clear: both;
          line-height: normal;
          transition: background .2s ease-in-out;
          cursor: pointer;
          &:hover {
            background: rgba(53, 183, 143, 0.1);
          }
          .area-text{
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
    .gray{
      background: rgba(53, 183, 143, 0.1);
    }
    .textprimary{
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: "Microsoft YaHei UI";
      font-size: 14px;
      padding: 7px 16px;;
    }

  }
</style>
