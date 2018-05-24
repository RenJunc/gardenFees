<template>
    <div class="record">
      <h3>提现记录</h3>
      <Table border :columns="columns7" :data="list"></Table>
      <div class="page">
        <a href="https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/gecashrecordexport">
          <Button type="primary" class="export" >导出Excel</Button>
        </a>
        <!--<Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>-->
        <PartPage :table-data="list"  class="page_page" :total="total" :current="curPage" :page-size="pageSize"
                  @changePage="changePage" @changePageSize="changePageSize"></PartPage>
      </div>
    </div>
</template>

<script>
  import API from '../../api/api'
  import PartPage from '../Part/part_page'

  export default {
		name: "record",
    data () {
      return {
        columns7: [
          {
            title: '创建时间',
            key: 'createDate'
          },
          {
            title: '金额（元）',
            key: 'money'
          },
          {
            title: '收款账户',
            key: 'drawBankCard'
          },
          {
            title: '操作人',
            key: 'drawName'
          },
          {
            title: '状态',
            key: 'theStatus',
            render:(h,params) => {
              return h('span',this.theStatus(params.row.theStatus));
            }
          },
          {
            title: '备注',
            key: 'memo'
          },
          {
            title: '操作',
            key: 'address',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  'class': {
                    hoverSapn: true
                  },
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      window.open('https://javaport.bbtree.com/erpfinanceapi/vrf/v1/finance/billcashprint?billId='+params.row.id)
                    }
                  }
                }, '打印')
              ]);
            }
          },
        ],
        data6: '',
        list:[],
        total:0,
        pageSize:10,
        curPage:1
      }
    },
    created(){
      this.requestDrawlistApi({curPage:1})
    },
    components:{
      PartPage
    },
    methods: {
		  /*
		  * 提现记录列表
		  * */
      requestDrawlistApi(obj={}){
        let params ={
          curPage: this.curPage,
          pageSize: this.pageSize
        }
        if (obj.curPage) {
          params.curPage = obj.curPage
        }
        API.requestDrawlistApi(params).then(json => {
          if(json.data.code==='000'){
            let data = json.data.data;
            this.list = data.items;
            this.pageSize = data.pageSize
            this.total = data.count
            this.curPage = data.curPage
          }else {
            console.log(json.data.msg);
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      /*change(page){
        this.curPage = page
        this.requestDrawlistApi()
      },
      size(page){
        this.pageSize = page
        this.requestDrawlistApi({curPage: 1})
      },*/
      changePage (page) {
        this.curPage = page
        this.requestDrawlistApi()
      },
      changePageSize (page) {
        this.pageSize = page
        this.requestDrawlistApi({curPage: 1})
      },
      theStatus(type){
        if(type === 1){
          return '提现中'
        }else if(type === 2){
          return '提现成功'
        }else if(type === 3){
          return '提现失败'
        }
      },
    }
	}
</script>

<style scoped>
  .record{
    margin: 0 16px;
  }
h3{
  line-height: 40px;
  color: #333;
  margin-left: 20px;
  font-size: 16px;
}
  .page{
    margin-top: 10px;
  }
  .export{
    float: left;
    margin-left: 20px;
  }
  .page_page{
    float: right;
    margin-right: 20px;
  }
</style>

