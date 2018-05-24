// 待缴费记录列表
const dataList = {
  curPage: 1,
  pageSize:20,
  totalMoney:1000,
  payTotalMoney:200,
  statisticsCount:20,
  payCount:40,
  count:100,
  billName:'账单名称',
  closeDatetime:'2018-01-02',
  createDatetime:'2018-01-01',
  items:[]
}
for (let i = 0; i < 20; i++) {
  let obj = {
    childName:'王小虎4_'+i,
    className:'大一班_'+i,
    childPhone:'17710320074',
    total:'500'+i,
    theStatus:5,
    payId:7,
    isCharge:i%2==0 ? 0 : 1

  }
  dataList.items.push(obj)
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
