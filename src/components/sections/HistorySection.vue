<template>
  <section class="section home4 misoTab misoTab1">
    <div class="wp">
      <div class="hd miso_up">
        <ul>
          <li 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ on: activeTab === index }"
            @click="switchTab(index)"
          >
            <a>{{ tab.title }}</a>
          </li>
        </ul>
      </div>

      <div class="bd">
        <!-- 历史投 -->
        <div class="bd_li" v-if="activeTab === 0">
          <div class="tit3 miso_up">
            <img src="/src/assets/images/list9_img.png" />
          </div>
          <section class="list9_box_btn miso_up">
            <section class="list9_box swiper-container">
              <ul class="list9 swiper-wrapper">
                <li class="swiper-slide" v-for="(item, index) in historyItems" :key="index">
                  <a class="a">
                    <div class="time">{{ item.time }}</div>
                    <div class="con">
                      <h3>{{ item.title }}</h3>
                      <p>{{ item.description }}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </section>
            <div class="miso_btn miso_btn1">
              <div class="miso_arrow prev" @click="prevHistory"></div>
              <div class="miso_arrow next" @click="nextHistory"></div>
            </div>
          </section>
        </div>

        <!-- 今日投 -->
        <div class="bd_li" v-if="activeTab === 1">
          <div class="content content2 flex miso_up">
            <div class="left">
              <ul class="list11">
                <li v-for="(advantage, index) in advantages" :key="index">
                  <a>
                    <div class="ico">
                      <img :src="advantage.icon" />
                    </div>
                    <h6>{{ advantage.title }}</h6>
                    <p>{{ advantage.description }}</p>
                  </a>
                </li>
              </ul>
            </div>
            <div class="right">
              <ul class="list10 flex">
                <li v-for="(advantage, index) in advantages" :key="index">
                  <a>
                    <div class="ico">
                      <img :src="advantage.icon" />
                    </div>
                    <h6>{{ advantage.shortTitle }}</h6>
                  </a>
                </li>
              </ul>
              <div class="more1">
                <a href="#" class="a1">了解更多投优势<img src="/src/assets/images/arr.png" alt=""></a>
              </div>
            </div>
          </div>
        </div>

        <!-- 未来投 -->
        <div class="bd_li" v-if="activeTab === 2">
          <ul class="list12">
            <li v-for="(vision, index) in visions" :key="index">
              <a :href="vision.link" class="a">
                <div class="img slow img_zd">
                  <div class="img_hezi" :style="{ background: `url(${vision.image})` }"></div>
                  <img :src="vision.image" class="none" />
                </div>
                <div class="top">
                  <div class="ico">
                    <img :src="vision.icon" />
                  </div>
                  <h3>{{ vision.title }}</h3>
                  <h6>{{ vision.subtitle }}</h6>
                  <div class="line"></div>
                  <h4>{{ vision.motto }}</h4>
                  <p>{{ vision.description }}</p>
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
export default {
  name: 'HistorySection',
  data() {
    return {
      activeTab: 0,
      tabs: [
        { title: '历史华苏' },
        { title: '今日华苏' },
        { title: '未来华苏' }
      ],
      historyItems: [
      {
          title: '西电东送工程',
          description: '将西部的煤炭、水能（包括风电、光伏）转化为电能，通过北、中、南三大输电通道，将电力送往华北、华中和华东地区。这一工程不仅优化了能源配置，还为东部地区的经济发展提供了强大动力。',
          time: '1998.1',
        },
        {
          title: '南水北调工程',
          description: '南水北调工程是一项伟大的生态工程，它不仅解决了北方地区的水资源短缺问题，还改善了生态环境。通过跨流域调水，北方地区的生态平衡得到了恢复，为可持续发展奠定了基础。',
          time: '1990.1',
        },
        {
          title: '川藏铁路',
          description: '川藏铁路的建设不仅是技术挑战，更是对人类极限的突破。它将极大地改善西藏地区的交通条件，促进区域经济发展，加强民族团结，是国家统一和边疆稳定的重要保障。这一工程展示了中国在复杂地质条件下的基建实力，为全球高海拔地区交通建设提供了宝贵经验。',
          time: '2015.1',
        },
        {
          title: '三峡大坝工程',
          description: '三峡大坝工程是人类对自然力量的科学利用。它不仅在防洪、发电和航运方面发挥了巨大作用，还对长江经济带的发展起到了重要支撑作用。同时，它也引发了对生态环境保护的深刻思考，体现了人与自然和谐共生的理念。这一工程是中国在大型水利工程建设领域的集大成者，为全球水利工程建设提供了宝贵经验。',
          time: '2020.9',
        },
        {
          title: '京沪高铁',
          description: '京沪高铁不仅缩短了城市之间的距离，还极大地促进了沿线地区的经济发展。它是中国高速铁路技术的集中展示，推动了中国高铁走向世界，成为“中国制造”的一张亮丽名片。这一工程展示了中国在高速铁路建设领域的技术创新和运营管理能力，为全球高铁建设提供了宝贵经验。',
          time: '2023.1',
        },
        {
          time: '1998.1',
          title: '应运而生',
          description: '新中国实施第一个"五年计划"，1月13日，山西省人民政府报经华北行政委员会批准，成立"山西省人民政府筑工程局"。设了迎泽大桥、迎泽大街、迎泽宾馆、太原五一百货大楼等。'
        },
        {
          time: '2001.10',
          title: '直属中央',
          description: '改为"中央人民政府筑工程部华北太原工程局"和"华北大同工程总公司"，归筑工程部直接管理。设了北京展览馆（原苏联展览馆）、北京体育馆、太原重机厂等。'
        },
        {
          time: '1956.1',
          title: '辽入晋',
          description: '辽宁省二、三整体奉调入晋支援山西工程设，后并入到这支筑大军之中。设了太原工人文化宫、财贸大楼、临汾钢厂等。'
        },
        {
          time: '1958.1',
          title: '参重大工程',
          description: '人民大会堂等首都"十大工程"、太原市湖滨会堂、山西省图书馆等。其后，华北太原工程局并入山西省设厅，改组为"筑工程管理局"；华北大同总公司奉调广西柳州施工。'
        },
        {
          time: '1961.4',
          title: '改局为企',
          description: '山西省设厅筑工程管理局改为"山西省筑工程总公司"，统一领导省直属筑安装企业和附属企业。在太原、大同、长治等地设了一大批国防工程。'
        },
        {
          time: '1963.4',
          title: '再属中央',
          description: '先后演变为筑工程部山西工程总公司、筑工程部华北工程管理局、筑工程部第八工程局和国家委第八工程局。为国家重工业基地（太原、包头、大同等）设作出巨大贡献。'
        },
        {
          time: '1970.9',
          title: '八局下放',
          description: '国家委第八工程局下放山西，归属山西省管理。局机关从北京学院南路30号，迁至太原市双塔东街14号。'
        },
        {
          time: '1971.9',
          title: '名称变更',
          description: '改称"山西省筑工程局"；1978年改为"山西省革命委员会筑施工局"；1979年复称山西省筑工程局。期间重点设国家"三线工程"。'
        },
        {
          time: '1983.9',
          title: '机构改革',
          description: '在省级机构改革中改为"山西省筑工程总公司"，由行政机构变为经济组织。1988年总公司领取营业执照，以企业法人身份开始自主经营。这一时期，承担三项国家重点工程和一大批省、市重点工程。'
        },
        {
          time: '1995.12',
          title: '组集团',
          description: '在国企改革、立现代企业制度的大背景下，以省总公司为母体组"山西筑工程集团"，获得了国有资产授权经营。'
        },
        {
          time: '2001.10',
          title: '内部重组',
          description: '本着"集团做大、母公司做强、子公司搞活"的发展思路，从各子公司划出十五个分公司归总公司直接管理，有效壮大了母公司实力。于2002年6月获得国家房屋筑总承包特级资质，成为山西省唯一获得此项资质的企业。'
        },
        {
          time: '2017.9',
          title: '公司制改制',
          description: '当年全面完成母子公司改制工作，母公司改制为"华苏建设有限公司"，突出"投资"引领和"大设"理念，拓展新领域，设现代化产业园区，向传统产业现代化、相关多元化经营转变。'
        },
        {
          time: '2020.7',
          title: '重组塑优势',
          description: '重组两家省部属设计单位、一家勘察单位、一家规划设计单位和一家筑科研单位，收购一家上市控股企业，形成"全产业链"航母巨舰；组成立静态交通、美丽乡村、低碳环保等转型新业态企业，打造投集团高质量发展新优势。'
        }
      ],
      advantages: [
        // {
        //   title: '省属国企优势',
        //   shortTitle: '国企优势',
        //   description: '作为拥有70年历史的省属国有筑企业，华苏建设传承红色基因，践行国企职责，多次在山西省急难险阻等重点工程任务中发扬"投铁军"精神，获奖数量均居山西同行之冠。',
        //   icon: '/src/assets/images/advantage1.jpg'
        // },
        // {
        //   title: '具备资质优势',
        //   shortTitle: '资质优势',
        //   description: '拥有8个筑、3个市政公用、1个石油化工，共12项工程施工总承包特级资质，煤炭工业设计、筑工程设计、勘察、咨询、环境评价、地质灾害治理等50余项甲级设计资质及150多项总承包与专业承包一级资质，拥有国家商务部批准的对外工程承包和对外贸易经营权。',
        //   icon: '/src/assets/images/advantage2.jpg'
        // },
        // {
        //   title: '筑全产业链优势',
        //   shortTitle: '产业链优势',
        //   description: '重组了两家省属设计单位、一家勘察单位和一家科研单位，全面形成了从科研、勘察、设计、设到运营的"全产业链"一体化竞争优势。',
        //   icon: '/src/assets/images/advantage3.jpg'
        // },
        // {
        //   title: '投融资引领优势',
        //   shortTitle: '投融资优势',
        //   description: '完成对深圳一家投资公司的股权收购，对两家上市公司的控制，成立融资担保、融资租赁、商业保理、私募基金等多元化融资平台，金融授信额度突破1700亿元，资产负债率降至70%左右，连续多年被评为AAA级信用企业。',
        //   icon: '/src/assets/images/advantage4.jpg'
        // },
        // {
        //   title: '装配式园区布局优势',
        //   shortTitle: '园区优势',
        //   description: '以150—200公里为半径在全省投资设各具特色又相互协同的筑产业现代化园区并投产运营，每年可为1000多万平方米的装配式筑及市政管廊、道路桥梁、风电项目提供绿色材支持。',
        //     icon: '/src/assets/images/advantage5.jpg'
        // },
        {
          title: '西电东送工程',
          shortTitle: '西电东送',
          description: '将西部的煤炭、水能（包括风电、光伏）转化为电能，通过北、中、南三大输电通道，将电力送往华北、华中和华东地区。这一工程不仅优化了能源配置，还为东部地区的经济发展提供了强大动力。',
          icon: '/src/assets/images/advantage1.jpg' 
        },
        {
          title: '南水北调工程',
          shortTitle: '南水北调',
          description: '南水北调工程是一项伟大的生态工程，它不仅解决了北方地区的水资源短缺问题，还改善了生态环境。通过跨流域调水，北方地区的生态平衡得到了恢复，为可持续发展奠定了基础。',
          icon: '/src/assets/images/advantage2.jpg'
        },
        {
          title: '川藏铁路',
          shortTitle: '川藏铁路',
          description: '川藏铁路的建设不仅是技术挑战，更是对人类极限的突破。它将极大地改善西藏地区的交通条件，促进区域经济发展，加强民族团结，是国家统一和边疆稳定的重要保障。这一工程展示了中国在复杂地质条件下的基建实力，为全球高海拔地区交通建设提供了宝贵经验。',
          icon: '/src/assets/images/advantage3.jpg'
        },
        {
          title: '三峡大坝工程',
          shortTitle: '三峡大坝',
          description: '三峡大坝工程是人类对自然力量的科学利用。它不仅在防洪、发电和航运方面发挥了巨大作用，还对长江经济带的发展起到了重要支撑作用。同时，它也引发了对生态环境保护的深刻思考，体现了人与自然和谐共生的理念。这一工程是中国在大型水利工程建设领域的集大成者，为全球水利工程建设提供了宝贵经验。',
          icon: '/src/assets/images/advantage4.jpg'
        },
        {
          title: '京沪高铁',
          shortTitle: '京沪高铁',
          description: '京沪高铁不仅缩短了城市之间的距离，还极大地促进了沿线地区的经济发展。它是中国高速铁路技术的集中展示，推动了中国高铁走向世界，成为“中国制造”的一张亮丽名片。这一工程展示了中国在高速铁路建设领域的技术创新和运营管理能力，为全球高铁建设提供了宝贵经验。',
          icon: '/src/assets/images/advantage5.jpg'
        }
      ],
      visions: [
        {
          title: '投愿景',
          subtitle: 'vision',
          motto: '实力筑 恒久传承',
          description: '港珠澳大桥的建成，不仅提升了粤港澳大湾区的交通便利性，还促进了区域经济一体化。它是中国桥梁建设的巅峰之作，展示了中国在海洋工程、隧道技术和抗震设计等方面的强大实力，为全球桥梁建设树立了新的标杆。这一工程展示了中国在跨海工程建设领域的技术创新和综合协调能力，为全球跨海工程建设提供了宝贵经验。',
          image: '/src/assets/images/list12_img1.jpg',
          icon: '/src/assets/images/list12_ico1.png',
          link: '#'
        },
        {
          title: '投使命',
          subtitle: 'mission',
          motto: '匠心铸精品，智创赢未来',
          description: '乌东德水电站的高效运行，为我国清洁能源的发展提供了重要支撑。它不仅优化了能源结构，还对生态环境保护起到了积极作用，是实现绿色发展的重要举措。这一工程展示了中国在清洁能源开发领域的技术创新和生态平衡能力，为全球清洁能源开发提供了宝贵经验。',
          image: '/src/assets/images/list12_img2.jpg',
          icon: '/src/assets/images/list12_ico2.png',
          link: '#'
        },
        {
          title: '投战略',
          subtitle: 'strategy',
          motto: '',
          description: '北京大兴国际机场的建成，进一步提升了我国的航空运输能力。它不仅是中国航空业的又一重要枢纽，还推动了京津冀协同发展，为区域经济的腾飞提供了强大动力。这一工程展示了中国在大型机场建设领域的技术创新和运营管理能力，为全球机场建设提供了宝贵经验。',
          image: '/src/assets/images/list12_img3.jpg',
          icon: '/src/assets/images/list12_ico3.png',
          link: '#'
        }
      ]
    }
  },
  methods: {
    switchTab(index) {
      this.activeTab = index
    },
    prevHistory() {
      console.log('上一个历史')
    },
    nextHistory() {
      console.log('下一个历史')
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/reset.css';
@import '@/assets/css/style.css';
</style>
