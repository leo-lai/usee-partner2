<template>
  <div class="l-page-group">
    <div class="l-page">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">{{ $route.meta.title }}</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-flex-hc _topbar l-border-b l-margin-b">
          <div class="l-fs-xs l-text-gray" @click="showFilter(true)">
            <i class="l-icon">&#xe6fc;</i><br>筛选
          </div>
          <h3 class="l-rest">收益明细</h3>
          <div class="l-fs-xs l-text-gray _date">
            <i class="l-icon">&#xe611;</i><br><span>{{month ? month + '月' : '月份'}}</span>
            <input type="month" @change="sltMonth">
          </div>
        </div>
        
        <div class="_list">
          <div class="l-flex-hc _item l-border-t" v-for="item in list" @click="getInfo(item)">
            
            <div class="_icon l-text-warn" v-if="item.rebateRecordState == 0">
              <i class="l-icon">&#xe674;</i>返利中
            </div>
            <div class="_icon l-text-ok" v-else-if="item.rebateRecordState == 1">
              <i class="l-icon">&#xe85d;</i>返利成功
            </div>
            <div class="_icon l-text-error" v-else-if="item.rebateRecordState == 2">
              <i class="l-icon">&#xe605;</i>返利失败
            </div>
            <div class="_icon l-text-ok" v-else-if="item.rebateRecordState == 3">
              <i class="l-icon">&#xe85d;</i>已打款
            </div>

            <div class="l-rest">
              <h4>{{rebateRecordType[item.rebateRecordType]}}<span v-if="item.rebateRecordType < 0">(对冲)</span></h4>
              <p class="l-fs-m l-text-gray">{{item.startDate}}</p>
            </div>

            <div>
              <span :class="item.amount > 0 ? 'l-text-ok' : 'l-text-error'">{{item.amount | currency}}</span>
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
    <div class="l-page" id="page-info">
      <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
        <h1 class="mui-title">收益明细</h1>
        <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
      </header>
      <div class="mui-content">
        <div class="l-flex-hc l-bg-white l-margin-b" style="padding:2rem 0.75rem;">
          <div class="l-rest">金&emsp;&emsp;额</div>
          <div :class="info.amount > 0 ? 'l-text-ok' : 'l-text-error'">{{info.amount | currency}}</div>
          &ensp;元
        </div>
        <div class="l-bg-white _info">
          <div class="_item">
            <span class="mui-pull-right">{{rebateRecordType[info.rebateRecordType]}}<span v-if="info.rebateRecordType < 0">(对冲)</span></span>
            <span class="l-text-gray">类&emsp;&emsp;型</span>
          </div>
          <div class="_item">
            <span class="mui-pull-right">{{info.startDate}}</span>
            <span class="l-text-gray">产生时间</span>
          </div>
          <div class="_item">
            <span class="mui-pull-right">{{info.orderCode}}</span>
            <span class="l-text-gray">关联订单</span>
          </div>
          <div class="_item">
            <p class="mui-pull-right">
              <span class="l-text-warn" v-if="info.rebateRecordState == 0"> 返利中 </span>
              <span class="l-text-ok" v-else-if="info.rebateRecordState == 1"> 返利成功 </span>
              <span class="l-text-error" v-else-if="info.rebateRecordState == 2"> 返利失败 </span>
              <span class="l-text-ok" v-else-if="info.rebateRecordState == 3"> 已打款 </span>
            </p>
            <span class="l-text-gray">返利状态</span>
          </div>
          <div class="_item">
            <span class="mui-pull-right">{{info.examineDate}}</span>
            <span class="l-text-gray">审核时间</span>
          </div>
          <div class="_item">
            <span class="mui-pull-right">{{info.refuseRemark}}</span>
            <span class="l-text-gray">备&emsp;&emsp;注</span>
          </div>
        </div>
      </div>
    </div>
    <div class="l-side" :class="{'_show': isShowFilter}" @click="showFilter(false)">
      <div class="l-side-inner" @click.stop>
        <div class="mui-bar mui-bar-footer l-flex-h l-filter-btn">
          <button @click="resetFilter">重置</button>
          <button class="l-rest" @click="submitFilter">确定</button>
        </div>
        <div class="mui-content">
          <div class="l-filter-item">
            <h3>审核状态</h3>
            <div class="l-radio-list">
              <label>
                <input type="radio" value="1" name="rebateRecordState" v-model="filter.rebateRecordState">
                <span>返利成功</span>
              </label>
              <label>
                <input type="radio" value="0" name="rebateRecordState" v-model="filter.rebateRecordState">
                <span>返利中</span>
              </label>
              <label>
                <input type="radio" value="2" name="rebateRecordState" v-model="filter.rebateRecordState">
                <span>返利失败</span>
              </label>
            </div>
          </div>
          <div class="l-filter-item">
            <h3>返点类型</h3>
            <div class="l-radio-list">
              <label>
                <input type="radio" value="1" name="rebateRecordType" v-model="filter.rebateRecordType">
                <span>小U销售提成</span>
              </label>
              <label>
                <input type="radio" value="3" name="rebateRecordType" v-model="filter.rebateRecordType">
                <span>区域销售返点</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import infiniteLoading from 'components/vue-infinite-loading'

