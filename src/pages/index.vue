<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <div class="mui-content l-bg-white">
      <div class="bg-top">
        <img src="~assets/images/layout-009.png" alt="">
        <div class="l-avatar l-rel" @click="$link('/me/setting', 'page-in')" :style="{'background-image': 'url('+ $utils.image.thumb(indexData.image, 60, 60) +')'}">
          <span class="l-icon">&#xe6e3;</span>
        </div>
        <p>{{indexData.agentInfoName}}</p>
      </div>
      <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
      <br>
      <div class="l-text-center l-border-t" style="padding:1rem 0; margin:0 2rem;" @click="$link('/income/report', 'page-in')">
        <p class="l-fs-l">总收益(含待审核返利) <span class="l-text-gray l-fs-s">/元</span></p>
        <p class="l-text-hot l-fs-xl">{{indexData.allBackAmount | currency}}</p>
      </div>

      <div class="l-text-center l-border-t" style="padding:1rem 0; margin:0 2rem;" @click="$link('/xiaou', 'page-in')">
        <p class="l-fs-l">我的小U <span class="l-text-gray l-fs-s">/人</span></p>
        <p class="l-text-main l-fs-xl">{{indexData.number}}</p>
      </div>

      <div style="margin:1rem 2rem;">
        <button type="button" class="mui-btn l-btn-main" @click="inviteAgent">邀请代理商</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      indexData: {}
    }
  },
  methods: {
    inviteAgent() {
      this.$link(this.$server.getShopHost() + '/me/qrcode')
    }
  },
  created() {
    this.loading = true
    this.$server.getIndexData().then(({data})=>{
      this.indexData = data
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.bg-top{
  text-align: center;
  img{vertical-align: top;}
  .l-icon{
    position:absolute;bottom:-0.2rem;right:-0.2rem; color:#12c390; line-height: 1; font-size: 1.2rem; z-index: 1;
  }
  .l-icon:before{
    content: ''; background: #fff; width: 1.2rem; height: 1.2rem; border-radius: 50%; z-index: -1;
    position: absolute; transform: scale(0.8);
  }
}
</style>