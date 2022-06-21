<script setup lang="ts">
import transformNumber from '@/utils/transformNumber'
const props = defineProps<{
  picUrl: string,
  playCount?: number,
  round?: boolean
}>()

const playCountText = computed(() => {
  if (props.playCount)
    return transformNumber(props.playCount)
  else
    return 0
})
</script>

<template>
  <div class="toplist-cover-container hover-layer hover-play"
       :class="{ 'round': round }">
    <!-- 图片 -->
    <div class="picture-wrapper">
      <img :src="picUrl" alt="">
    </div>
    <!-- 播放量 -->
    <div class="playCount-container" v-if="playCount">
      <i-carbon-play class="text-3" />
      <div class="play-count" text="3 white">{{
          playCountText
      }}</div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.toplist-cover-container {
  position: relative;

  &.round {
    overflow: hidden;
    border-radius: 10px;
  }

  .playCount-container {
    display: flex;
    align-items: center;
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fff;
    text-align: middle;
  }
}
</style>

