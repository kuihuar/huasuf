 <template>
  <section class="section footer fp-auto-height">
    <div class="wp">
      <div class="foot1 flex">
        <div class="box1">
          <div class="t1">华苏建设有限公司</div>
          <div class="t2">匠心铸精品，智创赢未来</div>
          <div class="share">
            <span class="wx"></span>
            <span class="qq"></span>
            <span class="wb"></span>
          </div>
          <div class="btn">
            <router-link to="/company/about">
              了解更多
              <span class="icon"></span>
            </router-link>
          </div>
        </div>
        
        <div class="box2">
          <dl v-for="(group, index) in linkGroups" :key="index">
            <dt>{{ group.title }}</dt>
            <dd v-for="(link, linkIndex) in group.links" :key="linkIndex">
              <router-link :to="link.href" :target="link.target">{{ link.title }}</router-link>
            </dd>
          </dl>
        </div>
        
        <div class="box3">
          <div class="tel">联系我们</div>
          <dl>
            <dd>地址：山西省太原市迎泽区迎泽大街300号</dd>
            <dd>电话：0352-12345678</dd>
            <dd>邮箱：info@huasu.com</dd>
          </dl>
          <div class="more">
            更多联系方式
            <span class="icon"></span>
          </div>
        </div>
      </div>
      
      <div class="foot2">
        <div class="copyright">
          <p>&copy; 2024 华苏建设有限公司 版权所有</p>
          <p>晋ICP备12345678号-1</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {
      linkGroups: [
        {
          title: '关于华苏',
          links: [

          { id: 11, title: '公司简介', href: "/company/about" },
          { id: 13, title: '公司荣誉', href: "/company/honor" },
          { id: 14, title: '联系我们', href: "/company/contact" }
          ]
        },
        {
          title: '公司动态',
          links: [
            { title: '新闻中心', href: "/news/center" },
            { title: '国际资讯', href: "/news/corporate" },
            { title: '公司要闻', href: "/news/company" }
          ]
        },
        // {
        //   title: '全产业链服务',
        //   links: [
        //     { title: '三大支柱', href: '#', target: '_self' },
        //     { title: '六大支撑', href: '#', target: '_self' }
        //   ]
        // },
        {
          title: '科技创新',
          links: [
            { title: '科技成果', href: "/tech/achievements" },
            { title: '创新体系', href: "/tech/innovation" },
            { title: '成果推广', href: "/tech/promotion" },
            { title: '科技动态', href: "/tech/application" }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
@import '/src/assets/css/reset.css';
@import '/src/assets/css/style.css';
/* 隐藏 fullpage.js 水印 */
.fp-watermark {
  display: none !important;
}
</style>
