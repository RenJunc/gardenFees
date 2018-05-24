// 手工缴费导入账单列表
const dataList = {
  data:[
    {
      itemName:'保教费',
      useCount:5
    },
    {
      itemName:'伙食费',
      useCount:4
    },
    {
      itemName:'退饭费',
      useCount:3
    },
    {
      itemName:'托管费',
      useCount:2
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
