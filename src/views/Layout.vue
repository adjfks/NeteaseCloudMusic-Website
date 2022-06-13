<script setup lang="ts">
import Discover from '@/views/discover/index.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="layout">
      <el-header height="75px">
        <MusicHeader />
      </el-header>
      <el-container class="main">
        <el-aside width="245px">
          <Sidebar />
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <el-footer height="90px">
        <div>Footer</div>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  display: flex;
}

.el-header {
  padding: 0;
}

.el-footer {
  height: 90px;
}
</style>
