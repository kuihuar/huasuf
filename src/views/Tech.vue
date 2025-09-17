<template>
  <div class="news-page">
    <!-- 外层Header -->
    <HeaderNav />

    <!-- Banner部分 -->
    <section class="n_banner">
      <div class="img slow img_zd">
        <div class="img_hezi" style=" background:url(/src/assets/images/n_banner1.jpg);"></div>
        <img src="/src/assets/images/n_banner1.jpg" class="none" />

      </div>
      <div class="top">
        <div class="wp">
          <h3 data-aos="fade-up" data-aos-delay="200">科技创新中心</h3>
          <p data-aos="fade-up" data-aos-delay="600">了解华苏最新技术动态</p>
        </div>
      </div>
      <section class="list_sj" data-aos="fade-up">
        <div class="wp">
          <ul>
            <li :class="{ on: currentTab === 'achievements' }">
              <router-link to="/tech/achievements" title="成就荣誉">成就荣誉</router-link>
            </li>
            <li :class="{ on: currentTab === 'innovation' }">
              <router-link to="/tech/innovation" title="技术创新">技术创新</router-link>
            </li>
            <li :class="{ on: currentTab === 'promotion' }">
              <router-link to="/tech/promotion" title="推广应用">推广应用</router-link>
            </li>
            <li :class="{ on: currentTab === 'application' }">
              <router-link to="/tech/application" title="应用案例">应用案例</router-link>
            </li>
          </ul>
        </div>
      </section>
    </section>

    <!-- 手机端内页菜单 -->
    <section id="m_n_nav">
      <div id="n_n_title">
        <a id="bnt_back" href="javascript:history.go(-1)" class="iconfont">
          <img src="/src/assets/images/m_n_nav_left.svg" />
        </a>
        <h1>{{ getCurrentTitle() }}</h1>
        <div id="bnt_sub_nav" class="iconfont" @click="toggleMobileNav">
          <img src="/src/assets/images/m_n_nav_right.svg" />
        </div>
      </div>
      <div id="sub_nav_content" :class="{ show: showMobileNav }">
        <dl>
          <dt :class="{ on: currentTab === 'achievements' }">
            <router-link to="/tech/achievements" title="成就荣誉">成就荣誉</router-link>
          </dt>
          <dt :class="{ on: currentTab === 'innovation' }">
            <router-link to="/tech/innovation" title="技术创新">技术创新</router-link>
          </dt>
          <dt :class="{ on: currentTab === 'promotion' }">
            <router-link to="/tech/promotion" title="推广应用">推广应用</router-link>
          </dt>
          <dt :class="{ on: currentTab === 'application' }">
            <router-link to="/tech/application" title="应用案例">应用案例</router-link>
          </dt>
        </dl>
      </div>
    </section>
    <div class="clear"></div>

    <!-- 主体内容部分 -->
    <section class="n_container">
      <TechAchievements v-if="currentTab === 'achievements'" />
      <TechInnovation v-if="currentTab === 'innovation'" />
      <TechPromotion v-if="currentTab === 'promotion'" />
      <TechApplication v-if="currentTab === 'application'" />
    </section>

    <!-- 外层Footer -->
    <FooterSection />
  </div>
</template>

<script>
import HeaderNav from '@/components/layout/HeaderNav.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import TechAchievements from '@/components/tech/TechAchievements.vue'
import TechInnovation from '@/components/tech/TechInnovation.vue'
import TechPromotion from '@/components/tech/TechPromotion.vue'
import TechApplication from '@/components/tech/TechApplication.vue'

export default {
  name: 'Tech',
  components: {
    HeaderNav,
    FooterSection,
    TechAchievements,
    TechInnovation,
    TechPromotion,
    TechApplication
  },
  data() {
    return {
      showMobileNav: false
    }
  },
  computed: {
    currentTab() {
      // 从路由参数获取当前标签页，默认为 'achievements'
      return this.$route.params.tab || 'achievements'
    }
  },
  mounted() {
    // 初始化AOS动画
    this.initAOS()

    // 确保fullpage.js完全禁用
    this.ensureFullpageDisabled()
  },
  beforeDestroy() {
    // 清理新闻页面滚动设置
    document.body.classList.remove("news-page-active")
    document.documentElement.classList.remove("news-page-active")
  },
  methods: {
    toggleMobileNav() {
      this.showMobileNav = !this.showMobileNav
    },
    getCurrentTitle() {
      const titles = {
        'achievements': '成就荣誉',
        'innovation': '技术创新',
        'promotion': '推广应用',
        'application': '应用案例'
      }
      return titles[this.currentTab] || '成就荣誉'
    },
    initAOS() {
      // 确保AOS库已加载
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
          disable: false
        })
      }
    },
    ensureFullpageDisabled() {
      // 如果存在fullpage.js实例，完全销毁它
      if (window.fullpage_api) {
        try {
          window.fullpage_api.destroy('all')
          console.log('Fullpage.js destroyed in News page')
        } catch (error) {
          console.warn('Error destroying fullpage.js in News page:', error)
        }
        window.fullpage_api = null
      }

      // 添加页面特定的class
      document.body.classList.add("news-page-active")
      document.documentElement.classList.add("news-page-active")
      
      // 确保页面可以正常滚动
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }
}
</script>

