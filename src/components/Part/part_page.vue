<template>
  <div class="page-wrap">
    <Page
      size="small" show-elevator show-sizer
      class="page-style"
      :page-size="pageSize"
      :total="total"
      :current="current"
      @on-change="changePage"
      @on-page-size-change="changePageSize">
    </Page>
    <div class="page-info">
      <p>
        <span>显示{{pageIndex[0]}}条至{{pageIndex[1]}}条，</span><span>共{{total}}条记录</span>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'part_page',
    props: {
      total: {
        default: 0
      },
      current: {
        default: 1
      },
      pageSize: {
        default: 20
      },
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      pageIndex: function () {
        const that = this
        if (that.current < 2) {
          return [1, that.tableData.length]
        } else {
          return [(that.current - 1) * that.pageSize + 1, (that.current - 1) * that.pageSize + that.tableData.length]
        }
      }
    },
    methods: {
      changePage (val) {
        this.$emit('changePage', val)
      },
      changePageSize (val) {
        this.$emit('changePageSize', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/stylesheets/common.scss';
  .page-wrap {
    font-size: 12px;
    line-height: 34px;
    padding: 10px 0;
    @include clearfix;
    .page-info {
      float: right;
      display: inline-block;
      padding-right: 20px;
    }
    .page-style {
      float: right;
    }
  }
</style>
