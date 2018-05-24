// 账单列表
const dataList = {
  serial:123123123,
  name:'账单名称_',
  childName:'学生姓名_',
  className:'班级名称_',
  childPhone:'12312312312',
  total:1000,
  itemsContent:[],
  memo:'备注',
  payStatus:5,
  payType:2,
  releaseDatetime:'2018-01-01',
  closeDatetime:'2018-01-02',
  payDatetime:'2018-01-01',
  orderNo:'11111111111',
  payId:'1',
}
for (let i = 0; i < 20; i++) {
  let obj = {
    name:'收费项目名称_'+i,
    money:10000+i,
  }
  dataList.itemsContent.push(obj)
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
