<template>
    <section class="n_container">
        <section class="news">
            <div class="fl01 n_pad1">
                <div class="wp">
                    <!-- 加载状态 -->
                    <div v-if="loading" class="loading-container">
                        <div class="loading-text">加载中...</div>
                    </div>


                    <!-- 错误状态 -->
                    <div v-else-if="error" class="error-container">
                        <div class="error-text">{{ error }}</div>
                        <button @click="loadNoticeDetail" class="retry-btn">重试</button>
                    </div>

                    <!-- 公告详情 -->
                    <div v-else>
                        <div class="empty-text">暂无公告信息</div>
                    </div>

                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { getNoticeDetail } from '@/api/notice.js'

export default {
    name: 'NotificationsDetail',
    data() {
        return {
            notice: {},
            loading: false,
            error: null,
            currentPage: 1,
            pageSize: 2,
            total: 0
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize)
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
    mounted() {
        this.loadNotices()
    },
    methods: {
        async loadNotices() {
            this.loading = true
            this.error = null

            try {
                const response = await getNoticeDetail(this.id)

                if (response.code === 0) {
                    this.notices = response.data.info || []
                    this.total = response.data.total || 0
                } else {
                    this.error = response.msg || '获取公告详情失败'
                }
            } catch (err) {
                console.error('获取公告详情失败:', err)
                this.error = '网络错误，请稍后重试'
            } finally {
                this.loading = false
            }
        },

        goToPage(page) {
            if (page < 1 || page > this.totalPages || page === this.currentPage) {
                return
            }
            this.currentPage = page
            this.loadNotices()
        },

        formatDay(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            return date.getDate().toString().padStart(2, '0')
        },

        formatMonth(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            return `${year}-${month}`
        }
    }
}
</script>

<style scoped>
.notifications {
    padding: 100px 0;
}

.loading-container,
.error-container {
    text-align: center;
    padding: 40px 0;
}

.loading-text,
.error-text {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.retry-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.retry-btn:hover {
    background-color: #0056b3;
}

.empty-state {
    text-align: center;
    padding: 40px 0;
}

.empty-text {
    font-size: 16px;
    color: #999;
}

.p_pages span {
    cursor: pointer;
    user-select: none;
}

.p_fun {
    cursor: pointer;
}

.p_fun_d {
    cursor: not-allowed;
    color: #ccc;
}

.p_no {
    cursor: pointer;
}

.p_no_d {
    background-color: #007bff;
    color: white;
}

/* 保持原有样式 */
.list20 li {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
}

.list20 li:last-child {
    border-bottom: none;
}

.time h3 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 0;
}

.time h6 {
    font-size: 14px;
    color: #666;
    margin: 5px 0 0 0;
}

.con h4 {
    font-size: 16px;
    font-weight: normal;
    color: #333;
    margin: 0 0 10px 0;
    line-height: 1.5;
}

.con p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.4;
}

.pagebar {
    margin-top: 30px;
    text-align: center;
}

.p_pages {
    display: inline-block;
    margin-right: 20px;
}

.p_pages span {
    display: inline-block;
    padding: 8px 12px;
    margin: 0 2px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
}

.p_t {
    color: #666;
    font-size: 14px;
}
</style>
