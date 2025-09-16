import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Company from '@/views/Company.vue'
import News from '@/views/News.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
    redirect: '/company/about'
  },
  {
    path: '/company/:tab',
    name: 'CompanyTab',
    component: Company,
    props: true
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    redirect: '/news/center'
  },
  {
    path: '/news/:tab',
    name: 'NewsTab',
    component: News,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
