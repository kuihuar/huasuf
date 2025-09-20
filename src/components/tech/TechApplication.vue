<template>
    <section class="tech-application">
        <div class="fl01 n_pad1">
            <div class="wp">
                <!-- 加载状态 -->
                <div v-if="loading" class="loading">
                    <p>正在加载应用案例...</p>
                </div>

                <!-- 错误状态 -->
                <div v-else-if="error" class="error">
                    <p>{{ error }}</p>
                    <button @click="loadData" class="retry-btn">重试</button>
                </div>

                <!-- 新闻列表 -->
                <ul v-else class="list21">
                    <li v-for="(project, index) in projects" :key="index" data-aos="fade-up">
                        <a :href="getProjectLink(project)" target="_blank" :title="project.title" class="a">
                            <div class="con">
                                <h4 class="l1 h4s1">{{ project.title }}</h4>
                                <p class="l2 ps2">
                                    {{ project.description }}
                                </p>
                                <h6>[{{ getDate(project) }}]</h6>
                            </div>
                            <div class="img slow img_zd">
                                <div class="img_hezi" :style="{ background: `url(${getProjectImage(project)})` }">
                                </div>
                                <img :src="getProjectImage(project)" :alt="project.title" class="none" />
                            </div>
                        </a>
                    </li>
                </ul>

                <!-- 动态分页组件 -->
                <div class="pagebar" v-if="!loading && !error && totalPages > 1">
                    <span class="p_pages">
                        <!-- 首页 -->
                        <span :class="['p_first', currentPage === 1 ? 'p_fun_d' : 'p_fun']" @click="goToPage(1)">
                            首页
                        </span>

                        <!-- 上一页 -->
                        <span :class="['p_prev', currentPage === 1 ? 'p_fun_d' : 'p_fun']" @click="prevPage">
                            上页
                        </span>

                        <!-- 页码 -->
                        <template v-for="page in visiblePages" :key="page">
                            <span v-if="page === currentPage" class="p_no_d">
                                {{ page }}
                            </span>
                            <span v-else class="p_no" @click="goToPage(page)">
                                {{ page }}
                            </span>
                        </template>

                        <!-- 省略号 -->
                        <span v-if="currentPage + 2 < totalPages" class="p_dot">...</span>

                        <!-- 最后一页 -->
                        <span v-if="totalPages > 1 && !visiblePages.includes(totalPages)" class="p_no"
                            @click="goToPage(totalPages)">
                            {{ totalPages }}
                        </span>

                        <!-- 下一页 -->
                        <span :class="['p_next', currentPage === totalPages ? 'p_fun_d' : 'p_fun']" @click="nextPage">
                            下页
                        </span>

                        <!-- 尾页 -->
                        <span :class="['p_last', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
                            @click="goToPage(totalPages)">
                            尾页
                        </span>
                    </span>

                    <!-- 总数显示 -->
                    <span class="p_t">共{{ totalCount }}条</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { getLatestConstructions } from '@/api/construction.js'
import { API_CONFIG } from '@/config/api.js'
import { map } from 'lodash'


