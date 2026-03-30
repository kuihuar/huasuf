<template>
  <section class="index">
    <!-- 桌面端导航 -->
    <div class="nav_box white">
      <div class="nav_wrap fix">
        <h1 class="l logo" id="logo" @click="goToHome">
          <img src="@/assets/images/logo_w.png" alt="华苏建设有限公司">  
          <router-link to="/" style="display: inline;color: #ffffff;">华苏建设有限公司</router-link>
        </h1>
        <div class="nav fix r">
          <ul class="fix l">
            <li class="nav_li" v-for="item in navItems" :key="item.id">
              <router-link :to="item.href" :title="item.title">{{ item.title }}</router-link>
              <div class="dropdown" v-if="item.children">
                <div class="mwrap fix">
                  <div class="left">
                    <ul>
                      <li v-for="child in item.children" :key="child.id">
                        <router-link :to="child.href" :title="child.title">{{ child.title }}</router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="right fix">
                    <div class="infor">
                      <div class="box">
                        <div class="tit">
                          <p>{{ item.description }}</p>
                        </div>
                        <div class="con">
                          <p>{{ item.content }}</p>
                        </div>
                        <router-link :to="item.href" class="more"> 查看更多 <i class="icon"></i></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 移动端头部导航 -->
    <section class="m_header_box">
      <header id="m_header">
        <div class="mobile-menu" @click="toggleMobileMenu"></div>
      </header>
    </section>
    
    <!-- 移动端菜单（扁平分组） -->
    <div id="m_nav" :class="{ act: showMobileMenu }">
      <button type="button" class="close-btn" aria-label="关闭菜单" @click="closeMobileMenu">×</button>
      <ul class="m-nav-list">
        <li v-for="group in mobileNavGroups" :key="group.id" class="m-nav-group">
          <div class="m-nav-group-title">{{ group.title }}</div>
          <ul class="m-nav-links">
            <li v-for="(link, idx) in group.links" :key="idx">
              <router-link :to="link.href" class="m-nav-link" @click="closeMobileMenu">
                {{ link.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div
      v-show="showMobileMenu"
      class="nav_mask"
      aria-hidden="true"
      @click="closeMobileMenu"
    />
    
    <!-- 全屏菜单组件 -->
    <!-- <MenuComponent v-if="showMenu" :isVisible="showMenu" @close="closeMenu" /> -->
  </section>
</template>

<script>
import MenuComponent from './MenuComponent.vue'

export default {
  name: 'HeaderNav',
  components: {
    MenuComponent
  },
  data() {
    return {
      searchKeyword: '',
      showMenu: false,
      showMobileMenu: false, // 添加移动端菜单状态
      navItems: [
        {
          id: 1,
          title: '关于华苏',
          href: "/company",
          description: '匠心铸精品，智创赢未来',
          content: '华苏建设有限公司（以下简称"山西投"）系山西省规模最大的综合性国有投资设集团。其前身为中央人民政府工部太原工程局、国家工部华北工程管理局、国家工部和国家委第八工程局，组于1953年，1970年下放山西，改称山西省筑工程管理局。',
          children: [
            { id: 11, title: '公司简介', href: "/company/about" },
            { id: 13, title: '公司荣誉', href: "/company/honor" },
            { id: 14, title: '联系我们', href: "/company/contact" }
          ]
        },
        {
          id: 2,
          title: '公司动态',
          href: '/news',
          description: '立足山西 布局全国 开拓海外',
          content: '山西投现辖56个全资、控股和参股子公司，其中上市公司2家；职工总数3.5万余人，其中各类经营管理和专业技术人才2.7万余人；拥有7个筑、3个市政公用、1个石油化工，共11项工程施工总承包特级资质。',
          children: [
            { id: 21, title: '新闻中心', href: "/news/center" },
            { id: 22, title: '国际资讯', href: "/news/corporate" },
            { id: 23, title: '公司要闻', href: "/news/key" }
          ]
        },
        // {
        //   id: 3,
        //   title: '党建工作',
        //   href: '#',
        //   description: '立足山西 布局全国 开拓海外',
        //   content: '山西投现辖56个全资、控股和参股子公司，其中上市公司2家；职工总数3.5万余人，其中各类经营管理和专业技术人才2.7万余人；拥有7个筑、3个市政公用、1个石油化工，共11项工程施工总承包特级资质。',
        //   children: [
        //     { id: 31, title: '党建工作', href: '#' },
        //     { id: 32, title: '纪检监察', href: '#' },
        //     { id: 33, title: '工会工作', href: '#' },
        //     { id: 34, title: '团青工作', href: '#' }
        //   ]
        // },
        // {
        //   id: 4,
        //   title: '全产业链服务',
        //   href: '#',
        //   description: '实施名牌战略 营造时代精品',
        //   content: '近年来，在省委省政府坚强领导和大力支持下，山西投抢抓我省国资国企改革历史机遇，大刀阔斧推进改革改制与资产重组，解决了多年久拖不决的诸多难题，资产负债率大幅下降，资本状况显著改善。',
        //   children: [
        //     { id: 41, title: '三大支柱', href: '#' },
        //     { id: 42, title: '六大支撑', href: '#' }
        //   ]
        // },
        {
          id: 5,
          title: '科技创新',
          href: '#',
          description: '山西投连年入选"中国企业500强"',
          content: '展望未来，山西投将在省委省政府的正确领导下，进一步深化体制机制改革，持续创新商业模式，完善现代企业治理体系，深入推进内涵集约式发展，促进经营规模和经济效益持续稳健增长。',
          children: [
            { id: 51, title: '科技成果', href: '/tech/achievements' },
            { id: 52, title: '创新体系', href: '/tech/innovation' },
            { id: 53, title: '成果推广', href: '/tech/promotion' },
            { id: 54, title: '科技动态', href: '/tech/application' }
          ]
        },
        {
          id: 6,
          title: '企业文化',
          href: '#',
          description: '促进经营规模和经济效益持续稳健增长',
          content: '打造集投资、设、运营为一体的"全产业链"筑业龙头企业，向国内领先、国际知名、具有较强竞争力的"大设"集团迈进，全力冲刺"世界500强"。',
          children: [
            { id: 61, title: '企业文化', href: '/culture/corporate' },
            { id: 62, title: '发展历程', href: '/culture/history' }
          ]
        },
        {
          id: 7,
          title: '专题专栏',
          href: '#',
          description: '进一步深化体制机制改革',
          content: '近年来，在省委省政府坚强领导和大力支持下，山西投抢抓我省国资国企改革历史机遇，大刀阔斧推进改革改制与资产重组，解决了多年久拖不决的诸多难题，资产负债率大幅下降，资本状况显著改善。',
          children: [
            { id: 71, title: '学习宣传', href: '/specialcolumn/learning' },
            { id: 72, title: '市场开拓', href: '/specialcolumn/market' },
            { id: 73, title: '质量安全', href: '/specialcolumn/quality' }
          ]
        },
        {
          id: 8,
          title: '信息公开',
          href: '#',
          description: '匠心铸精品，智创赢未来',
          content: '华苏建设有限公司（以下简称"华苏建设"）系山西省规模最大的综合性国有投资设集团。其前身为中央人民政府工部太原工程局、国家工部华北工程管理局、国家工部和国家委第八工程局，组于1953年，1970年下放山西，改称山西省筑工程管理局。',
          children: [
            { id: 81, title: '通知公告', href: '/information/notifications' },
            { id: 82, title: '重大事项', href: '/information/events' },
            { id: 83, title: '人才招聘', href: '/information/talent' }
          ]
        }
      ]
    }
  },
  computed: {
    mobileNavGroups() {
      return this.navItems.map((item) => {
        if (item.children && item.children.length) {
          return {
            id: item.id,
            title: item.title,
            links: item.children.map((c) => ({
              title: c.title,
              href: c.href
            }))
          }
        }
        return {
          id: item.id,
          title: item.title,
          links: [{ title: item.title, href: item.href }]
        }
      })
    }
  },
  methods: {
    goToHome() {
      // 如果当前已经在首页，直接重新加载页面
      if (this.$route.path === '/') {
        window.location.reload()
        return
      }
      
      // 如果不在首页，跳转到首页（路由守卫会处理重新加载）
      this.$router.push('/')
    },
    handleSearch() {
      if (this.searchKeyword.trim()) {
        console.log('搜索关键词:', this.searchKeyword)
        // 这里可以添加搜索逻辑
      } else {
        alert('请输入关键字！')
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    closeMenu() {
      this.showMenu = false
    },
    // 添加移动端菜单方法
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      const btn = document.querySelector('.mobile-menu')
      if (this.showMobileMenu) {
        document.body.classList.add('navShow')
        btn?.classList.add('active')
      } else {
        document.body.classList.remove('navShow')
        btn?.classList.remove('active')
      }
    },
    closeMobileMenu() {
      this.showMobileMenu = false
      document.body.classList.remove('navShow')
      document.querySelector('.mobile-menu')?.classList.remove('active')
    }
  }
}
</script>

<style>
@import '@/assets/css/reset.css';
@import '@/assets/css/style.css';

.nav_box .nav_wrap{
  padding-right: 3%;
}
/* 移动端菜单样式 */
#m_nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  max-width: 350px;
  height: 100vh;
  /* background: #ffffff; */
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  z-index: 100001;
  transition: right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow-y: auto;
  box-shadow: -8px 0 32px rgba(0,0,0,0.3);
  border-left: 1px solid #34495e;
}

#m_nav.act {
  right: 0;
}

.m-nav-list {
  list-style: none;
  padding: 72px 0 120px 0;
  margin: 0;
}

.m-nav-group {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 0.12rem;
  margin-bottom: 0.12rem;
}

.m-nav-group-title {
  padding: 0.12rem 0.2rem 0.08rem;
  font-size: 0.15rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
}

.m-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.m-nav-links li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.m-nav-links li:last-child {
  border-bottom: none;
}

.m-nav-link {
  display: block;
  padding: 0.14rem 0.2rem;
  font-size: 0.14rem;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  min-height: 44px;
  box-sizing: border-box;
  line-height: 1.4;
}

.m-nav-link.router-link-active,
.m-nav-link:active {
  background: rgba(135, 206, 235, 0.2);
  color: #fff;
}

/* 菜单头部 */
#m_nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(0deg, #ffffff 0%, #34495e 100%);
  display: flex;
  align-items: center;
  padding: 0 30px;
}

