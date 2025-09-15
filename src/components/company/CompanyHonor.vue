<template>
  <div class="company-honor">
    <div class="container">
      <div class="page-header">
        <h1>集团荣誉</h1>
        <p class="subtitle">荣誉见证实力，品质铸就辉煌</p>
      </div>
      
      <div class="content-section">
        <div class="honor-categories">
          <div class="category-item" v-for="category in honorCategories" :key="category.id">
            <h2 class="category-title">{{ category.title }}</h2>
            <div class="honor-grid">
              <div class="honor-item" v-for="honor in category.honors" :key="honor.id">
                <div class="honor-icon">
                  <i :class="honor.icon"></i>
                </div>
                <div class="honor-content">
                  <h3>{{ honor.title }}</h3>
                  <p>{{ honor.description }}</p>
                  <span class="honor-year">{{ honor.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="achievement-stats">
          <h2>荣誉统计</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">国家级奖项</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100+</div>
              <div class="stat-label">省级荣誉</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">行业认证</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">连续获奖年数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyHonor',
  data() {
    return {
      honorCategories: [
        {
          id: 1,
          title: '国家级荣誉',
          honors: [
            {
              id: 1,
              title: '全国优秀施工企业',
              description: '连续多年获得全国优秀施工企业称号',
              year: '2023',
              icon: 'icon-trophy'
            },
            {
              id: 2,
              title: '鲁班奖',
              description: '中国建设工程鲁班奖（国家优质工程）',
              year: '2022',
              icon: 'icon-award'
            },
            {
              id: 3,
              title: '詹天佑奖',
              description: '中国土木工程詹天佑奖',
              year: '2021',
              icon: 'icon-medal'
            },
            {
              id: 4,
              title: '国家优质工程奖',
              description: '国家优质工程奖银质奖',
              year: '2020',
              icon: 'icon-star'
            }
          ]
        },
        {
          id: 2,
          title: '省级荣誉',
          honors: [
            {
              id: 5,
              title: '山西省优秀企业',
              description: '山西省优秀企业称号',
              year: '2023',
              icon: 'icon-building'
            },
            {
              id: 6,
              title: '山西省质量奖',
              description: '山西省质量奖提名奖',
              year: '2022',
              icon: 'icon-quality'
            },
            {
              id: 7,
              title: '山西省科技进步奖',
              description: '山西省科技进步奖二等奖',
              year: '2021',
              icon: 'icon-science'
            }
          ]
        },
        {
          id: 3,
          title: '行业认证',
          honors: [
            {
              id: 8,
              title: 'ISO9001质量管理体系',
              description: 'ISO9001:2015质量管理体系认证',
              year: '2023',
              icon: 'icon-certificate'
            },
            {
              id: 9,
              title: 'ISO14001环境管理体系',
              description: 'ISO14001:2015环境管理体系认证',
              year: '2023',
              icon: 'icon-environment'
            },
            {
              id: 10,
              title: 'OHSAS18001职业健康安全',
              description: 'OHSAS18001:2007职业健康安全管理体系',
              year: '2023',
              icon: 'icon-safety'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.company-honor {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  color: white;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

.content-section {
  background: white;
  border-radius: 15px;
  padding: 60px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.honor-categories {
  margin-bottom: 60px;
}

.category-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.honor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.honor-item {
  display: flex;
  align-items: flex-start;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.honor-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-left-color: #667eea;
}

.honor-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 20px;
  flex-shrink: 0;
}

.honor-content {
  flex: 1;
}

.honor-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.honor-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.honor-year {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

.achievement-stats {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px;
  border-radius: 15px;
}

.achievement-stats h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item {
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .content-section {
    padding: 30px;
  }
  
  .honor-grid {
    grid-template-columns: 1fr;
  }
  
  .honor-item {
    flex-direction: column;
    text-align: center;
  }
  
  .honor-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