let month = new Date().getMonth() + 1
export default {
  components: {
    infiniteLoading
  },
  data () {
    return {
      month,
      isShowFilter: false,
      rebateRecordType: {
        '1': '小U销售提成',
        '3': '区域销售返点'
      },
      filter: {
        rebateRecordType: '',
        rebateRecordState: ''
      },
      page: 1,
      list: [],
      info: {}
    }
  },
  methods: {
    resetFilter() {
      this.filter.rebateRecordType = ''
      this.filter.rebateRecordState = ''
    },
    submitFilter() {
      this.page = 1
      this.list = []
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
      this.showFilter(false)
    },
    showFilter(isShow) {
      isShow = isShow === undefined ? !this.isShowFilter : isShow
      this.isShowFilter = isShow
    },
    sltMonth(e) {
      this.month = e.target.value ? Number(e.target.value.split('-')[1]) : ''
      this.page = 1
      this.list = []
      this.filter.month = this.month
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
    },
    onInfinite() {
      this.$server.getIncomeRebate(this.filter, this.page)
      .then(({data})=>{
        let returnList = data.rebateRecords
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
    },
    getInfo(item) {
      this.info = item
      this.$pageTo('#page-info', '收益明细')
    }
  },
  created() {
    this.filter.rebateRecordState = this.$route.query.st || ''
  }
}
</script>
<style scoped lang="less">
._list{
  background: #fff; 
  ._item{ padding: 0.75rem; }
  ._icon{
    font-size: 0.55rem; text-align: center; margin-right: 0.75rem;
    .l-icon{font-size: 1rem; line-height: 1; margin-bottom: 0.25rem;display: block;}
  }
}
._topbar{
  text-align: center; padding: 0.5rem 0.75rem; background: #fff;
  .l-icon{line-height: 1; font-size: 1rem;}
  ._date{ 
    position: relative; overflow: hidden;
    input{
      position: absolute; top:0; left: 0; width: 100%; height: 100%; opacity: 0;
    }
  }
}
._info{
  padding: 0.75rem 0;
  ._item{margin:0.5rem 0.75rem;}
}

.l-side{
  position: absolute; top:0; left: 0; bottom: 0; width: 0;  z-index: 100; pointer-events: none; visibility: hidden;
}
.l-side:before{
  content: ''; position: absolute; top:0; bottom: 0; left: 0; width: 20rem; background: transparent; transition: all .5s; 
}
.l-side-inner{
  position: absolute; top: 0; bottom: 0; left: 0; width: 14rem; background: #fff; transition: all .3s; transform: translate3d(-100%, 0, 0);
}
.l-side._show{pointer-events: auto; visibility: visible;}
.l-side._show:before{ background-color: rgba(0, 0, 0, 0.6) }
.l-side._show .l-side-inner{transform: translate3d(0, 0, 0); }


.l-filter-item{
  padding: 0.75rem; background: #fff; 
  ul{padding: 0; margin:0; list-style: none; overflow: hidden; font-size: 0.7rem; }
  li{background: #f3f3f3; border-radius: 0.2rem; min-width: 2rem; text-align: center; float: left; padding:0.125rem 0.5rem; margin: 0.5rem 0.5rem 0 0;}
}

.l-radio-list{
  overflow: hidden; font-size: 0.7rem;overflow: hidden;
  label{
    float: left; position: relative;
    span{
      display: block; position: relative; overflow: hidden; background: #f3f3f3;  
      border-radius: 0.2rem; margin: 0.5rem 0.5rem 0 0;  padding:0.125rem 0.5rem; border:1px solid transparent
    }
    input{
      position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; opacity: 0;
    }
    input:checked ~ span{
      border-color: #12c390; background: transparent;
    }
    input:checked ~ span:after{
      content: '\e667'; font-family: 'l-iconfont' !important; position: absolute; bottom: -0.15rem; right: -0.05rem; line-height: 1; color: #12c390;
    }
  }
}

.l-filter-btn{
  padding: 0;
  button{
    border:none; border-radius: 0;
  }
  button:nth-child(1){ width: 40%; }
  button:nth-child(2){
    background: #12c390; color: #fff; width: 60%;
  }
  button:nth-child(2):active{
    background: #1c755b;
  }
}

</style>