<template>
  <div class="l-page">
    <header class="mui-bar mui-bar-nav l-black" v-if="!$device.isWechat">
      <h1 class="mui-title">{{ $route.meta.title }}</h1>
      <a class="mui-icon mui-icon-arrowleft mui-pull-left _nav-back"></a>
    </header>
    <div class="mui-content l-bg-white">
      <div class="l-login-form">
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe613;</i>
          <div class="l-rest mui-input-row">
            <input class="mui-input-clear" type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="11" v-model="formData.phoneNumber" placeholder="请输入手机号码">
          </div>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe62f;</i>
          <div class="l-rest mui-input-row">
            <input type="tel" pattern="[0-9]*" value="1" step="1" min="1" maxlength="5" v-model="formData.phoneCode" placeholder="请输入短信验证码">
          </div>
          <button ref="sendBtn" class="mui-btn mui-btn-link" @click="sendAuthCode">获取验证码</button>
        </div>
        <div class="_tr l-flex-hc l-border-b">
          <i class="l-icon">&#xe616;</i>
          <div class="l-rest mui-input-row">
            <input type="password" v-model="formData.password" class="mui-input-password" maxlength="50" placeholder="请输入密码">
          </div>
        </div>
        <div class="_btn">
          <button type="button" class="mui-btn l-btn-main" :disabled="submiting" @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      submiting: false,
      formData: { phoneCode: '' }
    }
  },
  methods: {
    sendAuthCode: function(){ 
      this.$server.sendMobiCode(this.formData.phoneNumber, this.$refs.sendBtn)
      .then((response)=>{
        // this.formData.phoneCode = response.data
      })
    },
    submit() {
      if(!this.formData.phoneNumber){
        this.$mui.toptip('请输入手机号码')
        return
      }
      if(!this.formData.phoneCode){
        this.$mui.toptip('请输入手机验证码')
        return
      }
      if(!this.formData.password){
        this.$mui.toptip('请输入密码')
        return
      }


      this.submiting = true
      this.$mui.showWaiting()
      this.$server.changePwd(this.formData).then(({data})=>{
        if(this.$route.path == '/me/pwd'){
          this.$mui.toast('修改密码成功')  
          this.$router.back()
        }else{
          this.$mui.toast('新密码重置成功')
          this.$link('/login', 'page-out')  
        }
      }).finally(()=>{
        this.submiting = false
        this.$mui.hideWaiting()
      })
    }
  },
  created() {
    
  },
  mounted() {
    this.$mui('.l-login-form input').input();
  }
}
</script>
<style scoped lang="less">

</style>