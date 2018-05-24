// 缴费状态合集
const dataList = []
for (let i = 0; i < 20; i++) {
  let obj = {
    value:1+i,
    label: '状态'+i

  }
  dataList.push(obj)
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
