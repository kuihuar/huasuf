<template>
  <section class="news">
    <div class="fl01 n_pad1">
      <div class="wp">
        <ul class="list21">
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

      <div class="pagebar">
        <span class="p_pages"><span class="p_first_d p_fun_d">首页</span><span class="p_prev_d p_fun_d">上页</span><span class="p_no_d">1</span><span class="p_no"><a href="xwzx/213.htm">2</a></span><span class="p_no"><a href="xwzx/212.htm">3</a></span><span class="p_no"><a href="xwzx/211.htm">4</a></span><span class="p_no"><a href="xwzx/210.htm">5</a></span><span class="p_dot">...</span><span class="p_no"><a href="xwzx/1.htm">214</a></span><span class="p_next p_fun"><a href="xwzx/213.htm">下页</a></span><span class="p_last p_fun"><a href="xwzx/1.htm">尾页</a></span></span>
        <span class="p_t">共58条</span>
      </div>
      </div>
    </div>
  </section>


  
  <!-- <div class="center-news">
    <div class="wp">
      <div class="news-content">
        <div class="news-list">
          <div class="news-item" v-for="(news, index) in newsList" :key="index" data-aos="fade-up"
            :data-aos-delay="index * 100">
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

        <div class="pagination" data-aos="fade-up">
          <a href="#" class="prev" :class="{ disabled: currentPage === 1 }" @click.prevent="prevPage">
            <i class="icon-left"></i> 上一页
          </a>
          <div class="page-numbers">
            <a href="#" v-for="page in visiblePages" :key="page" :class="{ active: page === currentPage }"
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
  </div> -->
</template>

<script>
export default {
  name: 'CenterNews',
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
          title: '华苏建设参与国家重点工程项目1',
          summary: '公司成功中标国家重点基础设施建设项目，该项目将进一步提升华苏建设在行业内的地位和影响力。',
          image: '/src/assets/images/news1.jpg',
          category: '项目动态',
          views: 980,
          day: '12',
          month: '01月',
          link: '#'
        },
        {
          title: '华苏建设技术团队获得多项专利认证2',
          summary: '公司技术团队在绿色建筑和智能建造领域取得重大突破，获得多项国家专利认证，为行业发展贡献力量。',
          image: '/src/assets/images/news1.jpg',
          category: '技术创新',
          views: 756,
          day: '08',
          month: '01月',
          link: '#'
        },
        {
          title: '华苏建设与知名高校建立产学研合作3',
          summary: '公司与多所知名高校签署战略合作协议，共同推进建筑行业技术创新和人才培养，为行业发展注入新动力。',
          image: '/src/assets/images/news1.jpg',
          category: '合作动态',
          views: 634,
          day: '05',
          month: '01月',
          link: '#'
        },
        {
          title: '华苏建设举办2024年度技术交流会4',
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

</style>
