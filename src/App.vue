<script setup lang="ts">

</script>

<template>
  <div id="app-content">
    <div class="app-panel">
      <!-- 一级路由 -->
      <router-view></router-view>
    </div>
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
  min-height: 100%;

  .app-panel {
    position: relative;
    overflow: hidden;
    min-width: 1200px;
    width: calc(100vw - 120px);
    min-height: 600px;
    height: calc(100vh - 60px);
    margin: 30px;
    box-sizing: border-box;
    border: 1px solid rgba(203, 201, 201, .6);
    border-radius: 8px;
    box-shadow: 20px 0 20px 2px #e6e6e6, -20px 0 20px 2px #e6e6e6, 0 20px 20px 2px #e6e6e6;
  }
}
</style>
