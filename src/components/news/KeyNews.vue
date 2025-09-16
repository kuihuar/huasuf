<template>
    <div class="center-news">
      <div class="wp">
        <div class="news-content">
          <!-- 新闻列表 -->
          <div class="news-list">
            <div class="news-item" v-for="(news, index) in newsList" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
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
          <div class="pagination" data-aos="fade-up">
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
  export default {
    name: 'KeyNews',
    data() {
      return {
        currentPage: 1,
        totalPages: 5,
        newsList: [
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
    methods: {
      goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page
          this.scrollToTop()
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--
          this.scrollToTop()
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++
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
  