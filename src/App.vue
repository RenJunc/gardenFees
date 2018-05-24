<template>
  <div id="app">
    <ul class="ul">
      <router-link to="/Garden">
        <li>首页导航</li>
      </router-link>
      <router-link to="/payCost">
        <li>智能缴费</li>
      </router-link>
      <router-link to="/manualPayment">
        <li>手工缴费</li>
      </router-link>
      <router-link to="/payMentRecordEnquiry">
        <li>缴费记录查询</li>
      </router-link>
      <router-link to="/queryBill">
        <li>账单查询</li>
      </router-link>
    </ul>
    <div class="context">
      <router-view :key="path" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      path: '/root',
      items:[]
    }
  },
  computed:{},
  watch: {
    "$route"(to, from) {
      this.path = to.fullPath
    }
  },
  mounted(){
    //解决使用vue-router 在IE下 a标签里的路由不跳转
    function checkIE(){
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  }
}
</script>

<style lang="scss">
  @import '~@/stylesheets/base/reset.scss';
</style>
<style lang="scss" scoped>
  #app{
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  ul,li{
    list-style: none;
  }
  .ul{
    border-right: 1px solid #eee;
    width: 100px;
    float: left;
    flex-shrink: 0;
    margin-left: 20px;
  }
  .ul li{
    line-height: 40px;
    cursor: pointer;    color: #333;

  }
  .context{
    flex: 1;
    box-sizing: border-box;
    min-width: 1000px;
  }
</style>
