
<template>
  <section class="section home5">
    <div class="wp">
        <div class="tit4">
            <div class="ll">华苏精品项目</div>
        </div>
        <div class="content">
            <div class="left">
              <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <p>正在加载项目数据...</p>
        </div>
        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
          <p>加载失败: {{ error }}</p>
          <button @click="fetchProjects" class="retry-btn">重试</button>
        </div>
                <ul v-else class="list14">
                    <li v-for="(project, index) in projects" :key="project.ID || index">
                        <a :href="getProjectLink(project)" class="a" v-if="index == 0">
                            <div class="img slow img_zd">
                                <div class="img_hezi" :style="{ background: `url(${getProjectImage(project)})` }"></div>
                                <img :src="getProjectImage(project)" class="none" />

                            </div>
                            <div class="top">
                                <h4>
                                    <p>{{ project.title }}</p>
                                </h4>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="right">
                <ul class="list15">
                    <li v-for="(project, index) in projects" :key="project.ID || index">
                        <a :href="getProjectLink(project)" class="a" v-if = "index < 2">
                            <div class="img slow img_zd">
                                <div class="img_hezi" :style="{ background: `url(${getProjectImage(project)})` }"></div>
                                <img :src="getProjectImage(project)" class="none" />


                            </div>
                            <div class="top">
                                <h4>
                                    <p>{{ project.title }}</p>
                                </h4>
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
import { getLatestConstructions } from '@/api/construction.js'
import { API_CONFIG } from '@/config/api.js'
import { map } from 'lodash'


export default {
  name: 'ProjectShowcase',
  data() {
    return {
      projects: [],
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      this.loading = true
      this.error = null
      
      try {
        const response = await getLatestConstructions(4) // 获取4个项目
        
        if (response.code === 0 && response.data && response.data.list) {
          this.projects = response.data.list.map(project => ({
            ...project,
            images: map(project.images, image => API_CONFIG.BASE_URL + image)
          }))
        } else {
          throw new Error(response.msg || '获取项目数据失败')
        }
      } catch (error) {
        console.error('获取项目数据失败:', error)
        this.error = error.message || '网络错误，请稍后重试'
        // 如果API失败，使用默认数据作为后备
        this.projects = this.getDefaultProjects()
      } finally {
        this.loading = false
      }
    },
    
    getProjectImage(project) {
      // 如果有图片数据，使用第一张图片
      if (project.images && project.images.length > 0) {
        // 假设图片路径需要添加基础URL前缀
        return project.images[0]
      }
      // 默认图片
      return '/src/assets/images/project-default.jpg'
    },
    
    getProjectLink(project) {
      // 可以根据项目ID生成详情页链接
      return `#/project/${project.ID}`
    },
    getDate(project) {
      return project.scheduleddate.split(' ')[0]
    },
    
    // 默认项目数据作为后备
    getDefaultProjects() {
      return [
        {
          ID: 1,
          title: '太原南站',
          description: '太原南站是山西省最大的铁路客运站，总建筑面积约20万平方米。',
          images: ['/src/assets/images/project1.jpg']
        },
        {
          ID: 2,
          title: '山西大剧院',
          description: '山西大剧院是山西省标志性文化建筑，总建筑面积约7.8万平方米。',
          images: ['/src/assets/images/project2.jpg']
        },
        {
          ID: 3,
          title: '太原国际机场T3航站楼',
          description: '太原国际机场T3航站楼是山西省重要的交通枢纽。',
          images: ['/src/assets/images/project3.jpg']
        },
        {
          ID: 4,
          title: '山西体育中心',
          description: '山西体育中心是山西省最大的综合性体育场馆。',
          images: ['/src/assets/images/project4.jpg']
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '/src/assets/css/reset.css';
@import '/src/assets/css/style.css';

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #e74c3c;
}

.retry-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-btn:hover {
  background: #2980b9;
}
</style>