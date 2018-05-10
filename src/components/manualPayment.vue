<template>
  <div class="manualPayment">
    <ul class="payMent_ul" @click.native="changeRouter">
      <li v-for="item,index in ulData" :class="{active:index == num}" @click="changeRouter(index)">{{item}}</li>
    </ul>
    <div class="payMent_div">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
	export default {
		name: "manualPayment",
    data(){
      return {
        ulData:['按班收费', '按幼儿收费', '新入园收费'],
        num:0,
        index:0
      }
    },
    methods:{
      changeRouter(index){
        this.num = index
        if(index === 0){
          this.$router.push({name:"classPayment"})
        }else if(index === 1){
          this.$router.push({name:"childPayment"})
        }else{
          this.$router.push({name:"newPayment"})
        }
      }
    },
    mounted(){
      console.log(this.$route.path)
      if(this.$route.path === '/newPayment'){
        this.num = 2
      }else if(this.$route.path === '/childPayment'){
        this.num = 1
      }else{
        this.num = 0
      }
    }
	}
</script>

<style scoped>
  ul,ol,li{
    list-style: none;
  }
  .payMent_ul{
    width: 100%;
    height: 30px;
    margin-top: 10px;
  }
  .payMent_ul li{
    border-top:1px solid #ccc;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    float: left;
    padding: 10px 30px;
    cursor: pointer;
  }
  .payMent_ul li.active{
    border-bottom:none;
    font-weight: bold;
  }
  .payMent_div{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