export default {
    name: 'ProjectShowcase',
    data() {
        return {
            projects: [],
            loading: false,
            error: null
        }
    },
    async mounted() {
        await this.fetchProjects()
    },
    methods: {
        async fetchProjects() {
            this.loading = true
            this.error = null

            try {
                const response = await getLatestConstructions(4) // 获取4个项目

                if (response.code === 0 && response.data && response.data.list) {
                    this.projects = response.data.list.map(project => ({
                        ...project,
                        images: map(project.images, image => API_CONFIG.BASE_URL + image)
                    }))
                } else {
                    throw new Error(response.msg || '获取项目数据失败')
                }
            } catch (error) {
                console.error('获取项目数据失败:', error)
                this.error = error.message || '网络错误，请稍后重试'
                // 如果API失败，使用默认数据作为后备
                this.projects = this.getDefaultProjects()
            } finally {
                this.loading = false
            }
        },

        getProjectImage(project) {
            // 如果有图片数据，使用第一张图片
            if (project.images && project.images.length > 0) {
                // 假设图片路径需要添加基础URL前缀
                return project.images[0]
            }
            // 默认图片
            return '/src/assets/images/project-default.jpg'
        },

        getProjectLink(project) {
            // 可以根据项目ID生成详情页链接
            return `#/project/${project.ID}`
        },
        getDate(project) {
            const d = new Date(project.scheduleddate);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
      //    return project.scheduleddate.split(' ')[0]
    },

        // 默认项目数据作为后备
        getDefaultProjects() {
            return [
                {
                    ID: 1,
                    title: '太原南站',
                    description: '太原南站是山西省最大的铁路客运站，总建筑面积约20万平方米。',
                    images: ['/src/assets/images/project1.jpg']
                },
                {
                    ID: 2,
                    title: '山西大剧院',
                    description: '山西大剧院是山西省标志性文化建筑，总建筑面积约7.8万平方米。',
                    images: ['/src/assets/images/project2.jpg']
                },
                {
                    ID: 3,
                    title: '太原国际机场T3航站楼',
                    description: '太原国际机场T3航站楼是山西省重要的交通枢纽。',
                    images: ['/src/assets/images/project3.jpg']
                },
                {
                    ID: 4,
                    title: '山西体育中心',
                    description: '山西体育中心是山西省最大的综合性体育场馆。',
                    images: ['/src/assets/images/project4.jpg']
                }
            ]
        }
    }
}
</script>


<style scoped>
/* 现有样式保持不变 */
.list21 li {
    margin-bottom: .52rem;
    position: relative;
    z-index: 1;
}

.list21 li * {
    transition: .5s;
}

.list21 li .a {
    display: flex;
    align-items: center;
    background: #fff;
    padding: .26rem .44rem;
    border: #fff 1px solid;
}

.list21 li .a::before {
    content: "";
    position: absolute;
    top: .05rem;
    right: -.05rem;
    bottom: -.05rem;
    left: 0;
    background: #284ca7;
    z-index: -1;
    opacity: 0;
    transform: translateY(.1rem);
}

.list21 li .a .img {
    width: 3.68rem;
    margin-left: .32rem;
}

.list21 li .a .con {
    flex: 1;
    overflow: hidden;
}

.list21 li .a .con h4 {
    font-size: .2rem;
    color: #333333;
    line-height: 1.25;
}

.list21 li .a .con p {
    font-size: .14rem;
    color: #777777;
    line-height: .24rem;
    max-height: .48rem\0;
    margin: .18rem 0 .5rem;
}

.list21 li .a .con h6 {
    font-size: .16rem;
    color: #777777;
}

.list21 li:last-child {
    margin-bottom: 0;
}

.list21s li .a {
    padding: .44rem .44rem;
}

.img .img_hezi {
    padding-bottom: 60%;
    transition: .5s;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

/* 新增样式 */
.loading,
.error {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.retry-btn {
    background: #284ca7;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

.retry-btn:hover {
    background: #1e3a8a;
}

/* 分页样式 */
.pagebar {
    margin-top: 2rem;
    text-align: center;
}

.p_pages {
    display: inline-block;
}

.p_first,
.p_prev,
.p_next,
.p_last,
.p_no {
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    margin: 0 0.1rem;
    border: 1px solid #ddd;
    background: #fff;
    color: #333;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s;
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
    margin: 0 0.1rem;
    background: #284ca7;
    color: #fff;
    border: 1px solid #284ca7;
    display: inline-block;
}

.p_dot {
    padding: 0.2rem 0.4rem;
    margin: 0 0.1rem;
    color: #999;
}

.p_t {
    margin-left: 1rem;
    color: #666;
}
</style>