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
// import TopicSection from '../components/sections/TopicSection.vue'
import FooterSection from '../components/layout/FooterSection.vue'
import fullpage from 'fullpage.js'
import {
  layoutIsDesktop,
  createDesktopLayoutMatcher
} from '@/config/breakpoints.js'

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
    // TopicSection,
    FooterSection
  },
  data() {
    return {
      fullpageInstance: null,
      isInitialized: false,
      initRetryCount: 0,
      maxRetries: 3,
      isRouteReady: false,
      _initTimer: null,
      _desktopMq: null,
      _onDesktopMqChange: null
    }
  },
  mounted() {
    console.log('HomePage mounted, current hash:', window.location.hash)
    this.setupLayoutListener()
    this.initializePage()
  },
  beforeDestroy() {
    this.clearInitTimer()
    this.teardownLayoutListener()
    this.destroyFullpage()
  },
  activated() {
    console.log('HomePage activated')
    this.setupLayoutListener()
    this.initializePage()
  },
  deactivated() {
    console.log('HomePage deactivated')
    this.clearInitTimer()
    this.teardownLayoutListener()
    this.destroyFullpage()
  },
  watch: {
    // 监听路由变化
    '$route'(to, from) {
      console.log('Route changed from', from.path, 'to', to.path)
      this.isRouteReady = true
      // 路由变化后重新初始化
      this.$nextTick(() => {
        this.initializePage()
      })
    }
  },
  methods: {
    clearInitTimer() {
      if (this._initTimer != null) {
        clearTimeout(this._initTimer)
        this._initTimer = null
      }
    },
    setupLayoutListener() {
      if (typeof window === 'undefined' || this._desktopMq) return
      this._desktopMq = createDesktopLayoutMatcher()
      this._onDesktopMqChange = () => this.onDesktopLayoutChange()
      if (this._desktopMq.addEventListener) {
        this._desktopMq.addEventListener('change', this._onDesktopMqChange)
      } else {
        this._desktopMq.addListener(this._onDesktopMqChange)
      }
    },
    teardownLayoutListener() {
      if (!this._desktopMq || !this._onDesktopMqChange) return
      if (this._desktopMq.removeEventListener) {
        this._desktopMq.removeEventListener('change', this._onDesktopMqChange)
      } else {
        this._desktopMq.removeListener(this._onDesktopMqChange)
      }
      this._desktopMq = null
      this._onDesktopMqChange = null
    },
    onDesktopLayoutChange() {
      if (this._desktopMq.matches) {
        this.$nextTick(() => this.initFullpage())
      } else {
        this.destroyFullpage()
      }
    },
    async initializePage() {
      console.log('Initializing page, hash:', window.location.hash)
      this.clearInitTimer()
      await this.$nextTick()
      const hash = window.location.hash
      const isDirectHashAccess = hash === '#/' || hash === '#'
      const delay = isDirectHashAccess ? 1000 : 500
      this._initTimer = setTimeout(() => {
        this._initTimer = null
        this.initFullpage()
      }, delay)
    },
    initFullpage() {
      console.log('Attempting to initialize fullpage.js...')
      console.log('Current hash:', window.location.hash)
      console.log('Current pathname:', window.location.pathname)
      if (!layoutIsDesktop()) {
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
          licenseKey: 'gplv3-license', // 使用GPL v3许可证（开源版本）
          anchors: ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7"],
          recordHistory: false, // 禁用历史记录
          updateHash: false,    // 禁用hash更新
          scrollingSpeed: 1000,
          fitToSectionDelay: 1000, // 减少延迟
          css3: true,
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
          // 简化回调函数
          onLeave: (origin, destination, direction) => {
            console.log('Leaving section:', origin.index, 'Going to:', destination.index)
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
            // 在渲染完成后处理URL锚点
            this.handleUrlAnchor()
          }
        })
        
        console.log('Fullpage.js instance created successfully')
        
      } catch (error) {
        console.error('Error initializing fullpage.js:', error)
        this.retryInit()
      }
    },
    retryInit() {
      if (this.initRetryCount < this.maxRetries) {
        this.initRetryCount++
        console.log(`Retrying fullpage.js initialization (${this.initRetryCount}/${this.maxRetries})...`)
        setTimeout(() => {
          this.initFullpage()
        }, 1000)
      } else {
        console.error('Max retries reached, fullpage.js initialization failed')
        this.isInitialized = false
      }
    },
    handleUrlAnchor() {
      // 检查当前URL的hash部分
      const hash = window.location.hash
      console.log('Handling URL anchor, current hash:', hash)
      console.log('Current path:', window.location.pathname)
      
      if (hash && hash.startsWith('#')) {
        let anchor = hash.substring(1) // 移除 '#' 前缀
        
        // 如果anchor为空（即URL是 #），则跳转到第一个section
        if (anchor === '') {
          anchor = 'f0'
          console.log('Empty anchor detected, setting to f0')
        }
        
        const validAnchors = ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"]
        
        if (validAnchors.includes(anchor)) {
          console.log('Found valid anchor:', anchor)
          // 延迟跳转，确保fullpage.js完全初始化
          setTimeout(() => {
            if (window.fullpage_api && this.isInitialized) {
              try {
                window.fullpage_api.moveTo(anchor)
                console.log('Successfully moved to anchor:', anchor)
              } catch (error) {
                console.warn('Error moving to anchor:', error)
              }
            } else {
              console.warn('Fullpage API not available or not initialized')
            }
          }, 1500) // 增加延迟时间
        }
      } else {
        // 没有hash，直接跳转到第一个section
        console.log('No hash detected, moving to first section')
        setTimeout(() => {
          if (window.fullpage_api && this.isInitialized) {
            try {
              window.fullpage_api.moveTo('f0')
              console.log('Successfully moved to first section (no hash)')
            } catch (error) {
              console.warn('Error moving to first section (no hash):', error)
            }
          }
        }, 1500)
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
      }
      this.fullpageInstance = null
      this.isInitialized = false
    },
    triggerCountUp() {
      // 数字动画逻辑
      console.log('Triggering count up animation')
    }
  }
}
</script>

<style scoped>
.home-page {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

#fullpage {
  height: 100vh;
  height: 100dvh;
}

#fullpage .fp-section {
  height: 100vh !important;
  height: 100dvh !important;
}

/* 返回顶部按钮 */
.gotop {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.gotop:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-2px);
}

.gotop.hide {
  opacity: 0;
  visibility: hidden;
}

.gotop i {
  color: white;
  font-size: 1.2rem;
}

@media (max-width: 1199px) {
  .home-page {
    height: auto;
  }

  #fullpage {
    height: auto;
  }

  #fullpage .fp-section {
    height: auto !important;
    min-height: 100vh;
    min-height: 100dvh;
  }
}
</style>
