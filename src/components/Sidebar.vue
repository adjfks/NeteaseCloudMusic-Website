<script setup lang="ts">
import sidebar from '@/api/constants/sidebar'
import { SideBarItem } from '@/api/constants/sidebar'
import { Ref } from 'vue';
const index: Ref<number> = ref(0)

</script>


<template>
  <div class="sidebar-container">
    <ul class="sidebar">
      <template v-for="(item, idx) in sidebar" :key="item.title">
        <template v-if="item.items">
          <li class="sidebar-item item">
            <router-link to="/">{{ item.title }}</router-link>
          </li>
          <li v-for="(sub, idx) in item.items" :key="sub.title"
              class="sidebar-item"
              :class="{ active: idx + sidebar.length === index }"
              @click="index = idx + sidebar.length">
            <router-link to="/">{{ sub.title }}</router-link>
          </li>
        </template>
        <li v-else class="sidebar-item" :class="{ active: idx === index }"
            @click="index = idx">
          <router-link to="/">{{ item.title }}</router-link>
        </li>
      </template>

    </ul>
  </div>
</template>


<style scoped lang="less">
.sidebar-container {
  background-color: #fff;
  border-right: 1px solid var(--border-color);
  height: 100%;

  .sidebar {
    padding: 10px 5px;


    .sidebar-item {
      height: 50px;
      line-height: 50px;

      padding-left: 10px;
      cursor: pointer;
      transition: all .2s;

      .a {
        font-size: 18px;
      }

      &:hover:not(.item) {
        background-color: var(--hover-color);
        border-radius: 10px;
      }

      &.active {
        background-color: var(--active-color);
        border-radius: 10px;
        font-size: 19px;
        font-weight: 700;
      }

      &.item a {
        font-size: 16px;
        color: rgb(188, 188, 188);
      }
    }
  }
}
</style>
