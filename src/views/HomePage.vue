<template>
  <div class="home-page">
    <!-- 头部导航 -->
    <HeaderNav />
    
    <!-- 主体内容 -->
    <main id="fullpage">
      <!-- 轮播图区域 -->
      <BannerSection />
      
      <!-- 新闻中心 -->
      <NewsSection />
      
      <!-- 公司介绍 -->
      <CompanyIntro />
      
      <!-- 业务板块 -->
      <BusinessSection />
      
      <!-- 发展历程 -->
      <HistorySection />
      
      <!-- 项目展示 -->
      <ProjectShowcase />
      
      <!-- 专题专栏 -->
      <TopicSection />
      
      <!-- 页脚 -->
      <FooterSection />
    </main>
  </div>
</template>

<script>
import HeaderNav from '../components/layout/HeaderNav.vue'
import BannerSection from '../components/sections/BannerSection.vue'
import NewsSection from '../components/sections/NewsSection.vue'
import CompanyIntro from '../components/common/CompanyIntro.vue'
import BusinessSection from '../components/sections/BusinessSection.vue'
import HistorySection from '../components/sections/HistorySection.vue'
import ProjectShowcase from '../components/common/ProjectShowcase.vue'
import TopicSection from '../components/sections/TopicSection.vue'
import FooterSection from '../components/layout/FooterSection.vue'
import fullpage from 'fullpage.js'

