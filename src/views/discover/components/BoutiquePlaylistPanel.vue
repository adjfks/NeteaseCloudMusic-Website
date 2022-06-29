<script setup lang="ts">

interface Props {
  picUrl?: string
  title?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="boutique-playlist-panel">
    <div class="bg" :style="{ backgroundImage: `url(${picUrl})` }"></div>
    <div class="content">
      <div class="picture">
        <img :src="picUrl" alt="">
      </div>
      <div class="text">
        <el-tag class="mx-1" effect="plain" round>精品歌单</el-tag>
        <h3 class="title">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@height: 190px;

.boutique-playlist-panel {
  position: relative;
  height: @height;
  overflow: hidden;
  border-radius: 10px;

  .bg {
    height: 100%;
    background-size: cover;
    filter: blur(30px);
    background-position: center center;
  }

  .content {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 90%;
    margin-left: 20px;

    .picture {
      width: 25%;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 20px;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .el-tag {
        width: max-content;
        background-color: transparent;

        :deep(.el-tag__content) {
          color: #e7aa5a;
          font-size: 16px;
        }
      }

      .title {
        margin-top: -100px;
        color: #fff;
      }
    }
  }
}
</style>

