<template>
  <nav class="mui-bar l-bar-tab">
    <router-link class="_item" replace active-class="mui-active" to="/index" :class="{'mui-active': $route.path == '/'}">
      <span class="mui-icon l-icon">&#xe64f;</span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="_item" replace active-class="mui-active" to="/me">
      <span class="mui-icon l-icon">&#xe67a;</span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>