#m_nav::after {
  content: '华苏建设';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 0 30px;
  z-index: 1;
  letter-spacing: 0.5px;
}

/* 关闭按钮 */
#m_nav .close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 34px;
  height: 34px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

#m_nav .close-btn:hover {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.3);
  transform: rotate(90deg);
}

/* 滚动条样式 */
#m_nav::-webkit-scrollbar {
  width: 4px;
}

#m_nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

#m_nav::-webkit-scrollbar-thumb {
  background: #87ceeb;
  border-radius: 2px;
}

#m_nav::-webkit-scrollbar-thumb:hover {
  background: #5dade2;
}

/* 添加微妙的背景纹理 */
#m_nav {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(135, 206, 235, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(44, 62, 80, 0.02) 0%, transparent 50%);
}

.nav_mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 100000;
}

/* 防止body滚动 */
body.navShow {
  overflow: hidden;
}

.m_header_box {transition: .6s;display: none;height: .7rem; width: 100%;position: relative;z-index: 100000;}
.m_header_box header{
	padding: 0 0 0 15px;
	height: .7rem;
	/* background: url(../images/footer.jpg) center bottom no-repeat;box-shadow: 0 3px 5px rgba(0,0,0,.05); */
	background-size: cover;position: fixed;top: 0;left: 0;right: 0;z-index: 100;
	display:flex;
	justify-content:space-between;align-items: center;
	/* background: #284ca7; */
}
/* 响应式显示控制 */
/* 移动端头部样式 - 使用更具体的选择器 */
section.index .m_header_box {
  display: none !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 60px !important;
  /* background: #333 !important; */
  background: transparent !important;
  z-index: 100001 !important;
  transition: none !important;
  justify-content: flex-end !important;
}

