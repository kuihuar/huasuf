import { createRouter, createWebHashHistory } from 'vue-router'
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
  },
  {
    path: '/tech',
    name: 'Tech',
    component: Tech,
    redirect: '/tech/achievements'
  },
  {
    path: '/tech/:tab',
    name: 'TechTab',
    component: Tech,
    props: true
  },
  {
    path: '/culture',
    name: 'Culture',
    component: Culture,
    redirect: '/culture/corporate'
  },
  {
    path: '/culture/:tab',
    name: 'CultureTab',
    component: Culture,
    props: true
  },
  {
    path: '/specialcolumn',
    name: 'Specialcolumn',
    component: Specialcolumn,
    redirect: '/specialcolumn/learning'
  },
  {
    path: '/specialcolumn/:tab',
    name: 'SpecialcolumnTab',
    component: Specialcolumn,
    props: true
  },
  {
    path: '/information',
    name: 'Information',
    component: Information,
    redirect: '/information/notifications'
  },
  {
    path: '/information/:tab',
    name: 'InformationTab',
    component: Information,
    props: true
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
