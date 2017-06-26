<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">关于U视一号</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <a class="mui-bar mui-bar-footer l-about-contact l-flex-vhc" href="http://p.qiao.baidu.com/cps/chat?siteId=10424067&userId=23235048">
      <span><i class="l-icon l-fs-l">&#xe70d;</i>&nbsp;在线客服</span>
    </a>
    <div class="mui-content">
      <div class="l-about-item">
        <h3 class="_tit">公司介绍</h3>
        <div class="_cont">
          <p>“U视一号”创办于2016年12月，是由贵州U视一号生物科技有限公司运营的高端视力健康管理品牌。</p>
          <p>U视一号”作为专业的视力健康管理及体验机构，拥有一个由国内各大中医药院校教授、博士组成的核心技术团队，他们以传统中医基础理论为指导，探寻中医明目古方古法，研究中医调理视力问题之机理，结合应用国际先进的视觉训练方式，融合视光学、经络腧穴学、心理学，项目经广东省中管局批准立项、历经3年临床双盲试验后成果成功推向市场。</p>
          <p>经过多年的蕴育与成长，U视一号视力健康体验、改善及训练服务得到越来越多家长和会员的实践认可与口碑传播。</p>
        </div>
      </div>
      <div class="l-about-item l-margin-t">
        <h3 class="_tit">公司产品</h3>
        <div class="_cont">
          <ul>
            <li>近视调理型产品：明目贴、体质贴</li>
            <li>智慧护眼仪</li>
            <li>眼贴系列</li>
            <li>喷喷系列</li>
          </ul>            
        </div>
      </div>
      <div class="l-about-item l-margin-t">
        <h3 class="_tit">联系我们</h3>
        <div class="_cont l-text-center">
          <div>广州市天河区陶庄路五号空间3F009</div>
          <div>客服电话：400-180-6900<br>服务时间：9:00-18:00</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      
    }
  },
  methods: {
  
  },
  created() {
    
  }
}
</script>
<style scoped lang="less">
.l-about-contact{
  /* background: #ff784e url(~assets/images/layout-003.jpg) no-repeat 50% 50%; background-size: 100% 100%; */
  background: linear-gradient(135deg, #12c390, #12c390, #12c390) no-repeat 50% 50%; background-size: 100% 100%;
  text-align: center; color: #fff; /* padding: 1rem 0; */
  h3{margin-bottom: 0.375rem;}
  h3:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #fff;
  }
  p{font-size: 0.75rem; text-align: left; width: 9rem; margin: auto;}
  a{color: #fff;}
}
.l-about-item{
  overflow: hidden; background: #fff; padding: 0.5rem 0;
  ._tit{
    text-align: center; color: #12c390; margin: 0.75rem 0;
  }
  ._tit:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #12c390;
  }
  ._cont{
    margin: 0.75rem; font-size: 0.75rem;
    p{text-indent: 2em;}
    ul{ list-style-type: decimal; padding: 0 0 0 1rem; }
  }
}
</style>