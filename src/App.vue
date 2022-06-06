<script setup lang="ts">

</script>

<template>
  <div id="app-content">
    <!-- 一级路由 -->
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app-content {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
