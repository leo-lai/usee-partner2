<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content">
      <div class="l-margin-tb">
        <ul class="mui-table-view mui-table-view-chevron">
          <li class="mui-table-view-cell" @click="$link('/me/info', 'page-in')">
            <span class="mui-navigate-right">个人信息</span>
          </li>
          <li class="mui-table-view-cell" @click="$link('/me/pwd', 'page-in')">
            <span class="mui-navigate-right">更改密码</span>
          </li>
          <li class="mui-table-view-cell" @click="notify">
            <span class="mui-navigate-right">消息推送</span>
            <div class="mui-switch" :class="{'mui-active': isNotice}">
              <div class="mui-switch-handle"></div>
            </div>
          </li>
        </ul>
        <div class="l-margin l-fs-xs l-text-gray" style="margin-top:0.25rem;">开启消息推送您将收到客户关注及购买返利等微信消息通知</div>


        <ul class="mui-table-view mui-table-view-chevron l-margin-t">
          <li class="mui-table-view-cell" @click="$link('/help', 'page-in')">
            <span class="mui-navigate-right">帮助与说明</span>
          </li>
          <li class="mui-table-view-cell" @click="$link('/about', 'page-in')">
            <span class="mui-navigate-right">关于U视一号</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      isNotice: true,
      userInfo: {}
    }
  },
  methods: {
    notify() {
      this.isNotice = !this.isNotice
      this.$mui.showWaiting()
      this.$server.user.notify(Number(this.isNotice)).then(({data})=>{
        if(!data){
          this.$mui.confirm('接收消息通知需要绑定微信，请刷新个人信息授权获取微信信息', '开启通知失败', ['取消', '绑定'], (e)=>{
            if(e.index == 1){
              this.refreshUserInfo()
            }
          })
          this.isNotice = !this.isNotice  
        }
      }).catch(()=>{
        this.isNotice = !this.isNotice
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    refreshUserInfo() {
      if(this.$device.isWechat){
        window.location.replace(this.$server.getGrantUrl('/me/setting', undefined, 'snsapi_userinfo'))
      }else{
        this.$mui.toast('请使用微信浏览器打开')
      }
    },
    logout() {
      this.$mui.confirm('是否退出登录？', null, null, (e)=>{
        if(e.index == 1){
          this.$server.logout(false, '/me')
        }
      })
    }
  },
  created() {
    // if(this.$route.query.code && this.$device.isWechat){
    //   this.$mui.showWaiting('刷新中...')
    //   this.$server.user.resetWxInfo(this.$route.query.code).then(({data})=>{
    //     this.$mui.toast('同步成功')
    //     this.$storage.local.remove('qrcode_img')
    //     this.$link('/me', 'page-out', 'replace')
    //   }).finally(()=>{
    //     this.$mui.hideWaiting()
    //   })
    // }

    this.loading = true
    this.$server.user.getInfo().then(({data})=>{
      this.isNotice = data.notify == 0 ? false : true
    }).finally(()=>{
      this.loading = false
    })
  }
}
</script>
<style scoped lang="less">
.l-about-contact{
  /* background: #ff784e url(~assets/images/layout-003.jpg) no-repeat 50% 50%; background-size: 100% 100%; */
  background: linear-gradient(135deg, #1e1716, #4c3530, #403534) no-repeat 50% 50%; background-size: 100% 100%;
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
    text-align: center; color: #ff784e; margin: 0.75rem 0;
  }
  ._tit:after{
    content: ''; display: block; width: 1rem; margin:0.125rem auto 0; height: 0.1rem; background: #ff784e;
  }
  ._cont{
    margin: 0.75rem; font-size: 0.75rem;
    p{text-indent: 2em;}
    ul{ list-style-type: decimal; padding: 0 0 0 1rem; }
  }
}
</style>