// 提现记录列表
const exportRecord = {
  gecashrecordexport:1
}

const info = function () {
  const data = {
    code: '000',
    data: exportRecord,
    msg: 'msg信息_' + Math.floor(Math.random() * 100)
  }
  return data
}
console.log('请求')
module.exports = info
