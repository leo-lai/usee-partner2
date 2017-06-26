<template>
  <transition :name="direction">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
	data() {
		return {
      direction: 'page',
		}
	},
	created() {
    // 监听页面切换
    this.$eventHub.$on('APP-DIRECTION', (data)=>{
      this.direction = data
    })
	},
  updated() {
    // console.log('updated')
  }
}
</script>
<style lang="less">
@import '~libs/mui/css/mui.css';
@import '~assets/css/base.less';
@import '~assets/css/global.less';
@import '~assets/css/transition.less';
</style>
