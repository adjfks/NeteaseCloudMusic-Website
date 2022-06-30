<script setup lang="ts">
import Footer from './footer/index.vue'
import DetailDrawer from './components/DetailDrawer.vue';


// drawer
const drawerVisible = ref(false)
</script>

<template>
  <div class="common-layout">
    <el-container class="layout">
      <!-- 头部 -->
      <el-header height="60px">
        <MusicHeader height="60px" />
      </el-header>

      <!-- 中间区域 -->
      <el-container class="main">
        <el-aside width="245px">
          <Sidebar />
        </el-aside>
        <el-main>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>

      <!-- 底部footer -->
      <el-footer height="70px">
        <Footer v-model="drawerVisible" />
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  box-sizing: border-box;

  .layout {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-container.main {
      flex: 1;
      height: 0;
      overflow: hidden;

      .el-main {
        padding: 0;
      }
    }

    .el-footer {
      box-sizing: border-box;
      border-top: 1px solid var(--border-color);
    }
  }
}

.el-header {
  padding: 0;
}
</style>
