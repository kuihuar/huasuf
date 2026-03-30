<template>
  <section class="news">
    <div class="fl01 n_pad1">
      <div class="wp">
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
                <img
                  :src="news.image"
                  :alt="news.title"
                  class="none"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
          </li>
        </ul>

        <PageBar
          v-if="!loading && !error && totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-count="totalCount"
          @change="goToPage"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getNewsList } from '@/api/news.js'
import { API_CONFIG } from '@/config/api.js'
import PageBar from '@/components/common/PageBar.vue'

export default {
  name: 'CenterNews',
  components: { PageBar },
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
          image: '/src/assets/images/news1.jpg',
          category: '项目动态',
          views: 980,
          day: '12',
          month: '01月',
          link: '#'
        },
        {
          title: '华苏建设技术团队获得多项专利认证',
          summary: '公司技术团队在绿色建筑和智能建造领域取得重大突破，获得多项国家专利认证，为行业发展贡献力量。',
          image: '/src/assets/images/news1.jpg',
          category: '技术创新',
          views: 756,
          day: '08',
          month: '01月',
          link: '#'
        },
        {
          title: '华苏建设与知名高校建立产学研合作',
          summary: '公司与多所知名高校签署战略合作协议，共同推进建筑行业技术创新和人才培养，为行业发展注入新动力。',
          image: '/src/assets/images/news1.jpg',
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
            
            console.log('新闻数据加载成功:', this.newsList.length, '条')
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

@media (max-width: 768px) {
  .list21 li .a {
    flex-direction: column;
    align-items: stretch;
  }
  .list21 li .a .img {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-top: 0.2rem;
  }
}
</style>
