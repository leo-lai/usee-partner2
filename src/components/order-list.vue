<template>
  <div class="l-order-list l-fs-s">
    <div class="l-order-item l-margin-t" v-for="item in list">
      <router-link :to="'/order/info/' + item.orderId" tag="div">
        <div class="_hd l-link-arrow">
          <span class="l-text-warn mui-pull-right">{{ordersState[item.ordersState]}}</span>
          <span>订单号：{{item.orderCode}}</span>
        </div>
        <div class="_bd l-panel-group l-border-t">
          <div class="_item l-flex-hc" v-for="goods in item.ordersInfo">
            <div class="l-thumb l-bg-contain l-margin-r" :style="{'background-image': 'url('+ goods.image +')'}"></div>
            <div class="l-rest l-fs-s">
              <p class="l-text-wrap2">{{goods.goodsName}}</p>
              <div class="l-margin-m1">
                <p class="l-fr">
                  <span><b class="l-icon">&#xe6cb;</b>{{goods.amount.toFixed(2)}}</span>
                  <span class="l-text-gray">x{{goods.goodsNumber}}</span>
                </p>
                <span v-show="goods.colorName" class="l-text-gray">颜色：{{goods.colorName}}</span>
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <div class="_ft l-border-t l-flex-hc">
        <span>共{{item.ordersInfo.length}}件 合计：<b class="l-icon">&#xe6cb;</b>{{item.amount.toFixed(2)}}</span>
        <div class="l-rest l-text-right">
          <a class="mui-btn l-btn-white _s" v-if="item.ordersState == 1" @click="cancel(item.orderId)">取消订单</a>
          <a class="mui-btn l-btn-main _s" v-if="item.ordersState == 1" @click="pay(item)">去付款</a>
          <a class="mui-btn l-btn-main _s" v-if="item.ordersState == 4" @click="receive(item.orderId)">确认收货</a>
          <!-- <router-link class="mui-btn l-btn-main _s" :to="'/order/evaluate' + item.orderId" v-if="item.ordersState == 4">去评价</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      ordersState: ['', '未付款', '已付款', '已发货', '已收货']
    }
  },
  methods: {
    cancel(orderId) {
      this.$mui.confirm('确定取消订单？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(orderId, 'CANCEL').then(()=>{
            this.$mui.toast('取消成功')

            this.list.forEach((item, index)=>{
              if(item.orderId === orderId){
                this.list.splice(index, 1)
                return true
              }
            })
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    receive(orderId) {
      this.$mui.confirm('确定已收到商品？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.order.changeStatus(orderId, 'RECEIVE').then(()=>{
            this.$mui.toast('收货成功')

            this.list.forEach((item, index)=>{
              if(item.orderId === orderId){
                let receiveItem = this.list.splice(index, 1)
                this.$eventHub.$emit('APP-RECEIVE', receiveItem)
                return true
              }
            })
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },

    pay(item) {
      this.$storage.session.set('temp_pay_info', {
        orderId: item.orderId,
        orderCode: item.orderCode,
        amount: item.amount
      })
      window.location.replace(this.$server.getGrantUrl('/pay/?to=/order/list?tab=1'))
    }
  }
}
</script>
<style scoped lang="less">
.l-order-item{
  background: #fff;
  ._hd{padding: 0.5rem 0.75rem;}
  ._ft{
    padding: 0.5rem 0.75rem; 
    .mui-btn{margin-left: 0.25rem;}
  }
}
</style>