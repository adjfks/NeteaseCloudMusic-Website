<script setup lang="ts">
// 使用基于类型的props声明
interface Props {
  playlist?: any,
  song?: any,
  horizontal?: boolean
}
const props = defineProps<Props>()

const picUrl = props.horizontal ? props.song.picUrl : props.playlist.picUrl
const title = props.horizontal ? props.song.name : props.playlist.name

</script>

<template>
  <router-link to="/" class="card" :class="{ 'horizontal': horizontal }">
    <div class="picture">
      <img :src="picUrl" alt="">
    </div>
    <div class="description">
      <p class="title">{{ title }}</p>
      <template v-if="horizontal">
        <p class="artist">{{ song.song.artists[0].name }}</p>
      </template>
    </div>
  </router-link>
</template>

<style lang="less" scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .picture {
    position: relative;
    margin-bottom: 5px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity .4s;
    }

    &::after {
      content: '';
      z-index: 2000;
      position: absolute;
      right: 0;
      bottom: 0.5em;
      border: 1em solid transparent;
      border-top-width: 0.5em;
      border-bottom-width: 0.5em;
      border-left-color: rgba(255, 255, 255, 0.7);
      opacity: 0;
      transition: opacity .4s;
    }

    // 遮罩
    &:hover::before,
    &:hover::after {
      opacity: 1;
    }


  }

  .title {
    font-size: 14px;
    line-height: 1.5em;
  }


}

.card.horizontal {
  flex-direction: row;

  .picture {
    width: 60px;
    height: 60px;
    margin-right: 10px;

    &::after {
      right: 50%;
      bottom: 50%;
      transform: translate(75%, 50%)
    }
  }

  .description {
    flex: 1;
    overflow: hidden;

    .title {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .artist {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
