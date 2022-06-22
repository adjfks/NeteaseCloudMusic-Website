<script setup lang="ts">
import DiscoverMenu from './components/DiscoverMenu.vue';

</script>


<template>
  <div class="discover-container">
    <!-- 头部菜单导航 -->
    <nav>
      <DiscoverMenu height="50px" />
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="less" scoped>
.discover-container {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;

  nav {
    margin-bottom: 10px;
  }

  main {
    flex: 1;
    min-height: 400px;

    .el-scrollbar {
      padding: 0 20px;
    }
  }
}
</style>
