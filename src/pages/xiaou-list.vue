<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-flex-hc l-margin">
          <i class="l-icon l-text-main">&#xe662;</i>&ensp;
          <h3 class="l-rest">我的小U</h3>
          <!-- <a class="l-fs-m">绑定记录</a> -->
        </div>
        
        <div class="l-flex-hc l-bg-white" style="padding: 0.75rem 1rem;">
          <div class="l-rest">小U信息</div>
          <div>
            贡献利润<span class="l-fs-xs l-text-gray">&ensp;/&ensp;元</span>
          </div>
        </div>
        
        <div class="l-flex-hc l-link-arrow l-padding-btn l-bg-white l-border-t l-margin-b" @click="gotoShop" v-if="selfInfo.userName">
          <i class="l-avatar l-margin-r" :style="{'background-image': 'url(' + $utils.image.wxHead(selfInfo.image) + ')'}"></i>
          <div class="l-rest">{{selfInfo.userName}}</div>
          <div class="_money">{{selfInfo.amount | currency}}</div>
        </div>

        <div class="l-flex-hc l-link-arrow l-padding-btn l-bg-white l-border-t" v-for="item in list" @click="getXiaouInfo(item)">
          <i class="l-avatar l-margin-r" :style="{'background-image': 'url(' + $utils.image.wxHead(item.image) + ')'}"></i>
          <div class="l-rest">{{item.userName}}</div>
          <div class="_money">{{item.amount | currency}}</div>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infinite">
          <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
          <div class="l-text-gray l-fs-m" slot="no-results">没有相关的数据</div>
          <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
        </infinite-loading>
      </div>
    </div>
    <div class="l-page" id="page-info">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">小U信息</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-flex-hc l-bg-white l-margin-b" style="padding:2rem 0.75rem;">
          <div class="l-rest">贡献利益</div>
          <div class="l-text-ok">{{xiaouInfo.amount | currency}}</div>
          &ensp;元
        </div>

        <div class="l-bg-white _info">
          <p>
            <span class="mui-pull-right">{{xiaouInfo.userName}}</span>
            <span class="l-text-gray">小U姓名</span>
          </p>
          <p>
            <span class="mui-pull-right">{{xiaouInfo.becomeAgentDate}}</span>
            <span class="l-text-gray">加入时间</span>
          </p>
          <p>
            <span class="mui-pull-right">{{xiaouInfo.areas}}</span>
            <span class="l-text-gray">所属区域</span>
          </p>
          <p>
            <span class="mui-pull-right">{{xiaouInfo.number}}</span>
            <span class="l-text-gray">客户人数</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import infiniteLoading from 'components/vue-infinite-loading'

export default {
  components: {
    infiniteLoading
  },
  data () {
    return {
      selfInfo: {
        userName: '',
        openId: '',
        amount: 0,
        image: ''
      },

      xiaouInfo: {},
      page: 1,
      list: [],
    }
  },
  methods: {
    gotoShop() {
      this.$link(this.$server.getShopHost() + '/me')
    },
    getXiaouInfo(item) {
      this.$mui.showWaiting()
      this.$server.getXiaoUInfo(item.lowerUserId).then(({data})=>{
        this.xiaouInfo = data
        this.$pageTo('#page-info', '小U信息')
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    onInfinite() {
      this.$server.getXiaoUList(this.page)
      .then(({data})=>{
        let returnList = data.nextLevelList
        this.selfInfo.userName = data.selfUserName
        this.selfInfo.amount = data.selfAmount
        this.selfInfo.image = data.selfImage
        this.list = this.list.concat(returnList)
        if(returnList.length > 0){
          this.$nextTick(()=>{
            this.$refs.infinite.$emit('$InfiniteLoading:loaded')    
          })
          
          if(returnList.length >= data.rows){
            this.page++
          }else{
            this.$refs.infinite.$emit('$InfiniteLoading:complete')
          }
        }else{
          this.$refs.infinite.$emit('$InfiniteLoading:complete')
        }
      }).catch(()=>{
        this.$refs.infinite.$emit('$InfiniteLoading:complete')
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-avatar{width: 2rem; height: 2rem;}
._money{min-width: 4.5rem; text-align: center;}
._info{
  padding: 0.75rem 0;
  p{margin:0.5rem 0.75rem;}
}
</style>