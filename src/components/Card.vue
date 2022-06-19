<script setup lang="ts">
// 使用基于类型的props声明
interface Props {
  content: any,
  hoverLayer?: boolean,
  horizontal?: boolean,
  coverImgUrl?: string
}
const props = defineProps<Props>()

</script>

<template>
  <router-link to="/" class="card hover-up"
               :class="{ 'horizontal': horizontal, 'hover-layer': hoverLayer }">
    <div class="picture">
      <img :src="coverImgUrl ? coverImgUrl : content.picUrl" alt="">
    </div>
    <div class="description">
      <p class="title">{{ content.name }}</p>
      <template v-if="horizontal">
        <p class="artist">{{ content.song.artists[0].name }}</p>
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
    &:hover::after {
      opacity: 1;
    }


  }

  .title {
    font-size: 12px;
    line-height: 1.5em;
  }


}

.card.horizontal {
  flex-direction: row;

  .picture {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    margin-bottom: 0;
    border-radius: 5px;
    overflow: hidden;

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
