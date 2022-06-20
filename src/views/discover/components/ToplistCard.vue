<script setup lang="ts">
import ToplistCover from './ToplistCover.vue';
const props = defineProps({
  list: {
    type: Object,
    default: null,
    required: true
  }
})
</script>

<template>
  <div class="toplist-card-container hover-up h-cs">
    <div class="cover">
      <ToplistCover :picUrl="list.coverImgUrl" :playCount="list.playCount"
                    round />
    </div>
    <div class="title" text="3" m-t-2>{{ list.name }}</div>
  </div>
</template>

<style lang="less" scoped>
</style>

