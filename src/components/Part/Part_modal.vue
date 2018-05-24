<template>
  <div>
    <Modal
      v-model="modal1"
      :title="titleText"
      @on-ok="ok"
      @on-cancel="cancel">
       <slot class="main" name="main"></slot>
    </Modal>
  </div>
</template>

<script>
  import PartPayStauts from '../Part/part_pay_status_type_select'

  export default {
    name: 'part_modal',
    props: {
      isShow: {
        type: Boolean,
        default: false,
      },
      titleText: {
        type: String,
        default: '',
      },
      isEditPayType: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        modal1: this.isShow,
        payType: ''
      }
    },
    watch: {
      isShow: function (val) {
        this.modal1 = val
      }
    },
    methods: {
      changeTypeFn (val) {
        this.payType = val
      },
      ok () {
        const that = this
        if (!that.payType) {
          this.$emit('clickOk')
          return false
        }
        this.$emit('clickOk',{payId:that.data.payId,total: that.data.total,payType:that.payType})
      },
      cancel () {
        this.$emit('clickCancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    font-size: 14px;
    padding: 0 30px;
  }
</style>
