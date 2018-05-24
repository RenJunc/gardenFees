<template>
  <div class="class-list-wrap">
    <label>
      <span>班级：</span>
      <Select v-model="classId" style="width:150px" @on-change="changeVal">
        <Option v-for="item in dataArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </label>
  </div>
</template>

<script>
  import API from '../../api/api'
  export default {
    name: 'class_list_select',
    data(){
      return {
        listData:[],
        classId:''
      }
    },
    created(){
      const that = this
      let params = {}
      API.requestClassListApi(params).then(function (json) {
        if (json.data.code === '000') {
          that.listData = json.data.data
          that.listData.unshift({classId:'',className:'全部'})
        } else {
          console.log(json.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    computed:{
      dataArr:function () {
        if(!this.listData.length){
          return []
        }
        return this.listData.map(function (item) {
          return{
            value: item.classId+'',
            label: item.className
          }
        })
      }
    },
    methods:{
      changeVal(val){
        console.log('changeVal_'+val);
        this.$emit('changeVal',val)
      }
    }
  }
</script>

<style lang="scss" scoped>
.class-list-wrap{
  display: inline-block;
  label{
    display: inline-block;
    font-size: 0;
    span{
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
</style>
