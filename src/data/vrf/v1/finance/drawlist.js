// 提现记录列表
const dataList = {
  curPage: 1,
  pageSize:10,
  count:2,
  items:[
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'100',
      drawBankCard:'北京银行',
      userName:'王小佳',
      theStatus:'1',
      memo:'第一条数据',
      id:'1'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'40',
      drawBankCard:'北京银行',
      userName:'王晓萌',
      theStatus:'3',
      memo:'第二条数据',
      id:'2'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'2.3',
      drawBankCard:'北京银行',
      userName:'王小明',
      theStatus:'2',
      memo:'第三条数据',
      id:'3'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'100',
      drawBankCard:'北京银行',
      userName:'张晓菲',
      theStatus:'1',
      memo:'第四条数据',
      id:'4'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'100',
      drawBankCard:'北京银行',
      userName:'王小佳',
      theStatus:'1',
      memo:'第一条数据',
      id:'5'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'40',
      drawBankCard:'北京银行',
      userName:'王晓萌',
      theStatus:'3',
      memo:'第二条数据',
      id:'6'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'2.3',
      drawBankCard:'北京银行',
      userName:'王小明',
      theStatus:'2',
      memo:'第三条数据',
      id:'7'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'100',
      drawBankCard:'北京银行',
      userName:'张晓菲',
      theStatus:'1',
      memo:'第四条数据',
      id:'8'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'100',
      drawBankCard:'北京银行',
      userName:'王小佳',
      theStatus:'1',
      memo:'第一条数据',
      id:'9'
    },
    {
      releaceDate:'2018-04-05 10：30：55',
      money:'40',
      drawBankCard:'北京银行',
      userName:'王晓萌',
      theStatus:'3',
      memo:'第二条数据',
      id:'10'
    }
  ]
}

const info = function () {
  const data = {
    code: '000',
    data: dataList,
    msg: 'msg信息_' + Math.floor(Math.random() * 100)
  }
  return data
}
console.log('请求')
module.exports = info
