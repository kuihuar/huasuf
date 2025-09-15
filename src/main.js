import { createApp } from 'vue'
import App from './App.vue'

// CSS imports
import './assets/css/reset.css'
import './assets/css/animate.css'
import './assets/css/style.css'

// JavaScript imports
import 'fullpage.js/dist/fullpage.min.css'

// 添加jQuery和其他必要的库到全局
import './assets/js/jq.js'
import './assets/js/waypoints.js'
import './assets/js/countup.js'

const app = createApp(App)

// 动态加载 AOS 库并初始化
async function initializeAOS() {
  try {
    // 动态导入 AOS 库
    await import('./assets/js/animate.js')
    
    // 等待一个微任务，确保 AOS 完全加载
    await new Promise(resolve => setTimeout(resolve, 0))
    
    // 确保 AOS 已经挂载到 window 对象
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: 'mobile'
      })
      console.log('AOS initialized successfully')
    } else {
      console.warn('AOS not found on window object')
    }
  } catch (error) {
    console.error('Failed to load AOS:', error)
  }
}

// 挂载应用
app.mount('#app')

// 在 DOM 加载完成后初始化 AOS
document.addEventListener('DOMContentLoaded', async function() {
  await initializeAOS()
  
  // 然后加载其他依赖 AOS 的脚本
  await import('./assets/js/public.js')
})
