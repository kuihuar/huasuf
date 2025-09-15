<template>
  <section class="n_banner">
    <div class="img slow img_zd">
      <div class="img_hezi" style="background:url(../images/n_banner1.jpg);"></div>
      <img src="../images/n_banner1.jpg" class="none" />
    </div>
    <div class="top">
      <div class="wp">
        <h3 data-aos="fade-up" data-aos-delay="200">关于华苏</h3>
        <p data-aos="fade-up" data-aos-delay="600"></p>
      </div>
    </div>
    <section class="list_sj" data-aos="fade-up">
      <div class="wp">
        <ul>
          <li class="on"><a href="#" title="集团简介">集团简介</a></li>
          <li><a href="#" title="组织架构">组织架构</a></li>
          <li><a href="#" title="集团荣誉">集团荣誉</a></li>
          <li><a href="#" title="联系华苏">联系华苏</a></li>
        </ul>
      </div>
    </section>
  </section>
  
  <!-- 手机端 内页菜单 -->
  <section id="m_n_nav">
    <div id="n_n_title">
      <a id="bnt_back" href="javascript:history.go(-1)" class="iconfont">
        <img src="../images/m_n_nav_left.svg" />
      </a>
      <h1>集团简介</h1>
      <div id="bnt_sub_nav" class="iconfont">
        <img src="../images/m_n_nav_right.svg" />
      </div>
    </div>
    <div id="sub_nav_content">
      <dl>
        <dt class="on">
          <a href="#" title="集团简介">集团简介</a>
        </dt>
        <!-- <dt>
          <a href="#" title="组织架构">组织架构</a>
        </dt> -->
        <dt>
          <a href="#" title="集团荣誉">集团荣誉</a>
        </dt>
        <dt>
          <a href="#" title="联系华苏">联系华苏</a>
        </dt>
      </dl>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompanyBanner'
}
</script>

<style scoped>
@import '/src/assets/css/reset.css';
@import '/src/assets/css/style.css';
</style>
