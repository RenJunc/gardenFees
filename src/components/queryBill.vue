<template>
    <div class="queryBill">
      <h3>账单查询</h3>
      <div class="queryBill_tit">
        <label>
          <span>账单发送日期</span>
          <DatePicker
            type="daterange"
            placement="bottom-end"
            style="width: 180px"
            @on-change="changeTime"
            v-model="payMentDate"
          ></DatePicker>
        </label>
        <label>
          <span>账单名称</span>
          <Input v-model="billName" placeholder="" style="width: 150px"/>
        </label>
        <label>
          <span class="search" @click="search">查询</span>
        </label>
      </div>
      <div class="queryBill_table">
        <Table border :columns="columns" :data="list"></Table>
      </div>
      <div class="page">
        <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>
      </div>
    </div>
</template>

<script>
	export default {
		name: "queryBill",
    data(){
		  return {
        billName:'',
        columns: [
          {
            title: '账单名称',
            key: 'billName'
          },
          {
            title: '发送时间',
            key: 'sendTime'
          },
          {
            title: '到期时间',
            key: 'endTime'
          },
          {
            title: '实收/应收金额',
            key: 'sumPrice'
          },
          {
            title: '待收金额',
            key: 'unSumPrice'
          },
          {
            title: '成功数/总数',
            key: 'successNem'
          },
          {
            title: '未缴费数',
            key: 'unPay'
          },
          {
            title: '操作',
            key: 'action',
            width: 260,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.index)
                      this.$router.push({name:"checkDetail"})
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '缴费账单下载'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '一键催费')
              ]);
            }
          }
        ],
        data: [
          {
            billName: '2月账单',
            sendTime: '2018-04-10 16：40：44',
            endTime:'无',
            sumPrice:'8888/9999',
            unSumPrice:'111',
            successNem:'1',
            unPay:'0'
          },
          {
            billName: '3月账单',
            sendTime: '2018-04-10 16：40：44',
            endTime:'无',
            sumPrice:'8888/9999',
            unSumPrice:'111',
            successNem:'2',
            unPay:'0'
          },
          {
            billName: '4月账单',
            sendTime: '2018-04-10 16：40：44',
            endTime:'无',
            sumPrice:'8888/9999',
            unSumPrice:'111',
            successNem:'3',
            unPay:'0'
          }
        ],
        list:[],
        total:0,
        pageSize:10,
        payMentDate:null
      }
    },
    methods:{
      search(){
        let data = {
          payStartTime:this.payMentDate !== null ? this.payMentDate[0] : '',
          payEndTime:this.payMentDate !== null ? this.payMentDate[1] : '',
          billName:this.billName
        }
        console.log(data)
      },
      change(page){
        this.list = this.data.slice(this.pageSize * (page - 1), this.pageSize * (page - 1) + this.pageSize)
      },
      size(page){
        this.pageSize = page
        this.list = this.data.slice(0,page)
      },
      changeTime(date){
        console.log(date)
        if (this.payMentDate === null || this.payMentDate.length !== 2) {
          this.payMentDate = []
        }else{
          this.payMentDate = date
        }
      },
    },
    mounted(){
      this.total  = this.data.length,
        this.list = this.data.slice(0,this.pageSize)
    }
	}
</script>

<style scoped>
  h3{
    line-height: 40px;
    color: #333;
    margin-left: 20px;
  }
  .search {
    /*float: right;*/
    display: inline-block;
    width: 70px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: #32c296;
    border-radius: 4px;
    cursor: pointer;
  }
  .queryBill_tit{
    line-height: 30px;
  }
  .queryBill_tit label{
    margin-left: 20px;
  }
  .queryBill_tit label span{
    margin-right: 10px;
  }
  .queryBill_table{
    margin-top: 20px;
  }
  .page{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
</style>
