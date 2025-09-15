<template>
  <div class="contact-company">
    <div class="container">
      <div class="page-header">
        <h1>联系华苏</h1>
        <p class="subtitle">携手合作，共创未来</p>
      </div>
      
      <div class="content-section">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>联系方式</h2>
            <div class="info-list">
              <div class="info-item">
                <div class="info-icon">
                  <i class="icon-location"></i>
                </div>
                <div class="info-content">
                  <h3>公司地址</h3>
                  <p>山西省太原市迎泽区新建南路15号</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="icon-phone"></i>
                </div>
                <div class="info-content">
                  <h3>联系电话</h3>
                  <p>0351-1234567</p>
                  <p>400-888-9999</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="icon-email"></i>
                </div>
                <div class="info-content">
                  <h3>电子邮箱</h3>
                  <p>info@huasujianshe.com</p>
                  <p>hr@huasujianshe.com</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="icon-website"></i>
                </div>
                <div class="info-content">
                  <h3>官方网站</h3>
                  <p>www.huasujianshe.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>在线留言</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">姓名 *</label>
                <input type="text" id="name" v-model="form.name" required>
              </div>
              
              <div class="form-group">
                <label for="company">公司名称</label>
                <input type="text" id="company" v-model="form.company">
              </div>
              
              <div class="form-group">
                <label for="phone">联系电话 *</label>
                <input type="tel" id="phone" v-model="form.phone" required>
              </div>
              
              <div class="form-group">
                <label for="email">电子邮箱 *</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>
              
              <div class="form-group">
                <label for="subject">咨询主题</label>
                <select id="subject" v-model="form.subject">
                  <option value="">请选择</option>
                  <option value="business">商务合作</option>
                  <option value="recruitment">人才招聘</option>
                  <option value="project">项目咨询</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">留言内容 *</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="submit-btn">提交留言</button>
            </form>
          </div>
        </div>
        
        <div class="map-section">
          <h2>公司位置</h2>
          <div class="map-container">
            <div class="map-placeholder">
              <i class="icon-map"></i>
              <p>地图加载中...</p>
            </div>
          </div>
        </div>
        
        <div class="departments-section">
          <h2>主要部门联系方式</h2>
          <div class="departments-grid">
            <div class="department-item">
              <h3>市场部</h3>
              <p>电话：0351-1234567</p>
              <p>邮箱：market@huasujianshe.com</p>
            </div>
            <div class="department-item">
              <h3>人力资源部</h3>
              <p>电话：0351-1234568</p>
              <p>邮箱：hr@huasujianshe.com</p>
            </div>
            <div class="department-item">
              <h3>技术部</h3>
              <p>电话：0351-1234569</p>
              <p>邮箱：tech@huasujianshe.com</p>
            </div>
            <div class="department-item">
              <h3>财务部</h3>
              <p>电话：0351-1234570</p>
              <p>邮箱：finance@huasujianshe.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactCompany',
  data() {
    return {
      form: {
        name: '',
        company: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 这里可以添加表单提交逻辑
      console.log('表单提交:', this.form);
      alert('留言提交成功！我们会尽快与您联系。');
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        company: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      };
    }
  }
}
</script>

<style scoped>
.contact-company {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.contact-info h2,
.contact-form h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.info-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  margin-right: 20px;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 600;
}

.info-content p {
  color: #666;
  line-height: 1.5;
  margin-bottom: 5px;
}

.contact-form {
  background: #f8f9fa;
  padding: 40px;
  border-radius: 15px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #f093fb;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.map-section {
  margin-bottom: 60px;
}

.map-section h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.map-container {
  height: 400px;
  background: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
}

.map-placeholder i {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #f093fb;
}

.departments-section h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.department-item {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.department-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.department-item h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
}

.department-item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .content-section {
    padding: 30px;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    padding: 30px;
  }
  
  .departments-grid {
    grid-template-columns: 1fr;
  }
}
</style>
