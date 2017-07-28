<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-xiaou-list">
          <div class="l-flex-hc l-link-arrow l-padding-btn l-bg-white l-border-t" v-for="item in list" @click="showInfo(item.lowerShopAgentInfoId)">
            <i class="l-avatar l-margin-r" :style="{'background-image': 'url(' + $utils.image.wxHead(item.image) + ')'}"></i>
            <div class="l-rest">
              <h3>{{item.agentInfoName}}</h3>
              <p v-if="item.becomeAgentDate" class="l-fs-s">{{item.becomeAgentDate.split(' ')[0]}}</p>
            </div>
            <div :class="'_state-' + item.recommendExamineState">
              <span>{{recommendExamineState[item.recommendExamineState]}}, </span>
              <span>{{agentState[item.agentState]}}</span>
            </div>
          </div>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infinite">
          <div class="l-loading-inline" slot="spinner"><i class="mui-spinner"></i><span class="_txt">正在加载...</span></div>
          <div class="l-text-gray l-fs-m" slot="no-results">没有相关的数据</div>
          <div class="l-text-gray l-fs-m" slot="no-more">全部数据加载完毕</div>
        </infinite-loading>
      </div>
    </div>
    <div class="l-page" id="page-einfo">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">小U信息</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-panel-group l-form">
          <div class="_item l-flex-hc">
            <label class="_tit">申请类型</label>
            <div class="_ipt l-rest l-text-right">小U店长</div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">真实姓名</label>
            <div class="_ipt l-rest l-text-right">{{info.agentInfoName}}</div>
          </div>
          <div class="_item l-flex-hc">
            <label class="_tit">手机号码</label>
            <div class="_ipt l-rest l-text-right">{{info.phone}}</div>
          </div>
        </div>

        <div class="l-margin-tb l-padding l-bg-white">
          <h3 class="l-text-center l-margin-b">给小U发货的数量</h3>
          <div class="l-flex-hc l-border-t l-padding-t">
            <img style="width: 5rem; margin-left:0.75rem;" src="http://opii7iyzy.bkt.clouddn.com/partner/check/penpensuolue.png" alt="">
            <div class="l-rest l-text-center">
              <h3>U视一号舒眼喷雾</h3>
              <p class="l-text-warn l-fs-l l-margin-b-s"><span><b class="l-icon"></b>299.00</span></p>
              <span class="l-numbox">
                <i class="l-icon _minus" @click="numberMinus">&#xe631;</i>
                <input class="_num" type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="6" v-model="form.goodsNumber">
                <i class="l-icon _add" @click="numberAdd">&#xe602;</i>
              </span>
            </div>
          </div>
        </div>
        <div class="l-margin">
          <button type="button" class="mui-btn l-btn-main" @click="examine(1)">同意申请</button>
          <button type="button" class="mui-btn l-btn-white l-margin-t" @click="examine(0)">拒绝申请</button>
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
      agentState: ['系统未审核', '系统已通过', '系统已拒绝'],
      recommendExamineState: ['个人未审核', '个人已通过', '个人已拒绝'],
      info: {},
      page: 1,
      list: [],
      form: {
        goodsNumber: 0,
        isPass: ''
      }
    }
  },
  methods: {
    numberMinus() {
      this.form.goodsNumber = Math.max(this.form.goodsNumber - 1, 0)
    },
    numberAdd() {
      ++this.form.goodsNumber
    },
    getExamineInfo(lowerShopAgentInfoId = '') {
      return new Promise((resolve, reject)=>{
        if(!lowerShopAgentInfoId){
          reject('缺少参数')
          return
        } 

        this.$mui.showWaiting()
        this.$server.getXiaoUExamineInfo(lowerShopAgentInfoId).then(({data})=>{
          this.info = data
          this.form.lowerShopAgentInfoId = lowerShopAgentInfoId
          this.$storage.session.set('xiaoUExamineId', lowerShopAgentInfoId)
          resolve()
        }).catch(reject).finally(()=>{
          this.$mui.hideWaiting()
        })
      })
    },
    showInfo(lowerShopAgentInfoId = '') {
      this.getExamineInfo(lowerShopAgentInfoId).then(()=>{
        this.$pageTo('#page-einfo', '审核详情')
      })
    },
    examine(isPass = 1) {
      this.form.isPass = isPass
      this.$mui.showWaiting()
      this.$server.examineOk(this.form).then(({data})=>{
        this.$mui.toast('操作成功')
        this.$storage.session.remove('xiaoUExamineId')

        this.list = this.list.map((item)=>{
          if(item.lowerShopAgentInfoId === this.form.lowerShopAgentInfoId){
            item.recommendExamineState = isPass  
          }
          return item
        })

        this.$router.back()
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    onInfinite() {
      this.$server.getXiaoUExamine(this.page)
      .then(({data})=>{
        let returnList = data.agentInfos
        
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
  },
  mounted() {
    let id = this.$route.query.id || this.$storage.session.get('xiaoUExamineId') || ''
    if(id){
      this.getExamineInfo(id)  
    }
  },
  beforeDestroy() {
    this.$storage.session.remove('xiaoUExamineId')
  }
}
</script>
<style scoped lang="less">

.l-xiaou-list{
  .l-avatar{
    width: 2.5rem; height: 2.5rem;
  }
}

._money{min-width: 4.5rem; text-align: center;}
._state-0, ._state-1, ._state-2{
  text-align: center; background: #fd6648; color: #fff; padding: 0.125rem 0.5rem; font-size: 0.6rem;
}
._state-1{background: #39b94d; }
._state-2{background: #ff2828; }
._info{
  padding: 0.75rem 0;
  p{margin:0.5rem 0.75rem;}
}
</style>