// 批次一键催费
const codeList = {

}

const info = function () {
  const data = {
    code: '000',
    data: codeList,
    msg: 'msg信息_' + Math.floor(Math.random() * 100)
  }
  return data
}
console.log('请求')
module.exports = info
