<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
    </header>
    <nav-tab></nav-tab>
    <div class="mui-content">
      <div class="l-card-user">
        <div class="l-flex-hc l-padding l-border-b">
          <div @click="$link('/me/info', 'page-in')" class="l-avatar l-margin-r" :style="{'background-image': 'url('+ (userInfo.avatar || defaultAvatar) +')'}"></div>
          <div @click="$link('/me/info', 'page-in')" class="l-rest">
            <h3>{{userInfo.agentInfoName || userInfo.userName || userInfo.agentName}}</h3>
            <p class="l-fs-m">{{userInfo.phoneNumber}}</p>
          </div>
          <div @click="$link('/me/setting', 'page-in')" style="width: 5rem; text-align:right; padding:0.5rem 0;">
            <i class="mui-icon mui-icon-gear"></i>
          </div>
        </div>
        <!-- <div class="l-flex-hc l-text-center" style="padding: 1.6rem 0;">
          <div class="l-rest l-border-r">
            <p class="l-fs-l">{{userInfo.account | currency}} 元</p>
            <p class="l-fs-s">账户余额</p>
          </div>
          <div class="l-rest" @click="$link('/me/customer', 'page-in')">
            <p class="l-fs-l">{{userInfo.bindingNumber || 0}}</p>
            <p class="l-fs-s">我的客户</p>
          </div>
        </div> -->
      </div>
      <div class="l-bg-white l-margin-tb" style="padding:2rem 0;">
        <div class="l-qrcode-img">
          <div class="canvas" ref="qrcode">
            <qrcanvas :options="qrcodeObj"></qrcanvas>
          </div>
          <img :src="qrcodeImg" alt="">
        </div>
        <!-- <p class="l-text-center l-margin-t">U视一号<i class="l-text-warn">™</i></p> -->
        <p class="l-text-gray l-fs-s l-text-center l-margin-t">长按保存或点击右上角分享</p>
      </div>
      <div class="l-loading-inline" v-if="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
    </div>
  </div>
</template>
<script>
import navTab from 'components/nav-tab'
import Qrcanvas from 'qrcanvas-vue'

let qrLogo = require('assets/images/logo.jpg')
export default {
  components: {
    navTab, Qrcanvas
  },
  data () {
    return {
      loading: false,
      defaultAvatar: require('assets/images/avatar.jpg'),
      userInfo: {
        amount: 0,
        bindingNumber: 0,
        totalAmount: 0
      },
      qrcodeObj: {},
      qrcodeImg: ''
    }
  },
  methods: {
    convertToImage(){
      const qrcodeCanvas = this.$refs.qrcode.children[0]
      if(!qrcodeCanvas) return ''

      const type = 'image/png'
      // let imageData = qrcodeCanvas.toDataURL(type).replace(type, 'image/octet-stream') || ''
      let imageData = qrcodeCanvas.toDataURL(type) || ''
      this.$storage.local.set('qrcode_img', imageData, 1000*60*1)
      return imageData
    },
    createQrcode(imageData) {
      const self = this
      let bgImg = new Image()
      bgImg.onload = function(){
        self.qrcodeObj = Object.assign({}, self.qrcodeObj, {
          data: self.$server.getShopHost() + '/shop?_from=scan&_qruc=' + self.userInfo.userCode,
          cellSize: 5,
          correctLevel: 'H',
          typeNumber: 5,
          foreground: [
            {style: '#1e1716'},
            // outer squares of the positioner
            {row: 0, rows: 7, col: 0, cols: 7, style: '#4c3530'},
            {row: -7, rows: 7, col: 0, cols: 7, style: '#4c3530'},
            {row: 0, rows: 7, col: -7, cols: 7, style: '#4c3530'},
            // inner squares of the positioner
            {row: 2, rows: 3, col: 2, cols: 3, style: '#a27e76'},
            {row: -5, rows: 3, col: 2, cols: 3, style: '#a27e76'},
            {row: 2, rows: 3, col: -5, cols: 3, style: '#a27e76'},
          ],
          background: '#ffffff',
          logo: {
            image: bgImg,
            size: 0.1,
            fontStyle: 'bold',
            color: '#f35b54',
            text: 'U视一号',
            margin: 3
          },
          effect: {
            key: 'round', // image liquid round
            value: 0.2  
          }
        })

        self.$nextTick(()=>{
          self.qrcodeImg = self.convertToImage()
        })
      }
      bgImg.src = imageData
    },
    getUserInfo() {
      this.loading = true
      this.$server.user.getInfo().then(({data})=>{
        this.userInfo = data

        this.$server.user.getCount().then(({data})=>{
          this.userInfo = Object.assign({}, this.userInfo, data)
        })
        // 分享授权
        this.$server.wxShare({
          title: '我为U视喷喷代言',
          desc: '喷3次，停3秒，眨3下，U视喷喷9秒靓眼。',
          link: this.$server.getShopHost() + '/shop?_from=scan&_qruc=' + this.userInfo.userCode,
          imgUrl: this.userInfo.avatar
        }).catch(()=>{
          this.$mui.confirm('微信分享授权失败，请刷新重试', '', ['返回', '刷新'], (e)=>{
            if(e.index == 1){
              this.$url.reload()
            }
          })
        })

        if(this.$storage.local.get('qrcode_img')){
          this.$nextTick(()=>{
            this.qrcodeImg = this.$storage.local.get('qrcode_img')
          })
        }else{
          this.$server.getImageBase64(data.avatar).then(({data})=>{
            qrLogo = data
          }).finally(()=>{
            setTimeout(()=>{
              this.createQrcode(qrLogo)  
            }, 600)
          })
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>
<style scoped lang="less">
.l-card-user{
  background: linear-gradient(135deg, #1e1716, #4c3530, #403534); color: #fff;
}
.l-qrcode-desc{
  ul{padding: 0 0.75rem 0 1.75rem;list-style-type: decimal;}
}
.l-qrcode-img{
  width: 12rem; height: 12rem; margin:0 auto; text-align: center; position: relative; z-index: 1;
  .canvas{display: none;}
  img{width: 100%; height: 100%;}
}
.l-qrcode-img:after{
  content: '二维码生成中...'; position: absolute; left:0; right: 0; text-align: center; top: 50%; margin-top: -0.3rem;
  font-size: 0.6rem; color: #999; z-index: -1;
}
</style>