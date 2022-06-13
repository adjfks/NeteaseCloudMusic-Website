<script setup lang="ts">
import DiscoverMenu from './components/DiscoverMenu.vue';
</script>


<template>
  <div class="discover-container">
    <!-- 头部菜单导航 -->
    <DiscoverMenu />
    <router-view></router-view>
  </div>
</template>
