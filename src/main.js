import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// CSS imports
import './assets/css/reset.css'
import './assets/css/animate.css'
import './assets/css/style.css'
import './assets/css/page.css'

// JavaScript imports
import 'fullpage.js/dist/fullpage.min.css'

// 添加jQuery和其他必要的库到全局
import './assets/js/jq.js'
import './assets/js/waypoints.js'
import './assets/js/countup.js'

const app = createApp(App)

// 使用路由
app.use(router)

// 改进的 AOS 库加载和初始化
async function initializeAOS() {
  try {
    // 动态导入 AOS 库
    const aosModule = await import('./assets/js/animate.js')
    
    // 等待更长时间确保 AOS 完全加载
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // 多种方式检查 AOS 是否可用
    if (window.AOS || (aosModule && aosModule.default)) {
      const AOS = window.AOS || aosModule.default
      
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: false // 不禁用移动端
      })
      console.log('AOS initialized successfully')
      return true
    } else {
      console.warn('AOS not found, using fallback')
      return false
    }
  } catch (error) {
    console.error('Failed to load AOS:', error)
    return false
  }
}

// 挂载应用
app.mount('#app')

// 在 DOM 加载完成后初始化 AOS
document.addEventListener('DOMContentLoaded', async function() {
  const aosLoaded = await initializeAOS()
  
  // 无论AOS是否加载成功，都要加载其他脚本
  try {
    if (aosLoaded) {
      // AOS加载成功，正常加载public.js
      await import('./assets/js/public.js')
    } else {
      // AOS加载失败，跳过依赖AOS的代码
      console.log('Skipping AOS-dependent scripts')
    }
  } catch (error) {
    console.error('Error loading public.js:', error)
  }
})
