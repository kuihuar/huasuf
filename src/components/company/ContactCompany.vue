<template>
  <section class="n_container">
    <section class="contact">
      <div class="fl01">
        <div class="wp">
          <!-- <div class="content flex">

          </div> -->
          <div class="left" data-aos="fade-right">
              <div class="img_box">
                <div class="img slow img_zd">
                  <div class="img_hezi" style=" background: url(../images/contact_img1.jpg);"></div>
                  <img src="../images/contact_img1.jpg" class="none" />

                </div>
              </div>
            </div>
            <div class="right" data-aos="fade-left">
              <h3>华苏建设有限公司</h3>
              <ul class="list19">
                <li><img src="@/assets/images/ksdh-icon1.png"  class="img_vsb_content">
                  <p>公司地址: 山西XXXX路8号</p>
                </li>
                <li><img src="@/assets/images/ksdh-icon1.png"  class="img_vsb_content">
                  <p>邮政编码: 030032</p>
                </li>
                <li><img src="@/assets/images/ksdh-icon1.png"  class="img_vsb_content">
                  <p>联系电话: 0351-00000000</p>
                </li>
                <li><img src="@/assets/images/ksdh-icon1.png"  class="img_vsb_content">
                  <p>电子邮箱: <a href="mailto:info@hsjs.com">info@hsjs.com</a> </p>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </section>
  </section>
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