section.index #m_header {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  /* height: 80% !important; */
  padding: 0 20px !important;
}

/* 移动菜单按钮基础样式 */
.mobile-menu {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

/* 三横线效果 - 使用伪元素创建三条线 */
.mobile-menu::before,
.mobile-menu::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1px;
}

/* 中间线 - 使用元素本身 */
.mobile-menu {
  background: #ffffff;
  width: 20px;
  height: 2px;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 上横线 */
.mobile-menu::before {
  top: 8px;
  transform: translateY(0);
}

/* 下横线 */
.mobile-menu::after {
  bottom: 8px;
  transform: translateY(0);
}

/* 菜单展开时的 X 效果 - 完全隐藏中间线，只显示 X */
.mobile-menu.active::before {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.mobile-menu.active::after {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

.mobile-menu.active {
  background: transparent;
}

/* 悬停效果 */
.mobile-menu:hover::before,
.mobile-menu:hover::after,
.mobile-menu:hover {
  /* background: #87ceeb; */
  box-shadow: 0 0 8px rgba(135, 206, 235, 0.5);
}

/* 移动端显示 */
@media (max-width: 1199px) {
  .nav_box {
    display: none !important;
  }
  
  section.index .m_header_box {
    display: block !important;
  }
  
  section.index .mobile-menu {
    display: block !important;
  }
}

/* 桌面端隐藏 */
@media (min-width: 1200px) {
  .nav_box {
    display: block !important;
  }
  
  section.index .m_header_box {
    display: none !important;
  }
  
  section.index .mobile-menu {
    display: none !important;
  }
  
  #m_nav {
    display: none !important;
  }
  
  .nav_mask {
    display: none !important;
  }
}

/* 覆盖AOS的pointer-events限制，确保导航链接可以点击 */
.list_sj[data-aos] {
  pointer-events: auto !important;
}

.list_sj[data-aos] * {
  pointer-events: auto !important;
}
</style>
