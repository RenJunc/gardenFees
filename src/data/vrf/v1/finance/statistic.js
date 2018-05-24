// 学校列表
const dataList = {
  balance: 1000.55,
  availableBalance:100.55,
  dayMoney:22222.55,
  online: 3333.55,
  offline: 44444.55,
  owingNum: 55,
  owingMoney: 500.55
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
