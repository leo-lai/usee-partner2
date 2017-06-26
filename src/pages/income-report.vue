<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content l-bg-white">
        <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>

        <div class="l-flex-hc" style="margin:1rem;">
          <i class="l-icon l-text-main">&#xe9cb;</i>&ensp;
          <h3 class="l-rest">收益总览</h3>
          <span class="l-text-gray" @click="$pageTo('#page-help', '收益说明')"><i class="l-icon">&#xe692;</i>&ensp;收益说明</span>
        </div>

        <div class="l-income-item" @click="$link('/income/rebate', 'page-in')">
          <div class="l-margin-b">
            <span class="l-fr">返利汇总<i class="l-fs-xs">&ensp;/&ensp;元</i></span>
            <span class="l-fs-l">{{income.allBackAmount | currency}}</span>
          </div>
          <img src="~assets/images/layout-013.jpg" alt="">
        </div>

        <div class="l-income-item" @click="$link('/income/rebate?st=0', 'page-in')">
          <div class="l-margin-b">
            <span class="l-fr">待审核返利<i class="l-fs-xs">&ensp;/&ensp;元</i></span>
            <span class="l-fs-l">{{income.readyAmount | currency}}</span>
          </div>
          <img src="~assets/images/layout-014.jpg" alt="">
        </div>

        <div class="l-income-item" @click="$link('/income/rebate', 'page-in')">
          <div class="l-margin-b">
            <span class="l-fr">账户余额<i class="l-fs-xs">&ensp;/&ensp;元</i></span>
            <span class="l-fs-l">{{income.accountBalance | currency}}</span>
          </div>
          <img src="~assets/images/layout-015.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="l-page" id="page-help">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">收益说明</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-help-item">
          <div class="l-flex-hc l-help-item-hd l-border-b">
            <i class="l-text-main">01</i>
            <h3 class="l-rest">返利类型</h3>
          </div>
          <ul>
            <li><b>小U销售提成</b><br>旗下小U（包括个人小U账号）每成功销售一套都可以获得商品销售额的5%提成</li>
            <li><b>区域管理返点</b><br>代理商品配送到合伙人所代理区域时，合伙人可以获得该商品销售额的1%</li>
            <li><b>对冲流水</b><br>当客户因某些原因对订单申请退货退款时，如果平台同意退货退款则系统则会根据退款金额对应生成一条对冲流水抵消部分或全部该订单的返利</li>
          </ul>
        </div>

        <div class="l-help-item">
          <div class="l-flex-hc l-help-item-hd l-border-b">
            <i class="l-text-main">02</i>
            <h3 class="l-rest">返利状态</h3>
          </div>
          <ul>
            <li><b>未审核</b><br>订单支付完成则会生成对应的返利流水，此时的状态为审核中</li>
            <li><b>审核成功</b><br>订单在客户确认收货或物流反馈签收信息后，平台工作人员将对返利流水同意审核，通过则审核成功，返利佣金进入您的账户余额</li>
            <li><b>审核失败</b><br>返利流水经平台审核不通过则会状态会变成审核失败，该部分返利将不进入您的账户余额</li>
          </ul>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      loading: false,
      income: {},
    }
  },
  created() {
    this.loading = true
    this.$server.getIncomeReport().then(({data})=>{
      this.income = data
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-income-item{
  margin: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px 5px #ccc;
  overflow-x: hidden;
  padding: 1rem;
  box-shadow: 0 0 10px 1px #ccc;
}

.l-help-top{
  background: #fff; padding: 0.5rem;
  img{width: 3rem; height: 3rem; margin-right: 0.5rem;}
  .l-rest{padding: 0.25rem; font-size: 0.7rem; }
}
.l-help-item{
  margin:0 0 0.75rem 0; background: #fff;overflow: hidden;
  ul{padding-right: 0.75rem; font-size: 0.75rem;}
  li{margin:0.5rem 0;}
}
.l-help-item-hd{
  padding: 0 0.75rem;
  i{font-size: 1.6rem; margin-right: 0.5rem;}
  img{width: 1.6rem;}
}
</style>