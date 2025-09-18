<template>
  <section class="section home1">
    <div class="wp">
      <div class="content flex">
        <!-- 新闻中心 -->
        <div class="box box1 miso_up">
          <div class="tit1 tit1_line">
            <span class="big">新闻中心</span>
            <router-link to="/news/center" class="more1">更多+</router-link>
          </div>
          <section class="list2_box swiper-container">
            <ul class="list2 list00 swiper-wrapper">
              <li class="swiper-slide" v-for="(news, index) in newsList" :key="index">
                <a :href="news.link" target="_blank" class="a">
                  <h6>{{ news.date }}</h6>
                  <h4 class="l1 h4s1">{{ news.title }}</h4>
                  <div class="img slow img_zd">
                    <div class="img_hezi" :style="{ backgroundImage: `url(${news.image})` }"></div>
                    <img :src="news.image" class="none" />
                    <div class="zoomBtn">
                      <div>
                        <svg class="icon_svg mwl_arrow default" aria-hidden="true">
                          <svg viewBox="0 0 27 19" id="icon_mwl_arrow">
                            <path fill-rule="evenodd"
                              d="M26.803,3.291 C26.802,3.293 26.803,3.296 26.803,3.298 L24.997,9.807 C24.954,10.011 24.836,10.170 24.678,10.264 C24.519,10.359 24.316,10.387 24.115,10.324 C23.714,10.200 23.457,9.766 23.542,9.360 L24.825,4.733 L1.373,18.726 C1.029,18.931 0.569,18.792 0.342,18.415 C0.116,18.038 0.211,17.568 0.555,17.363 L24.022,3.362 L19.287,2.268 C18.886,2.143 18.628,1.710 18.713,1.303 C18.799,0.893 19.195,0.662 19.594,0.784 L26.218,2.314 C26.219,2.314 26.220,2.316 26.222,2.316 C26.411,2.371 26.585,2.500 26.700,2.690 C26.815,2.882 26.845,3.098 26.803,3.291 Z">
                            </path>
                          </svg>
                        </svg>
                        <svg class="icon_svg mwl_arrow hover" aria-hidden="true">
                          <svg viewBox="0 0 27 19" id="icon_mwl_arrow">
                            <path fill-rule="evenodd"
                              d="M26.803,3.291 C26.802,3.293 26.803,3.296 26.803,3.298 L24.997,9.807 C24.954,10.011 24.836,10.170 24.678,10.264 C24.519,10.359 24.316,10.387 24.115,10.324 C23.714,10.200 23.457,9.766 23.542,9.360 L24.825,4.733 L1.373,18.726 C1.029,18.931 0.569,18.792 0.342,18.415 C0.116,18.038 0.211,17.568 0.555,17.363 L24.022,3.362 L19.287,2.268 C18.886,2.143 18.628,1.710 18.713,1.303 C18.799,0.893 19.195,0.662 19.594,0.784 L26.218,2.314 C26.219,2.314 26.220,2.316 26.222,2.316 C26.411,2.371 26.585,2.500 26.700,2.690 C26.815,2.882 26.845,3.098 26.803,3.291 Z">
                            </path>
                          </svg>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p class="l2 ps2">{{ news.summary }}</p>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <!-- 公司要闻 -->
        <div class="box box2 miso_up">
          <div class="tit1 tit1_line">
            <span class="big">公司要闻</span>
            <router-link to="/news/key" class="more1">更多+</router-link>
          </div>
          <ul class="list3">
            <li v-for="(news, index) in companyNews" :key="index">
              <a :href="news.link" target="_blank" class="a">
                <h6>{{ news.date }}</h6>
                <h4 class="l3 h4s3">{{ news.title }}</h4>
              </a>
            </li>
          </ul>
        </div>

        <!-- 国际资讯 -->
        <div class="box box3 miso_up">
          <div class="tit1 tit1_line">
            <span class="big">国际资讯</span>
            <router-link to="/news/corporate" class="more1">更多+</router-link>
          </div>
          <ul class="list4 list00">
            <li v-for="(news, index) in stateNews" :key="index">
              <a :href="news.link" target="_blank" class="a">
                <div class="img slow img_zd">
                  <div class="img_hezi" :style="{ backgroundImage: `url(${news.image})` }"></div>
                  <img :src="news.image" class="none" />
                  <div class="zoomBtn">
                    <div>
                      <svg class="icon_svg mwl_arrow default" aria-hidden="true">
                        <svg viewBox="0 0 27 19" id="icon_mwl_arrow">
                          <path fill-rule="evenodd"
                            d="M26.803,3.291 C26.802,3.293 26.803,3.296 26.803,3.298 L24.997,9.807 C24.954,10.011 24.836,10.170 24.678,10.264 C24.519,10.359 24.316,10.387 24.115,10.324 C23.714,10.200 23.457,9.766 23.542,9.360 L24.825,4.733 L1.373,18.726 C1.029,18.931 0.569,18.792 0.342,18.415 C0.116,18.038 0.211,17.568 0.555,17.363 L24.022,3.362 L19.287,2.268 C18.886,2.143 18.628,1.710 18.713,1.303 C18.799,0.893 19.195,0.662 19.594,0.784 L26.218,2.314 C26.219,2.314 26.220,2.316 26.222,2.316 C26.411,2.371 26.585,2.500 26.700,2.690 C26.815,2.882 26.845,3.098 26.803,3.291 Z">
                          </path>
                        </svg>
                      </svg>
                      <svg class="icon_svg mwl_arrow hover" aria-hidden="true">
                        <svg viewBox="0 0 27 19" id="icon_mwl_arrow">
                          <path fill-rule="evenodd"
                            d="M26.803,3.291 C26.802,3.293 26.803,3.296 26.803,3.298 L24.997,9.807 C24.954,10.011 24.836,10.170 24.678,10.264 C24.519,10.359 24.316,10.387 24.115,10.324 C23.714,10.200 23.457,9.766 23.542,9.360 L24.825,4.733 L1.373,18.726 C1.029,18.931 0.569,18.792 0.342,18.415 C0.116,18.038 0.211,17.568 0.555,17.363 L24.022,3.362 L19.287,2.268 C18.886,2.143 18.628,1.710 18.713,1.303 C18.799,0.893 19.195,0.662 19.594,0.784 L26.218,2.314 C26.219,2.314 26.220,2.316 26.222,2.316 C26.411,2.371 26.585,2.500 26.700,2.690 C26.815,2.882 26.845,3.098 26.803,3.291 Z">
                          </path>
                        </svg>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="con">
                  <!-- <h6>{{ news.date }}</h6> -->
                  <!-- <h4 class="l1 h4s1">{{ news.summary }}</h4> -->
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getNewsList } from '@/api/news.js'
import { API_CONFIG } from '@/config/api.js'
export default {
  name: 'NewsSection',
  data() {
    return {
      newsList: [],
      companyNews: [],
      stateNews: [],
      loading: {
        newsList: false,
        companyNews: false,
        stateNews: false
      },
      error: {
        newsList: null,
        companyNews: null,
        stateNews: null
      }
    }
  },
  mounted() {
    this.fetchNewsData()
  },
  methods: {
    async fetchNewsData() {
      try {
        // 新闻中心 - 综合新闻
        this.loading.newsList = true
        const newsResponse = await getNewsList({
          page: 1,
          pageSize: 3,
          category: '综合新闻'
        })
        if (newsResponse.data && newsResponse.data.info) {

          for (const item of newsResponse.data.info) {
            const publishDate = new Date(item.publishtime)
            //const day = publishDate.getDate().toString().padStart(2, '0')
            // const month = `${publishDate.getMonth() + 1}月`

            this.newsList.push({
              title: item.title,
              summary: item.summary,
              image: item.cover ? API_CONFIG.BASE_URL + `${item.cover}` : '/src/assets/images/news1.jpg',
              link: item.link || '#',
              date: publishDate.toLocaleDateString()
            })
          }
        } else {
          this.newsList = []
        }
        this.loading.newsList = false
      } catch (error) {
        console.error('获取新闻列表失败:', error)
        this.error.newsList = error.message
        this.loading.newsList = false
      }

      try {
        // 公司要闻
        this.loading.companyNews = true
        const companyResponse = await getNewsList({
          page: 1,
          pageSize: 3,
          category: '公司要闻'
        })
        if (companyResponse.data && companyResponse.data.info) {

          for (const item of companyResponse.data.info) {
            const publishDate = new Date(item.publishtime)
            //const day = publishDate.getDate().toString().padStart(2, '0')
            // const month = `${publishDate.getMonth() + 1}月`

            this.companyNews.push({
              title: item.title,
              summary: item.summary,
              image: item.cover ? API_CONFIG.BASE_URL + `${item.cover}` : '/src/assets/images/news1.jpg',
              link: item.link || '#',
              date: publishDate.toLocaleDateString()
            })
          }
        } else {
          this.companyNews = []
        }
        this.loading.companyNews = false
      } catch (error) {
        console.error('获取公司要闻失败:', error)
        this.error.companyNews = error.message
        this.loading.companyNews = false
      }

      try {
        // 时政新闻
        this.loading.stateNews = true
        const stateResponse = await getNewsList({
          page: 1,
          pageSize: 3,
          category: '时政新闻'
        })
        if (stateResponse.data && stateResponse.data.info) {

          for (const item of stateResponse.data.info) {
            const publishDate = new Date(item.publishtime)
            //const day = publishDate.getDate().toString().padStart(2, '0')
            // const month = `${publishDate.getMonth() + 1}月`

            this.stateNews.push({
              title: item.title,
              summary: item.summary,
              image: item.cover ? API_CONFIG.BASE_URL + `${item.cover}` : '/src/assets/images/news1.jpg',
              link: item.link || '#',
              date: publishDate.toLocaleDateString()
            })
          }
        } else {
          this.stateNews = []
        }
        this.loading.stateNews = false
      } catch (error) {
        console.error('获取时政新闻失败:', error)
        this.error.stateNews = error.message
        this.loading.stateNews = false
      }
    }
  }
}
</script>

<style scoped>
@import '/src/assets/css/reset.css';
@import '/src/assets/css/style.css';

/* Prevent image distortion and ensure responsive cover */
.img .img_hezi {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  display: block;
}

/* Make first screen section fill viewport height */
.section.home1 {
  min-height: 100vh;
}
</style>
