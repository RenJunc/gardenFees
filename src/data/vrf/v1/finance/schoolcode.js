// 二维码
const codeList = {
  isOpend: 1,
  schoolName:'懒洋洋幼儿园',
  codeUrl:'y2.bbtree.com'
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
