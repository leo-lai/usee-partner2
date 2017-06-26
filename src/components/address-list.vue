<template>
  <div :class="{'l-address-noslt': mode == 1}">
    <div class="l-address-item l-margin-b" v-for="item in addressList">
      <div class="_bd mui-radio mui-left">
        <label>
          <p><span class="mui-pull-right">{{item.phoneNumber}}</span><span>{{item.name}}</span></p>
          <p class="_address">{{item.province+item.city+item.area+item.address}}</p>
        </label>
        <input @click="slt(item)" name="address" type="radio" :checked="item.checked">
      </div>
      <div class="_ft l-text-right l-border-t">
        <span class="mui-pull-left" :class="{'l-text-warn': item.isDefault }" @click="setDefault(item)">设为默认</span>
        <span class="l-margin-l-s" @click="edit(item)"><i class="l-icon">&#xe630; </i>编辑</span>
        <span class="l-margin-l-s" @click="del(item.addressId)"><i class="l-icon">&#xe600; </i>删除</span>
      </div>
    </div>

    <div class="l-loading-inline" v-show="loading"><i class="mui-spinner"></i><span class="_txt">加载中...</span></div>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      addressList: null
    }
  },
  methods: {
    edit(item) {
      this.$storage.session.set('temp_address_info', item)
      this.$link('/address/edit/' + item.addressId, 'page-in')
    },
    del(addressId) {
      this.$mui.confirm('确定删除？', (e)=>{
        if(e.index == 1){
          this.$mui.showWaiting()
          this.$server.address.del(addressId).then(()=>{
            this.$mui.toast('取消订单成功')
            this.addressList = this.addressList.filter((item)=>{
              return item.addressId !== addressId
            })
            if(this.sltedAddress && this.sltedAddress.addressId === addressId){
              this.$storage.local.remove('buy_slted_address')
              this.$eventHub.$emit('APP-SLTED-ADDRESS', null, this.addressList.length)
            }
          }).finally(()=>{
            this.$mui.hideWaiting()
          })
        }
      })
    },
    setDefault(item) {
      this.$mui.showWaiting()
      this.$server.address.setDefault(item.addressId).then(()=>{
        this.addressList.forEach((item)=>{
          item.isDefault = false
        })
        item.isDefault = true
      }).finally(()=>{
        this.$mui.hideWaiting()
      })
    },
    slt(item) {
      if(this.mode == 2){
        this.$storage.local.set('buy_slted_address', item)
        this.$eventHub.$emit('APP-SLTED-ADDRESS', item, this.addressList.length)
        this.$router.back()  
      }
    }
  },
  created() {
    this.$server.address.getList().then(({data})=>{
      this.sltedAddress = this.$storage.local.get('buy_slted_address')
      if(!this.sltedAddress){
        data.forEach((item)=>{ // 选中默认地址
          item.isDefault && (this.sltedAddress = item)
        })
      }
      this.addressList = data.map((item)=>{
        this.sltedAddress && this.sltedAddress.addressId === item.addressId && (item.checked = true)  
        return item
      })

      if(this.addressList.length === 0){
        this.sltedAddress = null
      }
      
      this.$storage.local.set('buy_slted_address', this.sltedAddress)
      this.$eventHub.$emit('APP-SLTED-ADDRESS', this.sltedAddress, this.addressList.length)
    })
  }
}
</script>
<style scoped lang="less">
/* 收货地址 */
.l-address-item{
  background: #fff; display: block; color: inherit;
  a{ color: inherit; }
  ._bd{ padding: 0.5rem  0.75rem; }
  ._ft{ padding: 0.5rem 0.75rem; color: #666; font-size: 0.75rem;}
  .mui-radio input{top: 1rem;}
  .mui-radio.mui-left label{padding: 0 0 0 1.75rem;}
  ._address{font-size: 0.75rem; line-height: 1.2; color: #999;word-break: break-all; margin-top: 0.125rem;}
}
.l-address-noslt{

  .mui-radio input{display: none;} 
  .mui-radio.mui-left label{padding-left: 0;}
}
</style>