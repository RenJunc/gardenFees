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
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
  #app{
    display: flex;
    flex-direction: row;
  }
  ul,li{
    list-style: none;
  }
  .ul{
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
    border-left: 1px solid #ccc;
  }
</style>
