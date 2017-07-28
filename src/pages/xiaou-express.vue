<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <template v-if="expressInfo && expressInfo.code">
        <div class="l-flex-hc l-bg-white l-padding-lr">
          <div class="l-text-warn l-margin-r">
            <i class="l-icon" style="font-size:3rem;">&#xe647;</i>
          </div>
          <div class="l-rest l-fs-m">
            <p>物流状态：<span class="l-text-warn">{{expressInfo.stateInfo}}</span></p>
            <p class="l-text-gray">物流公司：{{expressInfo.name}}</p>
            <p class="l-text-gray">物流单号：{{expressInfo.code}}</p>
          </div>
        </div>
        <div class="l-bg-white l-margin-tb">
          <ul class="l-step-list">
            <li class="_item" :class="{'_active': index === 0}" v-for="(item,index) in expressInfo.expressList">
              <p>[{{item.areaName}}]{{item.context}}</p>
              <p class="l-fs-s l-margin-t-xs">{{item.ftime}}</p>
            </li>
          </ul>
        </div>
      </template>
      <!-- 空数据 -->
      <div class="l-data-null" v-if="expressInfo && !expressInfo.code">
        <div class="_icon"><i class="l-icon l-text-warn">&#xe617;</i></div>
        <p class="_text">商品正等待快递小哥揽收呢~</p>
      </div>
      <!-- 空数据 end-->
      <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      loading: false,
      expressInfo: null
    }
  },
  mounted() {
    this.loading = true
    this.$server.getXiaoUExpress(this.$route.params.code).then(({data})=>{
      this.expressInfo = data || {}
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-step-list{
  margin: 0; padding: 0; list-style: none;
  ._item{
    border-left: 1px solid #eee; margin:0 0.75rem 0 1.05rem; padding: 0.75rem 0 0.75rem 1.05rem; position: relative;
    color: #bbb; font-size: 0.75rem;
  }
  ._item:before{
    content: ''; position: absolute; top: 0.95rem; left: -0.3rem;
    width: 0.6rem; height: 0.6rem; border-radius: 50%; background: #efeff4;
  }
  ._item:after{
    content: ''; position: absolute; left: 1.05rem; right: 0; bottom: 0; border-bottom: 1px solid #efeff4;
  }
  ._item:last-child:after{border-bottom-color: transparent;}

  ._active{
    color: #39b94d;
  }
  ._active:before{
    box-shadow: 0 0 5px 0 #39b94d;
    background: #39b94d;
  }
}
</style>