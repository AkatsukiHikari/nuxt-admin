<!--
 * @Author: Hikari
 * @Date: 2020-04-02 10:06:22
 * @LastEditTime: 2022-07-08 15:18:28
 * @LastEditors: hikari 839491595@qq.com
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-framework/lib/components/Pagination/index.vue
-->
<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/lib/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50,200,1000,2000]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cum: this.limit,
      cp : this.page,
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.cp
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.cum
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },

  watch:{
    currentPage(val){
        // console.error("watched currentPage:"  , val);
        this.$emit('update:page', val)
    }
  },
  methods: {
    handleSizeChange(val) {
      this.cum = val;
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.cp = val;
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },

    setPage( page = 1 ){
      this.currentPage = page;
      this.cp = page;
      // console.error("setPage:" , this.currentPage);
    },

    reset(){
      this.currentPage = 1
      this.cp = 1;
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
