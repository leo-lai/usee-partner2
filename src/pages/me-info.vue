<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-mark l-text-center">
        <img src="~assets/images/layout-007.jpg" alt="">
        <div class="_inner l-flex-vhc">
          <a href="tel:400-180-6900"><i class="l-icon l-margin-r-s">&#xe649;</i>修改信息请联系客服</a>
        </div>
      </div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">合伙人姓名</span>
          <span class="l-text-gray">{{agentInfo.agentInfoName}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">联系方式</span>
          <span class="l-text-gray">{{agentInfo.phoneNumber}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-hc" @click="previewImage">
          <span class="l-rest">营业执照</span>
          <img style="height: 3rem;" :src="$utils.image.thumb(agentInfo.businessLicenseImage, 100, 100)" alt="">
        </li>
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">所在单位</span>
          <span class="l-text-gray">{{agentInfo.agentCompany}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-h">
          <span class="l-rest">我的推荐码</span>
          <span class="l-text-gray _right-val">{{agentInfo.agentCode}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">关联合伙人</span>
          <span class="l-text-gray">{{agentInfo.followNumber}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">加入时间</span>
          <span class="l-text-gray">{{agentInfo.becomeAgentDate}}</span>
        </li>
        <li class="mui-table-view-cell l-flex-hc">
          <span class="l-rest">代理区域</span>
          <span class="l-text-gray">{{agentInfo.area && agentInfo.area.join(',')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      agentInfo: {}
    }
  },
  methods: {
    previewImage() {
      if(this.agentInfo.businessLicenseImage){
        this.$server.previewImage([this.agentInfo.businessLicenseImage], 0)
      }
    }
  },
  created() {
    this.$mui.showWaiting()
    this.$server.getAgentInfo().then(({data})=>{
      this.agentInfo = data
    }).finally(()=>{
      this.$mui.hideWaiting()
    }) 
  }
}
</script>
<style scoped lang="less">
.mui-table-view-cell ._right-val{width: 60%; text-align: right; word-break: break-all; line-height: 1.2; padding: 0.2rem 0;}
.l-mark{
  position: relative;
  ._inner{
    position: absolute; top:0; left: 0; bottom: 0; right: 0; z-index: 2;
    color: #fff;
    a{color: #ddd;}
  }
}
.l-mark:before{
  position: absolute; top:0; left: 0; bottom: 0; right: 0; z-index: 1;
  content:''; background-color: rgba(0, 0, 0, 0.4);
}
</style>