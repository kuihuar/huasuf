<template>
    <section class="news">
      <div class="fl01 n_pad1">
        <div class="wp">
          <!-- 加载状态 -->
          <div v-if="loading" class="loading">
            <p>正在加载发展历程...</p>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <button @click="loadData" class="retry-btn">重试</button>
          </div>
          
          <!-- 发展历程列表 -->
          <ul v-else class="list21">
            <li v-for="(news, index) in newsList" :key="index" data-aos="fade-up">
              <a :href="news.link" target="_blank" :title="news.title" class="a">
                <div class="con">
                  <h4 class="l1 h4s1">{{ news.title }}</h4>
                  <p class="l2 ps2">
                    {{ news.summary }}
                  </p>
                  <h6>[{{ news.month }}-{{ news.day }}日]</h6>
                </div>
                <div class="img slow img_zd">
                  <div class="img_hezi"
                    :style="{ background: `url(${news.image})` }">
                  </div>
                  <img :src="news.image" :alt="news.title" class="none" />
                </div>
              </a>
            </li>
          </ul>
  
          <!-- 发展历程分页组件 -->
          <div class="pagebar" v-if="!loading && !error && totalPages > 1">
            <span class="p_pages">
              <!-- 首页 -->
              <span 
                :class="['p_first', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
                @click="goToPage(1)"
              >
                首页
              </span>
              
              <!-- 上一页 -->
              <span 
                :class="['p_prev', currentPage === 1 ? 'p_fun_d' : 'p_fun']"
                @click="prevPage"
              >
                上页
              </span>
              
              <!-- 页码 -->
              <template v-for="page in visiblePages" :key="page">
                <span 
                  v-if="page === currentPage"
                  class="p_no_d"
                >
                  {{ page }}
                </span>
                <span 
                  v-else
                  class="p_no"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </span>
              </template>
              
              <!-- 省略号 -->
              <span v-if="currentPage + 2 < totalPages" class="p_dot">...</span>
              
              <!-- 最后一页 -->
              <span 
                v-if="totalPages > 1 && !visiblePages.includes(totalPages)"
                class="p_no"
                @click="goToPage(totalPages)"
              >
                {{ totalPages }}
              </span>
              
              <!-- 下一页 -->
              <span 
                :class="['p_next', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
                @click="nextPage"
              >
                下页
              </span>
              
              <!-- 尾页 -->
              <span 
                :class="['p_last', currentPage === totalPages ? 'p_fun_d' : 'p_fun']"
                @click="goToPage(totalPages)"
              >
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
  import { getNewsList } from '@/api/news.js'
  import { API_CONFIG } from '@/config/api.js'
  
  export default {
    name: 'DevelopmentHistory',
    data() {
      return {
        loading: false,
        error: null,
        currentPage: 1,
        pageSize: 2, // 每页显示数量
        totalPages: 5,
        totalCount: 0, // 总数据量
        newsList: [] // 初始为空数组
      }
    },
    computed: {
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
    // 添加生命周期钩子
    async mounted() {
      await this.loadData()
    },
    methods: {
      // 获取默认新闻数据
      getDefaultNews() {
        return [
          {
            title: '华苏建设荣获2024年度优秀建筑企业称号',
            summary: '在2024年度建筑行业评选中，华苏建设凭借卓越的项目质量和创新技术，荣获优秀建筑企业称号，这是对公司多年来努力的最好认可。',
            image: '/src/assets/images/news1.jpg',
            category: '企业荣誉',
            views: 1250,
            day: '15',
            month: '01月',
            link: '#'
          }
        ]
      },
      
      // 转换API数据格式为组件需要的格式
      transformNewsData(apiData) {
        return apiData.map(item => {
          // 解析发布时间
          const publishDate = new Date(item.publishtime)
          const day = publishDate.getDate().toString().padStart(2, '0')
          const month = `${publishDate.getMonth() + 1}月`
          
          return {
            title: item.title,
            summary: item.summary,
            image: item.cover ? API_CONFIG.BASE_URL + `${item.cover}` : '/src/assets/images/news1.jpg', // 处理图片路径
            category: item.category,
            views: item.views || 0,
            day: day,
            month: month,
            link: item.link || '#',
            author: item.author,
            like: item.like || 0,
            dislike: item.dislike || 0,
            publishTime: item.publishtime,
            status: item.status
          }
        })
      },
      
      async loadData() {
        try {
          this.loading = true
          this.error = null
          
          // 构建分页参数
          const params = {
            page: this.currentPage,
            pageSize: this.pageSize
          }
          
          console.log('请求参数:', params)
          
          // 加载新闻数据
          const newsResponse = await getNewsList(params)
          
          console.log('接口响应:', newsResponse)
          
          // 检查响应状态
          if (newsResponse && newsResponse.code === 0) {
            // 成功响应
            const responseData = newsResponse.data
            
            if (responseData && responseData.info && Array.isArray(responseData.info)) {
              // 转换数据格式
              this.newsList = this.transformNewsData(responseData.info)
              
              // 更新分页信息
              if (responseData.total !== undefined) {
                this.totalCount = responseData.total
                this.totalPages = Math.ceil(this.totalCount / this.pageSize)
              }
              
              console.log('发展历程数据加载成功:', this.newsList.length, '条')
              console.log('分页信息 - 当前页:', this.currentPage, '总页数:', this.totalPages, '总数据:', this.totalCount)
            } else {
              console.warn('响应数据格式不正确，使用默认数据')
              this.newsList = this.getDefaultNews()
            }
          } else {
            // 接口返回错误
            const errorMsg = newsResponse?.msg || '接口返回错误'
            console.error('接口错误:', errorMsg)
            this.error = errorMsg
            this.newsList = this.getDefaultNews()
          }
          
          // 如果数据为空，使用默认数据
          if (this.newsList.length === 0) {
            console.warn('接口返回空数据，使用默认数据')
            this.newsList = this.getDefaultNews()
          }
          
        } catch (error) {
          console.error('加载数据失败:', error)
          this.error = error.message || '数据加载失败'
          // 使用默认数据
          this.newsList = this.getDefaultNews()
          console.log('已切换到默认数据')
        } finally {
          this.loading = false
        }
      },
      
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page
          this.loadData() // 重新加载数据
          this.scrollToTop()
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
          this.loadData() // 重新加载数据
          this.scrollToTop()
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.loadData() // 重新加载数据
          this.scrollToTop()
        }
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
  </script>
  
  <style scoped>
  /* 现有样式保持不变 */
  .list21 li{ margin-bottom: .52rem; position: relative; z-index: 1;}
  .list21 li *{ transition: .5s;}
  .list21 li .a{display: flex;align-items: center;background: #fff;padding: .26rem .44rem;border: #fff 1px solid;}
  .list21 li .a::before{content: "";position: absolute;top: .05rem;right: -.05rem;bottom: -.05rem;left: 0;background: #284ca7;z-index: -1;opacity: 0;transform: translateY(.1rem);}
  .list21 li .a .img{width: 3.68rem;margin-left: .32rem;}
  .list21 li .a .con{flex: 1;overflow: hidden;}
  .list21 li .a .con h4{ font-size: .2rem; color: #333333; line-height: 1.25;}
  .list21 li .a .con p{font-size: .14rem;color: #777777;line-height: .24rem;max-height: .48rem\0;margin: .18rem 0 .5rem;}
  .list21 li .a .con h6{font-size: .16rem;color: #777777;}
  
  .list21 li:last-child{ margin-bottom: 0;}
  .list21s li .a{ padding: .44rem .44rem;}
  
  .img .img_hezi {
      padding-bottom: 60%;
      transition: .5s;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
  }
  
  /* 新增样式 */
  .loading, .error {
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
  
  .p_first, .p_prev, .p_next, .p_last, .p_no {
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
  
  .p_first:hover, .p_prev:hover, .p_next:hover, .p_last:hover, .p_no:hover {
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