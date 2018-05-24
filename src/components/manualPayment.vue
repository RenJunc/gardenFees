<template>
  <div class="manualPayment">
    <ul class="payMent_ul">
      <li v-for="(item,index) in ulData" :key="index" :class="{active:index == getTabActive}" @click.stop="changeRouter(index)">
        <a>{{item}}</a>
      </li>
    </ul>
    <div class="payMent_div">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import classPayment from './manualPayment/classPayment'
  import newPayment from './manualPayment/newPayment'
  import childPayment from './manualPayment/childPayment'
  import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name: "manualPayment",
    data(){
      return {
        ulData:['按班收费', '按幼儿收费', '新入园收费'],
        num:0,
        routerName:'classPayment'
      }
    },
    watch:{
      "$route"(to, from) {
        this.routerName = to.name
      }
    },
    components:{
      childPayment,
      newPayment,
      classPayment
    },
    computed:{
      ...mapGetters('manualPayment', ['getTabActive'])
    },
    beforeCreate(){
    },
    methods:{
      changeRouter(index){
        const that =this
        that.$store.commit('manualPayment/setTabActive',index)
        that.num = index
        if(index === 2){
          this.$router.push({name:"newPayment"})
        }else if(index === 1){
          this.$router.push({name:"childPayment"})
        }else if(index === 0){
          this.$router.push({name:"classPayment"})
        }
      }
    },
    created(){

    },
    mounted(){
		  this.routerName = this.$route.name
      if(this.$route.path === '/manualPayment/newPayment'){
      }else if(this.$route.path === '/manualPayment/childPayment'){
      }else if(this.$route.path === '/manualPayment/classPayment'){
      }else if(this.$route.path === '/manualPayment/newPayment'){

      }
    }
	}
</script>

<style scoped>
  .manualPayment{
    margin: 0 16px;
  }
  ul,ol,li{
    list-style: none;
  }
  .payMent_ul{
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
  .payMent_ul li{
    width: 150px;
    height: 40px;
    box-sizing: border-box;
    text-align: center;
    line-height: 40px;
    float: left;
    overflow: hidden;
    cursor: pointer;
    color: #666;
  }
  .payMent_ul li a{
    color: #666;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    width: 150px;
    display: inline-block;
    height: 20px;
    margin:10px 0px;
    line-height: 20px;
  }
  .payMent_ul li:nth-child(2) a{
    border-right: none;
    border-left: none;
  }
  .payMent_ul li:nth-child(1) a{
    border-left: none;
  }
  .payMent_ul li.active{
    border-bottom: 2px solid #32c296;
    font-weight: bold;
    color: #32c296;
    outline: none;
  }
  .payMent_ul li.active a{
    color: #32c296;
  }
  .payMent_div{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
