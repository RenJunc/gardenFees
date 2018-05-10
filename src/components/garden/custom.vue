<template>
  <div class="custom">
    <div class="custom_tit">{{tit}}<span @click="jump">{{tit_span}}</span></div>
  </div>
</template>

<script>
	export default {
		name: "custom",
    props:{
		  tit:{
		    default:'账户余额'
      },
      tit_span:{

      }
    },
    methods:{
      jump(){
        this.$emit('custom-event')
      }
    }
	}
</script>

<style>
  .custom{
    background: #f9fafb;
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
  }

  .custom_tit{
    line-height: 42px;
    color: #333;
    font-size: 14px;
  }
  .custom_tit span{
    float: right;
    cursor: pointer;
    font-size: 14px;
    color: #32c296;
  }
</style>
