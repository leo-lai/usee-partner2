<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">关于U视一号</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-help-top l-flex-hc">
        <img src="~assets/images/icon-017.png" alt="">
        <div class="l-rest">注：具体细则见签订的加盟合同，与合同不一致地方，以签订的加盟合同为准。<br>如有疑问，可联系客服400-1806900</div>
      </div>
      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">01</i>
          <h3 class="l-rest">我成为合伙人能得到什么好处？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>获得加盟资金零售价等值货品，并一次性发货</li>
          <li>获得7500元的等值赠送商品</li>
          <li>平台合伙人账号1个，个人小U账号一个，25个他人小U账号的开通资格</li>
          <li>商城返佣，包括旗下所有小U的销售额提成，个人小U账号的商城销售返点，代理区域的区域管理返点</li>
          <li>推荐返佣，推荐合伙人或小U加入平台都有相应的返佣金额</li>
        </ul>
      </div>

      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">02</i>
          <h3 class="l-rest">我该做什么才能获得这些好处？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>推荐小U，旗下小U销售商品越多，您获得的提成越多，同时您还可以获得小U推荐提成，可以在首页点击“我的小U”查看旗下小U业绩</li>
          <li>代理更多区域，代理区域越多，您将获得越多区域的区域管理返点，即所有客户发货地址为您代理区域，您都可以享受返点</li>
          <li>平台会按每周一次的频率将您的收益以转账的形式提现至您的个人账户</li>
        </ul>
      </div>

      <div class="l-help-item">
        <div class="l-flex-hc l-help-item-hd l-border-b">
          <i class="l-text-main">03</i>
          <h3 class="l-rest">怎么推荐朋友加入平台一起赚钱？</h3>
          <img src="~assets/images/icon-016.png" alt="">
        </div>
        <ul>
          <li>您可以让朋友扫描您的个人小U码关注“U视一号“公众号，通过点击公众号推送招商信息填写申请并提交平台申请</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      
    }
  }
}
</script>
<style scoped lang="less">
.l-help-top{
  background: #fff; padding: 0.5rem;
  img{width: 3rem; height: 3rem; margin-right: 0.5rem;}
  .l-rest{padding: 0.25rem; font-size: 0.7rem; }
}
.l-help-item{
  margin: 0.75rem 0; background: #fff;overflow: hidden;
  ul{padding-right: 0.75rem; font-size: 0.75rem;}
  li{margin:0.5rem 0;}
}
.l-help-item-hd{
  padding: 0 0.75rem;
  i{font-size: 1.6rem; margin-right: 0.5rem;}
  img{width: 1.6rem;}
}
</style>