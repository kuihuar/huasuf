import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Company from '@/views/Company.vue'
import News from '@/views/News.vue'
import Tech from '@/views/Tech.vue'
import Culture from '@/views/Culture.vue'
import Specialcolumn from '@/views/Specialcolumn.vue'
import Information from '@/views/Information.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { 
      title: '首页',
      keepAlive: false 
    }
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
    redirect: '/company/about',
    meta: { 
      title: '公司介绍',
      keepAlive: false 
    }
  },
  {
    path: '/company/:tab',
    name: 'CompanyTab',
    component: Company,
    props: true,
    meta: { 
      title: '公司介绍',
      keepAlive: false 
    }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    redirect: '/news/center',
    meta: { 
      title: '新闻中心',
      keepAlive: false 
    }
  },
  {
    path: '/news/:tab',
    name: 'NewsTab',
    component: News,
    props: true,
    meta: { 
      title: '新闻中心',
      keepAlive: false 
    }
  },
  {
    path: '/tech',
    name: 'Tech',
    component: Tech,
    redirect: '/tech/achievements',
    meta: { 
      title: '科技创新',
      keepAlive: false 
    }
  },
  {
    path: '/tech/:tab',
    name: 'TechTab',
    component: Tech,
    props: true,
    meta: { 
      title: '科技创新',
      keepAlive: false 
    }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: Culture,
    redirect: '/culture/corporate',
    meta: { 
      title: '企业文化',
      keepAlive: false 
    }
  },
  {
    path: '/culture/:tab',
    name: 'CultureTab',
    component: Culture,
    props: true,
    meta: { 
      title: '企业文化',
      keepAlive: false 
    }
  },
  {
    path: '/specialcolumn',
    name: 'Specialcolumn',
    component: Specialcolumn,
    redirect: '/specialcolumn/learning',
    meta: { 
      title: '专题专栏',
      keepAlive: false 
    }
  },
  {
    path: '/specialcolumn/:tab',
    name: 'SpecialcolumnTab',
    component: Specialcolumn,
    props: true,
    meta: { 
      title: '专题专栏',
      keepAlive: false 
    }
  },
  {
    path: '/information',
    name: 'Information',
    component: Information,
    redirect: '/information/notifications',
    meta: { 
      title: '信息公开',
      keepAlive: false 
    }
  },
  {
    path: '/information/:tab',
    name: 'InformationTab',
    component: Information,
    props: true,
    meta: { 
      title: '信息公开',
      keepAlive: false 
    }
  },
  // 添加通配符路由处理fullpage.js锚点
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
    meta: { 
      title: '首页',
      keepAlive: false 
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 确保页面切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log('Router navigating from', from.path, 'to', to.path)
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title + ' - 华苏建设有限公司'
  }
  
  // 如果切换到首页，重新加载页面以确保FullPage.js正确初始化
  if (to.path === '/' && from.path !== '/') {
    console.log('Switching to home page, reloading...')
    next()
    // 延迟重新加载，确保路由切换完成
    setTimeout(() => {
      window.location.reload()
    }, 100)
    return
  }
  
  next()
})

// 路由后置守卫
router.afterEach((to, from) => {
  console.log('Router navigation completed to', to.path)
})

export default router
