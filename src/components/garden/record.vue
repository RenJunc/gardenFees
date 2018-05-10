<template>
    <div class="record">
      <h3>提现记录</h3>
      <Table border :columns="columns7" :data="list"></Table>
      <div class="page">
        <Button type="primary" class="export">导出Excel</Button>
        <Page :total="total" :page-size="pageSize" size="small" show-elevator show-sizer class="page_page" @on-change="change" @on-page-size-change="size"></Page>
      </div>
    </div>
</template>

<script>
	export default {
		name: "record",
    data () {
      return {
        columns7: [
          {
            title: '创建时间',
            key: 'releaceDate'
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
            key: 'userName'
          },
          {
            title: '状态',
            key: 'theStatus'
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
                      this.show(params)
                    }
                  }
                }, '打印')
              ]);
            }
          },
        ],
        data6: [
          {
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波1',
            theStatus:'成功',
            memo:'提4月份学费',
            id:'0',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'1',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波2',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'2',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波3',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'3',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波4',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'4',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波5',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'5',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波6',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'6',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波7',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'7',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波8',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'8',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波9',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'9',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波10',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'10',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波11',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'11',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波12',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'12',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波13',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'13',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波14',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'14',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波15',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'15',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波16',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'16',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波17',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'17',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波18',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'18',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波19',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'19',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波20',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'20',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波21',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'21',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波22',
            theStatus:'成功',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'22',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波23',
            theStatus:'失败',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          },
          {
            id:'23',
            releaceDate: '2018-04-05 10：30：55',
            money:'1000',
            drawBankCard:'招商银行***1424',
            userName:'陈波24',
            theStatus:'处理中',
            memo:'提4月份学费',
            address: 'New York No. 1 Lake Park'
          }
        ],
        list:[],
        total:0,
        pageSize:10
      }
    },
    methods: {
      show (index) {
        console.log(index.row.id)
      },
      change(page){
        this.list = this.data6.slice(this.pageSize * (page - 1), this.pageSize * (page - 1) + this.pageSize)
      },
      size(page){
        this.pageSize = page
        this.list = this.data6.slice(0,page)
      },
    },
    mounted(){
      this.total  = this.data6.length,
      this.list = this.data6.slice(0,this.pageSize)
    }
	}
</script>

<style scoped>
  body{
    background: #fff;
  }
h3{
  line-height: 40px;
  color: #333;
  margin-left: 20px;
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
