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
                        <button @click="loadNotices" class="retry-btn">重试</button>
                    </div>
                    
                    <!-- 人才招聘列表 -->
                    <ul v-else class="list20">
                        <li v-for="notice in notices" :key="notice.ID" data-aos="fade-up">
                            <a :href="`/notice/${notice.ID}`" target="_blank" :title="notice.title" class="a">
                                <div class="time">
                                    <h3>{{ formatDay(notice.CreatedAt) }}</h3>
                                    <h6>{{ formatMonth(notice.CreatedAt) }}</h6>
                                </div>
                                <div class="con">
                                    <h4 class="l1 h4s1">{{ notice.title }}</h4>
                                    <p class="l2 ps2">{{ notice.summary || '' }}</p>
                                </div>
                            </a>
                        </li>
                        
                        <!-- 空状态 -->
                        <li v-if="notices.length === 0" class="empty-state">
                            <div class="empty-text">暂无人才招聘信息</div>
                        </li>
                    </ul>
                    
                    <!-- 分页 -->
                    <div v-if="!loading && !error && total > pageSize" class="pagebar">
                        <span class="p_pages">
                            <span 
                                :class="['p_first', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
                                @click="goToPage(1)"
                            >
                                首页
                            </span>
                            <span 
                                :class="['p_prev', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
                                @click="goToPage(currentPage - 1)"
                            >
                                上页
                            </span>
                            
                            <!-- 页码 -->
                            <span 
                                v-for="page in visiblePages" 
                                :key="page"
                                :class="['p_no', page === currentPage ? 'p_no_d' : '']"
                                @click="goToPage(page)"
                            >
                                {{ page }}
                            </span>
                            
                            <span 
                                :class="['p_next', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
                                @click="goToPage(currentPage + 1)"
                            >
                                下页
                            </span>
                            <span 
                                :class="['p_last', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
                                @click="goToPage(totalPages)"
                            >
                                尾页
                            </span>
                        </span>
                        <span class="p_t">共{{ total }}条</span>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { getNoticeList } from '@/api/notice.js'

export default {
    name: 'TalentRecruitment',
    data() {
        return {
            notices: [],
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
                const response = await getNoticeList({
                    page: this.currentPage,
                    pageSize: this.pageSize
                })
                
                if (response.code === 0) {
                    this.notices = response.data.info || []
                    this.total = response.data.total || 0
                } else {
                    this.error = response.msg || '获取人才招聘列表失败'
                }
            } catch (err) {
                console.error('获取人才招聘列表失败:', err)
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

.loading-container, .error-container {
    text-align: center;
    padding: 40px 0;
}

.loading-text, .error-text {
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
