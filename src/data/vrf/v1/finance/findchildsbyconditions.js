// 提现记录列表
const dataList = {
  data:[
    {
      childId: 1,
      childName:'王小虎',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 2,
      childName:'王小虎2',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 3,
      childName:'王小虎3',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 4,
      childName:'王小虎4',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 5,
      childName:'王小虎5',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 6,
      childName:'王小虎6',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
    },
    {
      childId: 7,
      childName:'王小虎7',
      childPhone:'17710320074',
      classId:20,
      className:'小二班'
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