<style scoped>
@import '/src/assets/css/reset.css';
@import '/src/assets/css/animate.css';
@import '/src/assets/css/style.css';

.news-page {
  min-height: 100vh;
}

/* 强制显示 list_sj，覆盖所有媒体查询的隐藏设置 */
.list_sj{ position: absolute; right: 0; bottom: 0; left: 0; background: rgba(255,255,255,.7);}
.list_sj ul{display: flex;flex-wrap: wrap;min-height: .56rem;}
.list_sj ul li{ min-width: 16.66667%; border-right: #94a7d5 1px solid;}
.list_sj ul li *{ transition: .5s;}
.list_sj ul li a{ 
	display: flex; width: 100%; height: .56rem; 
	justify-content: center; align-items: center; 
	font-size: .2rem; color: #000000;
	padding: 0 .15rem;
}
.list_sj {
  display: block !important;
}

/* 修复 list_sj ul li a 的显示问题 */
/* .list_sj ul li a {
  display: flex !important;
  width: 100% !important;
  height: 0.56rem !important;
  justify-content: center !important;
  align-items: center !important;
  font-size: 0.2rem !important;
  color: #000000 !important;
  padding: 0 0.15rem !important;
  text-decoration: none !important;
  font-weight: normal !important;
} */

.list_sj ul li.on a, .list_sj ul li a:hover {
    background: #284ca7;
    color: #fff;
    font-weight: bold;
}
.wp {
    width: 14rem;
    padding: 0;
    margin: 0 auto;
    max-width: 94%;
}

/* 移动端导航样式补充 */
#m_n_nav {
  display: none;
}

#n_n_title {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #254596;
  border-bottom: 1px solid #eee;
}

#bnt_back {
  margin-right: 15px;
  cursor: pointer;
}

#bnt_back img {
  width: 20px;
  height: 20px;
}

#n_n_title h1 {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  width: 66%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#bnt_sub_nav {
  cursor: pointer;
}

#bnt_sub_nav img {
  width: 20px;
  height: 20px;
}

#sub_nav_content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: white;
}

#sub_nav_content.show {
  max-height: 300px;
}

#sub_nav_content dl {
  margin: 0;
  padding: 0;
  list-style: none;
}

#sub_nav_content dt {
  margin: 0;
  border-bottom: 1px solid #f0f0f0;
}

#sub_nav_content dt:last-child {
  border-bottom: none;
}

#sub_nav_content dt a {
  display: block;
  padding: 15px 20px;
  color: #666;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

#sub_nav_content dt a:hover {
  background: #f8f9fa;
  color: #ff6b35;
}

#sub_nav_content dt.on a {
  background: #0080ff;
  color: #ff6b35;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #m_n_nav {
    display: block;
  }
}

.clear {
  clear: both;
}

/* 确保AOS元素在动画库未加载时也能显示 */
[data-aos] {
  opacity: 1 !important;
  transform: none !important;
}

/* 当AOS加载后，恢复正常的动画行为 */
html:not(.no-js) [data-aos] {
  opacity: 0;
  transform: translate3d(0, 60px, 0);
}

html:not(.no-js) [data-aos].aos-animate {
  opacity: 1;
  transform: none;
}

/* 确保页面内容能够正常显示 */
.news-page {
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.n_container {
  overflow: visible !important;
  min-height: auto !important;
}

/* 覆盖fullpage.js的overflow设置，确保新闻页面可以正常滚动 */
.news-page {
  min-height: 100vh !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

/* 确保body和html在新闻页面时可以滚动 */
body.news-page-active,
html.news-page-active {
  overflow: visible !important;
  height: auto !important;
}

/* 确保内容容器不会被裁剪 */
.n_container {
  overflow: visible !important;
  min-height: auto !important;
  height: auto !important;
}

/* 覆盖AOS的pointer-events限制，确保导航链接可以点击 */
.list_sj[data-aos] {
  pointer-events: auto !important;
}

.list_sj[data-aos] * {
  pointer-events: auto !important;
}

/* 新闻页面特定样式 */
.news-page .n_banner .top h3 {
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.news-page .n_banner .top p {
  color: #fff;
  font-size: 18px;
  opacity: 0.9;
}

/* 标签页样式 */
/* .list_sj ul {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
}

.list_sj ul li {
  position: relative;
} */

/* .list_sj ul li a {
  color: #fff;
  font-size: 18px;
  padding: 15px 25px;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
} */

/* .list_sj ul li:not(.on) a {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.list_sj ul li.on a {
  background: #fff;
  color: #333;
  font-weight: bold;
}

.list_sj ul li a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.list_sj ul li.on a:hover {
  background: #fff;
  transform: translateY(-2px);
} */
.list_sj ul li.on a, .list_sj ul li a:hover {
    background: #284ca7;
    color: #fff;
    font-weight: bold;
}
.wp {
    width: 14rem;
    padding: 0;
    margin: 0 auto;
    max-width: 94%;
}
/* 移动端样式 */
@media (max-width: 768px) {
  .list_sj ul {
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
  }

  .list_sj ul li a {
    text-align: center;
    padding: 12px 20px;
  }

  .news-page .n_banner .top h3 {
    font-size: 32px;
  }

  .news-page .n_banner .top p {
    font-size: 16px;
  }
}
</style>