export default {
  name: 'HomePage',
  components: {
    HeaderNav,
    BannerSection,
    NewsSection,
    CompanyIntro,
    BusinessSection,
    HistorySection,
    ProjectShowcase,
    TopicSection,
    FooterSection
  },
  data() {
    return {
      fullpageInstance: null,
      isInitialized: false,
      initRetryCount: 0,
      maxRetries: 3
    }
  },
  mounted() {
    console.log('HomePage mounted, initializing fullpage...')
    this.initializePage()
  },
  activated() {
    // 处理keep-alive组件激活
    console.log('HomePage activated')
    this.initializePage()
  },
  beforeDestroy() {
    console.log('HomePage beforeDestroy, cleaning up...')
    this.destroyFullpage()
  },
  deactivated() {
    // 处理keep-alive组件停用
    console.log('HomePage deactivated')
    this.destroyFullpage()
  },
  methods: {
    async initializePage() {
      // 确保DOM完全渲染
      await this.$nextTick()
      
      // 添加额外延迟确保所有子组件都已挂载
      setTimeout(() => {
        this.initFullpage()
      }, 200)
    },
    initFullpage() {
      console.log('Attempting to initialize fullpage.js...')
      
      // 检查屏幕宽度
      if (window.innerWidth < 1200) {
        console.log('Screen width too small for fullpage.js')
        return
      }
      
      // 检查DOM元素是否存在
      const fullpageElement = document.getElementById('fullpage')
      if (!fullpageElement) {
        console.error('Fullpage element not found, retrying...')
        this.retryInit()
        return
      }
      
      // 如果已经存在实例，先销毁
      if (this.fullpageInstance) {
        this.destroyFullpage()
      }
      
      try {
        this.fullpageInstance = new fullpage('#fullpage', {
          licenseKey: 'YOUR_KEY_HERE',
          anchors: ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"],
          recordHistory: false, // 禁用历史记录
          updateHash: false,    // 禁用hash更新
          scrollingSpeed: 1000,
          fitToSectionDelay: 2000,
          css3: true,
          // 完全禁用所有历史记录相关功能
          autoScrolling: true,
          scrollBar: false,
          easing: 'easeInOutCubic',
          easingcss3: 'ease',
          loopBottom: false,
          loopTop: false,
          loopHorizontal: false,
          continuousVertical: false,
          continuousHorizontal: false,
          scrollOverflow: false,
          touchSensitivity: 15,
          keyboardScrolling: true,
          animateAnchor: true,
          // 禁用所有可能影响历史记录的功能
          onLeave: (origin, destination, direction) => {
            console.log('Leaving section:', origin.index, 'Going to:', destination.index)
            // 阻止默认行为，避免影响路由
            return true
          },
          afterLoad: (origin, destination, direction) => {
            console.log('Fullpage section loaded:', destination.index)
            if (destination.index == 0) {
              document.getElementById('gotop')?.classList.add('hide')
            } else {
              document.getElementById('gotop')?.classList.remove('hide')
            }
            if (destination.index == 2) {
              // 触发数字动画
              this.triggerCountUp()
            }
          },
          afterRender: () => {
            console.log('Fullpage.js rendered successfully')
            this.isInitialized = true
            this.initRetryCount = 0
          },
          // 添加错误处理
          onSlideLeave: (section, origin, destination, direction) => {
            return true
          },
          afterSlideLoad: (section, origin, destination, direction) => {
            // 处理slide加载
          }
        })
        
        console.log('Fullpage.js instance created successfully')
        
        // 处理URL锚点
        this.handleUrlAnchor()
        
      } catch (error) {
        console.error('Error initializing fullpage.js:', error)
        this.retryInit()
      }
    },
    retryInit() {
      if (this.initRetryCount < this.maxRetries) {
        this.initRetryCount++
        console.log(`Retrying fullpage initialization (${this.initRetryCount}/${this.maxRetries})...`)
        setTimeout(() => {
          this.initFullpage()
        }, 500 * this.initRetryCount)
      } else {
        console.error('Max retries reached, fullpage.js initialization failed')
        this.isInitialized = false
      }
    },
    handleUrlAnchor() {
      // 检查当前URL的hash部分
      const hash = window.location.hash
      console.log('Current hash:', hash)
      console.log('Current path:', window.location.pathname)
      
      if (hash && hash.startsWith('#/')) {
        let anchor = hash.substring(2) // 移除 '#/' 前缀
        
        // 如果anchor为空（即URL是 #/），则跳转到第一个section
        if (anchor === '') {
          anchor = 'f0'
        }
        
        const validAnchors = ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"]
        
        if (validAnchors.includes(anchor)) {
          console.log('Found valid anchor:', anchor)
          // 延迟跳转，确保fullpage.js完全初始化
          setTimeout(() => {
            if (window.fullpage_api && this.isInitialized) {
              try {
                window.fullpage_api.moveTo(anchor)
              } catch (error) {
                console.warn('Error moving to anchor:', error)
              }
            }
          }, 1000)
        }
      }
    },
    destroyFullpage() {
      if (this.fullpageInstance && window.fullpage_api) {
        try {
          // 先停止所有动画和事件
          window.fullpage_api.setAllowScrolling(false)
          window.fullpage_api.setKeyboardScrolling(false)
          
          // 然后销毁实例
          window.fullpage_api.destroy('all')
          console.log('Fullpage.js destroyed successfully')
        } catch (error) {
          console.warn('Error destroying fullpage.js:', error)
        }
        this.fullpageInstance = null
        window.fullpage_api = null
        this.isInitialized = false
      }
    },
    triggerCountUp() {
      // 触发数字动画
      const numbers = document.querySelectorAll('.number')
      numbers.forEach(number => {
        if (number.textContent) {
          console.log('触发数字动画:', number.textContent)
        }
      })
    }
  }
}
</script>

<style scoped>
.home-page {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  position: relative;
}

/* 确保内容可见 */
#fullpage {
  position: relative;
  z-index: 1;
}

/* 修复轮播图显示问题 */
.main-visual-slider {
  background-color: transparent !important;
}

.main-visual-slider .swiper-slide::after {
  opacity: 0.3;
}

.main-visual-slider .overlay {
  opacity: 0.2 !important;
}

.visual-img img {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
}

/* 确保在没有 fullpage.js 时内容仍然可见 */
@media (max-width: 1199px) {
  .home-page {
    overflow: auto;
  }
  
  #fullpage {
    display: block !important;
  }
  
  #fullpage > * {
    display: block !important;
    min-height: 100vh;
  }
}
</style>
