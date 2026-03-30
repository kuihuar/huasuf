<template>
  <div class="pagebar" v-if="totalPages > 1">
    <div class="pagebar-mobile">
      <span
        :class="['pagebar-mobile__btn', currentPage === 1 ? 'is-disabled' : '']"
        role="button"
        tabindex="0"
        @click="prevPage"
        @keydown.enter.prevent="prevPage"
      >上页</span>
      <span class="pagebar-mobile__mid">第 {{ currentPage }} / {{ totalPages }} 页</span>
      <span
        :class="['pagebar-mobile__btn', currentPage === totalPages ? 'is-disabled' : '']"
        role="button"
        tabindex="0"
        @click="nextPage"
        @keydown.enter.prevent="nextPage"
      >下页</span>
    </div>
    <div class="pagebar-desktop">
      <span class="p_pages">
        <span
          :class="['p_first', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
          @click="goToPage(1)"
        >首页</span>
        <span
          :class="['p_prev', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
          @click="prevPage"
        >上页</span>
        <template v-for="page in visiblePages" :key="page">
          <span v-if="page === currentPage" class="p_no_d">{{ page }}</span>
          <span v-else class="p_no" @click="goToPage(page)">{{ page }}</span>
        </template>
        <span v-if="currentPage + 2 < totalPages" class="p_dot">...</span>
        <span
          v-if="totalPages > 1 && !visiblePages.includes(totalPages)"
          class="p_no"
          @click="goToPage(totalPages)"
        >{{ totalPages }}</span>
        <span
          :class="['p_next', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
          @click="nextPage"
        >下页</span>
        <span
          :class="['p_last', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
          @click="goToPage(totalPages)"
        >尾页</span>
      </span>
    </div>
    <span v-if="showTotal" class="p_t">共{{ totalCount }}条</span>
  </div>
</template>

<script>
export default {
  name: 'PageBar',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      default: null
    }
  },
  emits: ['change'],
  computed: {
    showTotal() {
      return this.totalCount != null && this.totalCount >= 0
    },
    visiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    emitChange(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      this.$emit('change', page)
    },
    goToPage(page) {
      this.emitChange(page)
    },
    prevPage() {
      if (this.currentPage <= 1) return
      this.emitChange(this.currentPage - 1)
    },
    nextPage() {
      if (this.currentPage >= this.totalPages) return
      this.emitChange(this.currentPage + 1)
    }
  }
}
</script>

<style scoped>
.pagebar {
  margin-top: 2rem;
  text-align: center;
}

.pagebar-mobile {
  display: none;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
}

.pagebar-mobile__btn {
  min-height: 44px;
  min-width: 72px;
  padding: 0 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
}

.pagebar-mobile__btn.is-disabled {
  cursor: not-allowed;
  color: #999;
  background: #f5f5f5;
  border-color: #e0e0e0;
}

.pagebar-mobile__mid {
  font-size: 0.9rem;
  color: #555;
  min-width: 7em;
  text-align: center;
}

.pagebar-desktop {
  display: block;
}

.p_pages {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
}

.p_first,
.p_prev,
.p_next,
.p_last,
.p_no {
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  margin: 0 0.08rem;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  box-sizing: border-box;
  transition: all 0.2s;
}

.p_first:hover,
.p_prev:hover,
.p_next:hover,
.p_last:hover,
.p_no:hover {
  background: #284ca7;
  color: #fff;
  border-color: #284ca7;
}

.p_fun_d {
  cursor: not-allowed;
  background: #f5f5f5;
  color: #999;
  border-color: #e0e0e0;
}

.p_fun_d:hover {
  background: #f5f5f5;
  color: #999;
  border-color: #e0e0e0;
}

.p_no_d {
  padding: 0.2rem 0.4rem;
  margin: 0 0.08rem;
  background: #284ca7;
  color: #fff;
  border: 1px solid #284ca7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  box-sizing: border-box;
}

.p_dot {
  padding: 0.2rem 0.4rem;
  color: #999;
}

.p_t {
  display: block;
  margin-top: 0.75rem;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 576px) {
  .pagebar-mobile {
    display: flex;
  }

  .pagebar-desktop {
    display: none;
  }
}
</style>
