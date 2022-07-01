<script setup lang="ts">
import discoverMenu from '@/api/constants/discover'

const props = defineProps<{
  height?: string
}>()

const index = ref(0)
</script>

<template>
  <div class="discover-header">
    <ul class="discover-menu">
      <li v-for="(item, idx) in discoverMenu" :key="item.title"
          @click="index = idx">
        <router-link :to="(item.link as string)" active-class="active">{{
            item.title
        }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.discover-header {
  height: v-bind(height);

  .discover-menu {
    display: flex;
    align-items: center;
    height: 100%;

    &>li {
      margin: 10px;
      height: 100%;
      line-height: v-bind(height);

      a {
        display: block;
        font-size: 16px;
        transition: all .2s;

        &.active {
          border-bottom: 3px solid var(--theme-color);
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
