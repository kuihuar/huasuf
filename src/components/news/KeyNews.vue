<template>
    <div class="center-news">
      <div class="wp">
        <div class="news-content">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <p>正在加载新闻...</p>
        </div>
        
        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="loadData" class="retry-btn">重试</button>
        </div>
        
          <!-- 新闻列表 -->
        <div v-else class="news-list">
            <div class="news-item" v-for="(news, index) in newsList" :key="index" data-aos="fade-up">
              <div class="news-image">
                <img :src="news.image" :alt="news.title" />
                <div class="news-date">
                  <span class="day">{{ news.day }}</span>
                  <span class="month">{{ news.month }}</span>
                </div>
              </div>
              <div class="news-info">
                <h3 class="news-title">
                  <a :href="news.link" :title="news.title">{{ news.title }}</a>
                </h3>
                <p class="news-summary">{{ news.summary }}</p>
                <div class="news-meta">
                  <span class="news-category">{{ news.category }}</span>
                  <span class="news-views">阅读 {{ news.views }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 分页 -->
        <div class="pagination" v-if="!loading && !error && totalPages > 1" >
            <a href="#" class="prev" :class="{ disabled: currentPage === 1 }" @click.prevent="prevPage">
              <i class="icon-left"></i> 上一页
            </a>
            <div class="page-numbers">
              <a href="#" v-for="page in visiblePages" :key="page" 
                 :class="{ active: page === currentPage }" 
                 @click.prevent="goToPage(page)">
                {{ page }}
              </a>
            </div>
            <a href="#" class="next" :class="{ disabled: currentPage === totalPages }" @click.prevent="nextPage">
              下一页 <i class="icon-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { getNewsList } from '@/api/news.js'
import { API_CONFIG } from '@/config/api.js'

  export default {
    name: 'KeyNews',
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
          },
          {
            title: '华苏建设参与国家重点工程项目',
            summary: '公司成功中标国家重点基础设施建设项目，该项目将进一步提升华苏建设在行业内的地位和影响力。',
            image: '/src/assets/images/news2.jpg',
            category: '项目动态',
            views: 980,
            day: '12',
            month: '01月',
            link: '#'
          },
          {
            title: '华苏建设技术团队获得多项专利认证',
            summary: '公司技术团队在绿色建筑和智能建造领域取得重大突破，获得多项国家专利认证，为行业发展贡献力量。',
            image: '/src/assets/images/news3.jpg',
            category: '技术创新',
            views: 756,
            day: '08',
            month: '01月',
            link: '#'
          },
          {
            title: '华苏建设与知名高校建立产学研合作',
            summary: '公司与多所知名高校签署战略合作协议，共同推进建筑行业技术创新和人才培养，为行业发展注入新动力。',
            image: '/src/assets/images/news4.jpg',
            category: '合作动态',
            views: 634,
            day: '05',
            month: '01月',
            link: '#'
          },
          {
            title: '华苏建设举办2024年度技术交流会',
            summary: '公司成功举办年度技术交流会，邀请行业专家和合作伙伴共同探讨建筑行业发展趋势和技术创新方向。',
            image: '/src/assets/images/news5.jpg',
            category: '活动动态',
            views: 892,
            day: '02',
            month: '01月',
            link: '#'
          },
          {
            title: '华苏建设获得ISO质量管理体系认证',
            summary: '公司通过ISO9001质量管理体系认证，标志着华苏建设在质量管理方面达到了国际先进水平。',
            image: '/src/assets/images/news6.jpg',
            category: '企业认证',
            views: 567,
            day: '28',
            month: '12月',
            link: '#'
          }
        ]
    },
    
    // 获取分页后的默认数据
    getPaginatedDefaultNews() {
      const allNews = this.getDefaultNews()
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return allNews.slice(startIndex, endIndex)
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
        
        console.log('KeyNews 请求参数:', params)
        
        // 加载新闻数据
        const newsResponse = await getNewsList(params)
        
        console.log('KeyNews 接口响应:', newsResponse)
        
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
            
            console.log('KeyNews 数据加载成功:', this.newsList.length, '条')
            console.log('KeyNews 分页信息 - 当前页:', this.currentPage, '总页数:', this.totalPages, '总数据:', this.totalCount)
          } else {
            console.warn('KeyNews 响应数据格式不正确，使用默认数据')
            this.useDefaultData()
          }
        } else {
          // 接口返回错误
          const errorMsg = newsResponse?.msg || '接口返回错误'
          console.error('KeyNews 接口错误:', errorMsg)
          this.error = errorMsg
          this.useDefaultData()
        }
        
        // 如果数据为空，使用默认数据
        if (this.newsList.length === 0) {
          console.warn('KeyNews 接口返回空数据，使用默认数据')
          this.useDefaultData()
        }
        
      } catch (error) {
        console.error('KeyNews 加载数据失败:', error)
        this.error = error.message || '数据加载失败'
        // 使用默认数据
        this.useDefaultData()
        console.log('KeyNews 已切换到默认数据')
      } finally {
        this.loading = false
      }
    },
    
    // 使用默认数据并设置正确的分页信息
    useDefaultData() {
      const allDefaultNews = this.getDefaultNews()
      this.totalCount = allDefaultNews.length
      this.totalPages = Math.ceil(this.totalCount / this.pageSize)
      this.newsList = this.getPaginatedDefaultNews()
      
      console.log('KeyNews 使用默认数据 - 总数据:', this.totalCount, '总页数:', this.totalPages, '当前页:', this.currentPage)
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
  .center-news {
    padding: 60px 0;
    background: #f8f9fa;
  }
  
  .news-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .news-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
  }
  
  .news-item {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .news-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  .news-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .news-item:hover .news-image img {
    transform: scale(1.05);
  }
  
  .news-date {
    position: absolute;
    top: 15px;
    left: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
    min-width: 60px;
  }
  
  .news-date .day {
    display: block;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
  }
  
  .news-date .month {
    display: block;
    font-size: 12px;
    opacity: 0.9;
  }
  
  .news-info {
    padding: 25px;
  }
  
  .news-title {
    margin: 0 0 15px 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.4;
  }
  
  .news-title a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .news-title a:hover {
    color: #007bff;
  }
  
  .news-summary {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .news-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #999;
  }
  
  .news-category {
    background: #007bff;
    color: #fff;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 12px;
  }
  
  .news-views {
    color: #999;
  }
  
  /* 分页样式 */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
  }
  
  .pagination a {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #fff;
    color: #333;
    text-decoration: none;
    border-radius: 6px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  
  .pagination a:hover:not(.disabled) {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }
  
  .pagination a.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-numbers {
    display: flex;
    gap: 5px;
  }
  
  .page-numbers a {
    min-width: 40px;
    text-align: center;
    padding: 10px 15px;
  }
  
  .page-numbers a.active {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }

/* 新增样式 */
.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.retry-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-btn:hover {
  background: #0056b3;
}
  
  /* 移动端样式 */
  @media (max-width: 768px) {
    .center-news {
      padding: 40px 0;
    }
    
    .news-list {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .news-item {
      margin: 0 15px;
    }
    
    .news-image {
      height: 180px;
    }
    
    .news-info {
      padding: 20px;
    }
    
    .news-title {
      font-size: 16px;
    }
    
    .pagination {
      flex-wrap: wrap;
      gap: 5px;
    }
    
    .pagination a {
      padding: 8px 15px;
      font-size: 13px;
    }
    
    .page-numbers a {
      min-width: 35px;
      padding: 8px 12px;
    }
  }
  </style>
  