// 班级列表
const dataList = []
for (let i = 0; i < 20; i++) {
  let obj = {
    classId:'1'+i,
    className: '班级名称_'+i

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
