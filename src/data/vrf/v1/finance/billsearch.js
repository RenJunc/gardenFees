// 账单列表
const dataList = {
  count:100,
  list:[],
  pageSize:20,
  curPage:1
}
for (let i = 0; i < 20; i++) {
  let obj = {
    name: '账单名称_'+i,
    releaseDatetime: new Date().toLocaleDateString(),
    childPhone: 13333333333,
    total:200,
    Double:2001,
    receiveMoney:12312,
    endDatetime:new Date().toLocaleDateString(),
    unPayMony:23123,
    totalpay:21312,
    successpay:12312312,
    unpay:11,
    billId:i+1
  }
  dataList.list.push(obj)
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
